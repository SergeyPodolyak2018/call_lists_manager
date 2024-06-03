import { CSSProperties } from 'react';
export type ShadowRootStyle = {
  styles: CSSProperties;
  selector: string;
  selectorToRemove?: string;
};

export type ShadowRootStyles = ShadowRootStyle[] | ShadowRootStyle;
/*
 * Set inline styles for element
 * @param parentRef expected GuxComponent
 * @param shadowRootStyles styles
 */
export const setInlineStyles = (parent: HTMLElement, shadowRootStyles: ShadowRootStyles) => {
  if (!shadowRootStyles || !parent) return;
  if (Array.isArray(shadowRootStyles)) {
    for (const item of shadowRootStyles) {
      applyStyles(parent, item.selector, item.selectorToRemove, item.styles);
    }
  } else {
    applyStyles(parent, shadowRootStyles.selector, shadowRootStyles.selectorToRemove, shadowRootStyles.styles);
  }
};

const applyStyles = (element: any, selector: string, selectorToRemove: string | undefined, styles: any) => {
  const guxHeaderElement = element.querySelector(selector);
  if (selectorToRemove && guxHeaderElement) {
    const elementToRemove = guxHeaderElement?.querySelector(selectorToRemove);
    elementToRemove.remove();
  }
  for (const [property, value] of Object.entries(styles)) {
    if (guxHeaderElement) {
      const propertyName = property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
      guxHeaderElement.style[propertyName] = value;
    }
  }
};

/*
 * Add to shadow root <style>.selector { foo: bar }</style>
 * NOTE: use selector higher than current element selector
 * @param parentRef expected GuxComponent
 * @param shadowRootStyles styles
 */
export const addStyleTagToShadowRoot = (
  parent: HTMLElement,
  shadowRootStyles: ShadowRootStyles,
  keyframes?: string,
) => {
  const shadowRoot = parent.shadowRoot;
  if (!shadowRoot) {
    return null;
  }

  if (!shadowRootStyles) return null;
  const styleEntries = Array(shadowRootStyles)
    .map(({ selector, styles }: any) => {
      const styleEntries = Object.entries(styles)
        .map(([property, value]) => {
          const propertyName = property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
          return `${propertyName}: ${value};`;
        })
        .join('\n');

      return `:host ${selector} {${styleEntries}}`;
    })
    .join('\n');

  const combinedStyles = keyframes ? `${styleEntries}\n${keyframes}\n` : styleEntries;

  const styleTag = document.createElement('style');
  styleTag.textContent = combinedStyles;
  shadowRoot.appendChild(styleTag);
};

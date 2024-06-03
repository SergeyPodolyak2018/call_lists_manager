import { r as t, c as i, h as e } from './p-9031eb6a.js';
import { a as s, c as n, o as a, f as o, d as p, s as d, h } from './p-42e2cc1f.js';
const r = class {
  constructor(e) {
    t(this, e),
      (this.internalexpanded = i(this, 'internalexpanded', 7)),
      (this.internalcollapsed = i(this, 'internalcollapsed', 7)),
      (this.expanded = !1),
      (this.disabled = !1),
      (this.exceedTargetWidth = !1);
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = s(
      this.targetElementContainer,
      this.popupElementContainer,
      () => this.updatePosition(),
      { ancestorScroll: !0, elementResize: !0, animationFrame: !0, ancestorResize: !0 },
    );
  }
  updatePosition() {
    if (this.targetElementContainer && this.popupElementContainer) {
      const t = this.exceedTargetWidth;
      n(this.targetElementContainer, this.popupElementContainer, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          a(2),
          o(),
          p({
            apply({ rects: i, elements: e }) {
              Object.assign(
                e.floating.style,
                t ? { minWidth: `${i.reference.width}px` } : { width: `${i.reference.width}px`, overflow: 'hidden' },
              );
            },
          }),
          d(),
          h(),
        ],
      }).then(({ x: t, y: i, middlewareData: e }) => {
        const { referenceHidden: s } = e.hide;
        Object.assign(this.popupElementContainer.style, { left: `${t}px`, top: `${i}px` }),
          s
            ? this.popupElementContainer.classList.add('gux-sr-only-clip')
            : this.popupElementContainer.classList.remove('gux-sr-only-clip');
      });
    }
  }
  onExpandedChange(t) {
    t ? this.internalexpanded.emit() : this.internalcollapsed.emit();
  }
  componentDidLoad() {
    this.expanded && this.runUpdatePosition();
  }
  componentDidUpdate() {
    this.expanded ? this.runUpdatePosition() : this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  disconnectedCallback() {
    this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  render() {
    return e(
      'div',
      {
        class: { 'gux-target-container': !0, 'gux-disabled': this.disabled },
        ref: t => (this.targetElementContainer = t),
      },
      e('slot', { name: 'target' }),
      e(
        'div',
        {
          class: { 'gux-popup-container': !0, 'gux-expanded': this.expanded && !this.disabled },
          ref: t => (this.popupElementContainer = t),
        },
        e('slot', { name: 'popup' }),
      ),
    );
  }
  static get watchers() {
    return { expanded: ['onExpandedChange'] };
  }
};
r.style =
  '.gux-target-container.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-popup-container{position:fixed;z-index:var(--gux-zindex-popup, 1);width:max-content;visibility:hidden}.gux-popup-container.gux-expanded{visibility:visible}.gux-sr-only-clip:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}';
export { r as gux_popup_beta };

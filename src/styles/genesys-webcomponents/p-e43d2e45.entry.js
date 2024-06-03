import { r as t, h as o, H as s, g as e } from './p-9031eb6a.js';
import { a as i } from './p-091f51f6.js';
import { t as r } from './p-6a46bf1b.js';
import { h as n } from './p-837e3eff.js';
import { c as a } from './p-e459974a.js';
const u = class {
  constructor(o) {
    t(this, o), (this.isShown = !1);
  }
  forceUpdate(t) {
    t && this.popperInstance && this.popperInstance.update();
  }
  onKeydown(t) {
    if ((t.stopPropagation(), this.isShown))
      switch (t.key) {
        case 'Escape':
        case 'ArrowLeft':
        case 'ArrowUp':
          return void this.root.focus();
        case 'ArrowDown':
          return t.preventDefault(), void this.focusOnMenu();
        case 'Enter':
          return void (this.hideDelayTimeout = i(() => {
            this.focusOnMenu();
          }));
      }
  }
  onKeyup(t) {
    t.stopPropagation(),
      ' ' !== t.key ||
        (this.menuContentElement.contains(document.activeElement)
          ? this.root.focus()
          : (this.hideDelayTimeout = i(() => {
              this.focusOnMenu();
            })));
  }
  onmouseenter() {
    this.show();
  }
  onMouseleave() {
    this.hide();
  }
  onClick(t) {
    0 !== t.detail && this.hide(), this.root.focus();
  }
  onFocusin() {
    this.show();
  }
  onFocusout() {
    this.hide();
  }
  show() {
    clearTimeout(this.hideDelayTimeout), (this.isShown = !0);
  }
  hide() {
    this.isShown &&
      (this.hideDelayTimeout = setTimeout(() => {
        this.isShown = !1;
      }, n));
  }
  runPopper() {
    this.popperInstance = a(this.targetElement, document.querySelector('gux-menu'), {
      modifiers: [
        { name: 'offset', options: { offset: [0, 16] } },
        { name: 'arrow', options: { padding: 16 } },
      ],
      placement: 'bottom-start',
    });
  }
  destroyPopper() {
    this.popperInstance && (this.popperInstance.destroy(), (this.popperInstance = null));
  }
  focusOnMenu() {
    if (this.menuContentElement.contains(document.activeElement)) return;
    const t = this.root.querySelector('gux-menu');
    Array.from(t.children)[0].guxFocus();
  }
  componentWillLoad() {
    r(this.root);
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    return o(
      s,
      { tabIndex: 0, 'aria-haspopup': 'true' },
      o('span', { ref: t => (this.targetElement = t) }, o('slot', { name: 'target' })),
      o(
        'div',
        {
          class: { 'gux-flyout-menu-content': !0, 'gux-shown': this.isShown },
          ref: t => (this.menuContentElement = t),
        },
        o('slot', { name: 'menu' }),
      ),
    );
  }
  get root() {
    return e(this);
  }
  static get watchers() {
    return { isShown: ['forceUpdate'] };
  }
};
u.style =
  ":host{z-index:var(--gux-zindex-popover, 2);color:#2e394c;cursor:default}:host(:focus){outline:none}:host(:focus-visible){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-flyout-menu-content{display:none;margin:0}.gux-flyout-menu-content.gux-shown{display:flex}.gux-arrow,.gux-arrow::before{position:absolute;top:-3px;width:10px;height:10px;background:inherit}.gux-arrow::before{visibility:visible;content:'';border-top:1px solid #b4bccb;border-left:1px solid #b4bccb;transform:rotate(45deg)}";
export { u as gux_flyout_menu_beta };

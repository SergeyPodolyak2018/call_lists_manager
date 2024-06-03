import { r as t, h as s, H as e, g as u } from './p-9031eb6a.js';
import { a as i } from './p-091f51f6.js';
import { m as o, h as n } from './p-837e3eff.js';
import { c as r } from './p-e459974a.js';
const a = class {
  constructor(s) {
    t(this, s), (this.label = void 0), (this.isShown = !1);
  }
  forceUpdate(t) {
    t && this.popperInstance && this.popperInstance.update();
  }
  async guxFocus() {
    this.buttonElement.focus();
  }
  onKeydown(t) {
    switch ((o(t, this.root), t.key)) {
      case 'Enter':
        t.stopPropagation(),
          (this.hideDelayTimeout = i(() => {
            this.focusOnSubmenu();
          })),
          this.guxFocus();
        break;
      case 'ArrowRight':
        t.stopPropagation(),
          this.show(),
          (this.hideDelayTimeout = i(() => {
            this.focusOnSubmenu();
          }));
        break;
      case 'ArrowLeft':
      case 'Escape':
        this.submenuContentElement.contains(t.target) && t.stopPropagation(), this.guxFocus();
    }
  }
  onKeyup(t) {
    ' ' === t.key &&
      (t.stopPropagation(),
      this.submenuContentElement.contains(document.activeElement)
        ? this.root.focus()
        : (this.hideDelayTimeout = i(() => {
            this.focusOnSubmenu();
          })));
  }
  onmouseenter() {
    this.show();
  }
  onMouseleave() {
    this.hide();
  }
  onClick(t) {
    this.submenuContentElement.contains(t.target) ? this.hide() : t.stopPropagation();
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
    this.popperInstance = r(this.buttonElement, this.submenuElement, {
      modifiers: [
        { name: 'offset', options: { offset: [-8, 0] } },
        { name: 'flip', enabled: !1 },
      ],
      placement: 'right-start',
    });
  }
  destroyPopper() {
    this.popperInstance && (this.popperInstance.destroy(), (this.popperInstance = null));
  }
  focusOnSubmenu() {
    this.submenuContentElement.contains(document.activeElement) ||
      Array.from(this.submenuContentElement.children)[0].guxFocus();
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    return s(
      e,
      null,
      s(
        'button',
        {
          type: 'button',
          class: 'gux-submenu-button',
          role: 'menuitem',
          tabIndex: -1,
          ref: t => (this.buttonElement = t),
          'aria-haspopup': 'true',
          'aria-expanded': this.isShown.toString(),
        },
        s('span', { class: 'gux-submenu-button-text' }, this.label),
        s('gux-icon', { class: 'gux-submenu-open-icon', 'icon-name': 'chevron-small-right', decorative: !0 }),
      ),
      s(
        'div',
        { ref: t => (this.submenuElement = t), class: { 'gux-submenu-wrapper': !0, 'gux-shown': this.isShown } },
        s(
          'div',
          { role: 'menu', class: 'gux-submenu-content', ref: t => (this.submenuContentElement = t) },
          s('slot', null),
        ),
      ),
    );
  }
  get root() {
    return u(this);
  }
  static get watchers() {
    return { isShown: ['forceUpdate'] };
  }
};
a.style =
  'gux-submenu{display:block;flex:1 1 auto;align-self:auto}gux-submenu .gux-submenu-button{all:unset;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;width:129px;height:32px;padding:0 12px 0 16px;line-height:32px;color:#2e394c;background-color:#fdfdfd}gux-submenu .gux-submenu-button:focus-within,gux-submenu .gux-submenu-button:hover{color:#fdfdfd;background-color:#2a60c8}gux-submenu .gux-submenu-button .gux-submenu-button-text{flex:1 1 auto;align-self:auto;order:0;margin-right:12px;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap}gux-submenu .gux-submenu-button .gux-submenu-open-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px}gux-submenu .gux-submenu-wrapper{flex-direction:column;padding:8px 0;visibility:hidden;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-submenu .gux-submenu-wrapper.gux-shown{visibility:visible}';
export { a as gux_submenu };

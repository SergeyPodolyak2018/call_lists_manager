import { r as o, h as t, g as n } from './p-9031eb6a.js';
import { m as e } from './p-837e3eff.js';
const u = class {
  constructor(t) {
    o(this, t);
  }
  async guxFocus() {
    this.buttonElement.focus();
  }
  onKeydown(o) {
    switch ((e(o, this.root), o.key)) {
      case 'ArrowRight':
      case 'Enter':
        o.stopPropagation();
    }
  }
  render() {
    return t(
      'button',
      {
        type: 'button',
        class: 'gux-menu-option-button',
        role: 'menuitem',
        'aria-haspopup': 'false',
        tabIndex: -1,
        ref: o => (this.buttonElement = o),
      },
      t('span', { class: 'gux-menu-option-button-text' }, t('slot', null)),
    );
  }
  get root() {
    return n(this);
  }
};
u.style =
  'gux-menu-option{display:block;flex:1 1 auto;align-self:auto}gux-menu-option .gux-menu-option-button{all:unset;width:100%;width:125px;height:32px;padding:0 16px;line-height:32px;color:#2e394c;background-color:#fdfdfd}gux-menu-option .gux-menu-option-button:focus-within,gux-menu-option .gux-menu-option-button:hover{color:#fdfdfd;background-color:#2a60c8}gux-menu-option .gux-menu-option-button:enabled{cursor:pointer}gux-menu-option .gux-menu-option-button .gux-menu-option-button-text{display:block;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap}';
export { u as gux_menu_option };

import { r as e, h as t, H as s, g as o } from './p-9031eb6a.js';
import { a as i } from './p-091f51f6.js';
import { e as n } from './p-29e8b184.js';
import { r as u } from './p-cbcbd1bb.js';
import { b as l } from './p-54ad2682.js';
import { t as a } from './p-e310debb.js';
import './p-8a133b9b.js';
const r = class {
  constructor(t) {
    e(this, t),
      (this.dropdownOptionsButtonId = u('gux-table-select-menu')),
      (this.hasSelectMenuOptions = !1),
      (this.dropdownDisabled = !1),
      (this.popoverHidden = !0);
  }
  focusFirstItemInPopupList() {
    const e = this.root.querySelector('gux-list');
    i(() => {
      null == e || e.guxFocusFirstItem();
    });
  }
  async componentWillLoad() {
    (this.hasSelectMenuOptions = !!this.root.querySelector('[slot="select-menu-options"]')),
      (this.i18n = await l(this.root, a, 'gux-table'));
  }
  onKeydown(e) {
    var t;
    switch (e.key) {
      case 'ArrowDown':
        n('.gux-select-menu-button', e) && (this.toggleOptions(), this.focusFirstItemInPopupList());
        break;
      case 'Enter':
        n('.gux-select-menu-button', e) && this.focusFirstItemInPopupList();
        break;
      case 'Escape':
        n('gux-list', e) &&
          (e.stopPropagation(),
          (this.popoverHidden = !0),
          null === (t = this.tableSelectMenuButtonElement) || void 0 === t || t.focus());
        break;
      case 'Tab':
        this.popoverHidden = !0;
    }
  }
  onKeyup(e) {
    ' ' === e.key && n('.gux-select-menu-button', e) && this.focusFirstItemInPopupList();
  }
  toggleOptions() {
    this.popoverHidden = !this.popoverHidden;
  }
  renderSelectDropdown() {
    if (this.hasSelectMenuOptions)
      return [
        t(
          'button',
          {
            id: this.dropdownOptionsButtonId,
            'aria-haspopup': 'listbox',
            'aria-expanded': (!this.popoverHidden).toString(),
            type: 'button',
            class: 'gux-select-menu-button',
            ref: e => (this.tableSelectMenuButtonElement = e),
            onClick: () => this.toggleOptions(),
            disabled: this.dropdownDisabled,
          },
          t('gux-icon', { 'icon-name': 'chevron-small-down', 'screenreader-text': this.i18n('tableOptions') }),
        ),
        t(
          'gux-table-select-popover',
          {
            for: this.dropdownOptionsButtonId,
            hidden: this.popoverHidden,
            closeOnClickOutside: !0,
            onGuxdismiss: () => (this.popoverHidden = !0),
          },
          t('div', null, t('slot', { name: 'select-menu-options' })),
        ),
      ];
  }
  render() {
    return t(s, null, t('slot', null), this.renderSelectDropdown());
  }
  get root() {
    return o(this);
  }
};
r.style =
  'gux-table-select-menu{display:inline-flex;font-weight:400}gux-table-select-menu .gux-select-menu-button{width:24px;height:24px;padding:0;color:#6b7585;background-color:inherit;border:none;border-radius:4px;outline:none}gux-table-select-menu .gux-select-menu-button:disabled{color:rgba(107, 117, 133, 0.5)}gux-table-select-menu .gux-select-menu-button:hover:not(gux-table-select-menu .gux-select-menu-button:disabled){color:#2e394c}gux-table-select-menu .gux-select-menu-button:focus-visible gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd;border-radius:4px}gux-table-select-menu .gux-select-menu-button gux-icon{width:16px;height:16px}';
export { r as gux_table_select_menu };

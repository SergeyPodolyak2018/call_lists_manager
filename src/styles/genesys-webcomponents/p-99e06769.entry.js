import { r as o, h as t } from './p-9031eb6a.js';
const n = class {
  constructor(t) {
    o(this, t), (this.optionId = void 0), (this.iconName = void 0);
  }
  render() {
    return t(
      'button',
      { class: 'tab-dropdown-option' },
      t('gux-icon', { 'icon-name': this.iconName, decorative: !0 }),
      t('span', null, t('slot', null)),
    );
  }
};
n.style =
  'gux-tab-dropdown-option-legacy .tab-dropdown-option{display:flex;align-items:center;width:120px;height:36px;padding:0;font-size:12px;cursor:pointer;background:none;border:none;transition:color 0.25s, background-color 0.25s}gux-tab-dropdown-option-legacy .tab-dropdown-option:hover,gux-tab-dropdown-option-legacy .tab-dropdown-option:focus{outline:none}gux-tab-dropdown-option-legacy .tab-dropdown-option gux-icon{width:16px;height:16px;margin:0 10px}.gux-tab-dropdown-option-light-theme .tab-dropdown-option{color:#2e394c}.gux-tab-dropdown-option-light-theme .tab-dropdown-option:hover,.gux-tab-dropdown-option-light-theme .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}.gux-light-theme gux-tab-dropdown-option-legacy .tab-dropdown-option{color:#2e394c}.gux-light-theme gux-tab-dropdown-option-legacy .tab-dropdown-option:hover,.gux-light-theme gux-tab-dropdown-option-legacy .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}gux-tab-dropdown-option-legacy.gux-light-theme .tab-dropdown-option{color:#2e394c}gux-tab-dropdown-option-legacy.gux-light-theme .tab-dropdown-option:hover,gux-tab-dropdown-option-legacy.gux-light-theme .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}gux-tab-dropdown-option-legacy .tab-dropdown-option{color:#2e394c}gux-tab-dropdown-option-legacy .tab-dropdown-option:hover,gux-tab-dropdown-option-legacy .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}';
export { n as gux_tab_dropdown_option_legacy };

import { r as e, h as t } from './p-9031eb6a.js';
const o = class {
  constructor(t) {
    e(this, t), (this.icon = void 0), (this.altText = void 0), (this.isSelected = !1);
  }
  get buttonClass() {
    return this.isSelected ? 'selected' : '';
  }
  render() {
    return t(
      'button',
      { 'aria-label': this.altText, class: this.buttonClass },
      t('gux-icon', { decorative: !0, 'icon-name': this.icon }),
    );
  }
};
o.style =
  'gux-side-panel-button button{width:48px;height:48px;color:#2e394c;cursor:pointer;background-color:#fdfdfd;border:none;border-bottom:1px solid #e2e6ee}gux-side-panel-button button.selected{color:#fdfdfd;background-color:#2a60c8}gux-side-panel-button button:hover,gux-side-panel-button button:active,gux-side-panel-button button:focus-visible{color:#2a60c8}gux-side-panel-button button:hover.selected,gux-side-panel-button button:active.selected,gux-side-panel-button button:focus-visible.selected{color:#fdfdfd}gux-side-panel-button button:focus{outline:none}gux-side-panel-button button i{font-size:24px}.gux-side-panel-button-dark-theme button{color:#fdfdfd;background-color:#2e394c;border-color:#202937}.gux-side-panel-button-dark-theme button.selected{background-color:#2a60c8}.gux-side-panel-button-dark-theme button:hover,.gux-side-panel-button-dark-theme button:active,.gux-side-panel-button-dark-theme button:focus-visible{color:#75a8ff}.gux-side-panel-button-dark-theme button:hover.selected,.gux-side-panel-button-dark-theme button:active.selected,.gux-side-panel-button-dark-theme button:focus-visible.selected{color:#fdfdfd}.gux-dark-theme gux-side-panel-button button{color:#fdfdfd;background-color:#2e394c;border-color:#202937}.gux-dark-theme gux-side-panel-button button.selected{background-color:#2a60c8}.gux-dark-theme gux-side-panel-button button:hover,.gux-dark-theme gux-side-panel-button button:active,.gux-dark-theme gux-side-panel-button button:focus-visible{color:#75a8ff}.gux-dark-theme gux-side-panel-button button:hover.selected,.gux-dark-theme gux-side-panel-button button:active.selected,.gux-dark-theme gux-side-panel-button button:focus-visible.selected{color:#fdfdfd}gux-side-panel-button.gux-dark-theme button{color:#fdfdfd;background-color:#2e394c;border-color:#202937}gux-side-panel-button.gux-dark-theme button.selected{background-color:#2a60c8}gux-side-panel-button.gux-dark-theme button:hover,gux-side-panel-button.gux-dark-theme button:active,gux-side-panel-button.gux-dark-theme button:focus-visible{color:#75a8ff}gux-side-panel-button.gux-dark-theme button:hover.selected,gux-side-panel-button.gux-dark-theme button:active.selected,gux-side-panel-button.gux-dark-theme button:focus-visible.selected{color:#fdfdfd}.gux-side-panel-button-light-theme{color:#2e394c}.gux-light-theme gux-side-panel-button{color:#2e394c}gux-side-panel-button.gux-light-theme{color:#2e394c}gux-side-panel-button{color:#2e394c}';
export { o as gux_side_panel_button };

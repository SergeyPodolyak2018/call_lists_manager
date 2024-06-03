import { r as t, c as i, h as a } from './p-9031eb6a.js';
const o = class {
  constructor(a) {
    t(this, a),
      (this.internalactivatetabpanel = i(this, 'internalactivatetabpanel', 7)),
      (this.tabId = void 0),
      (this.guxDisabled = !1),
      (this.active = !1);
  }
  onClick() {
    this.active || this.guxDisabled || this.internalactivatetabpanel.emit(this.tabId);
  }
  onFocusin() {
    this.tooltipTitleElement.setShowTooltip();
  }
  onFocusout() {
    this.tooltipTitleElement.setHideTooltip();
  }
  async guxSetActive(t) {
    this.active = t;
  }
  async guxFocus() {
    this.buttonElement.focus();
  }
  async guxGetActive() {
    return this.active;
  }
  render() {
    return a(
      'button',
      {
        class: { 'gux-disabled': this.guxDisabled, 'gux-tab': !0, 'gux-active': this.active },
        type: 'button',
        'aria-disabled': this.guxDisabled.toString(),
        id: `gux-${this.tabId}-tab`,
        role: 'tab',
        'aria-controls': `gux-${this.tabId}-panel`,
        'aria-selected': this.active.toString(),
        tabIndex: this.active ? 0 : -1,
        ref: t => (this.buttonElement = t),
      },
      a('gux-tooltip-title', { ref: t => (this.tooltipTitleElement = t) }, a('span', null, a('slot', null))),
    );
  }
};
o.style =
  "gux-tabs[orientation='vertical']>gux-tab-list .gux-tab{display:flex;justify-content:flex-end;padding:12px 16px}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab.gux-active{padding-right:14px;border-right:2px solid #2a60c8}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab:hover:not(.gux-active):not(.gux-disabled){padding-right:14px;border-right:2px solid #8a97ad}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab{box-sizing:border-box;padding-bottom:2px}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab.gux-active{padding-bottom:0;border-bottom:2px solid #2a60c8}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab:hover:not(.gux-active):not(.gux-disabled){padding-bottom:0;border-bottom:2px solid #8a97ad}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab gux-tooltip-title{margin:auto}gux-tabs[alignment='center']>gux-tab-list .gux-scrollable-section{justify-content:center}gux-tabs[alignment='full-width']>gux-tab-list .gux-scrollable-section{flex-grow:1}gux-tabs[alignment='full-width']>gux-tab-list gux-tab{width:100%;max-width:100%}gux-tabs[alignment='full-width']>gux-tab-list gux-tab .gux-tab{width:100%;max-width:100%}gux-tab{display:flex;max-width:160px}gux-tab .gux-tab{display:flex;align-items:center;width:100%;max-width:160px;height:40px;padding:0 16px;font-size:12px;color:#2e394c;cursor:pointer;background-color:#fff;border:none}gux-tab .gux-tab.gux-disabled{cursor:default}gux-tab .gux-tab.gux-disabled gux-tooltip-title{color:rgba(46, 57, 76, 0.5)}gux-tab .gux-tab:focus-visible{padding:0 13px 3px;border:3px solid #aac9ff;border-radius:5px;outline:none}gux-tab .gux-tab gux-tooltip-title{max-width:160px;white-space:nowrap}";
export { o as gux_tab };

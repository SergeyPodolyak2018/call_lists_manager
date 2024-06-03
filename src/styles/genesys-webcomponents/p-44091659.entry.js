import { r as a, c as t, h as e } from './p-9031eb6a.js';
const i = class {
  constructor(e) {
    a(this, e),
      (this.guxactivepanelchange = t(this, 'guxactivepanelchange', 7)),
      (this.tabId = void 0),
      (this.active = !1);
  }
  async guxSetActive(a) {
    this.active = a;
  }
  watchActivePanel() {
    !0 === this.active && this.guxactivepanelchange.emit(this.tabId);
  }
  render() {
    return e(
      'div',
      {
        id: `gux-${this.tabId}-panel`,
        role: 'tabpanel',
        'aria-labelledby': `gux-${this.tabId}-tab`,
        tabIndex: 0,
        hidden: !this.active,
        'aria-live': 'assertive',
      },
      e('slot', null),
    );
  }
  static get watchers() {
    return { active: ['watchActivePanel'] };
  }
};
i.style =
  "gux-tab-advanced-panel div[role='tabpanel']:focus{outline:none}gux-tab-advanced-panel div[role='tabpanel']:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";
export { i as gux_tab_advanced_panel };

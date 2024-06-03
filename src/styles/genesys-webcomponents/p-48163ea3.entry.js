import { r as t, c as e, h as a } from './p-9031eb6a.js';
const i = class {
  constructor(a) {
    t(this, a),
      (this.guxactivepanelchange = e(this, 'guxactivepanelchange', 7)),
      (this.tabId = void 0),
      (this.active = !1);
  }
  async guxSetActive(t) {
    this.active = t;
  }
  watchActivePanel() {
    !0 === this.active && this.guxactivepanelchange.emit(this.tabId);
  }
  render() {
    return a(
      'div',
      {
        id: `gux-${this.tabId}-panel`,
        role: 'tabpanel',
        'aria-labelledby': `gux-${this.tabId}-tab`,
        tabIndex: 0,
        hidden: !this.active,
      },
      a('slot', null),
    );
  }
  static get watchers() {
    return { active: ['watchActivePanel'] };
  }
};
i.style =
  "gux-tab-panel div[role='tabpanel']:focus{outline:none}gux-tab-panel div[role='tabpanel']:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";
export { i as gux_tab_panel };

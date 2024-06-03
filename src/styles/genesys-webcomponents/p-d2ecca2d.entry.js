import { r as t, c as e, h as s, H as a } from './p-9031eb6a.js';
const i = class {
  constructor(s) {
    t(this, s),
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
    return s(
      a,
      {
        id: `gux-${this.tabId}-panel`,
        role: 'tabpanel',
        'aria-labelledby': `gux-${this.tabId}-tab`,
        tabIndex: 0,
        hidden: !this.active,
      },
      s('slot', null),
    );
  }
  static get watchers() {
    return { active: ['watchActivePanel'] };
  }
};
i.style =
  ':host(:not([hidden])){display:flex;flex-grow:1}:host(:focus){outline:none}:host(:focus-visible){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}';
export { i as gux_tab_panel_beta };

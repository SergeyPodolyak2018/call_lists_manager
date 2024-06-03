import { r as t, c as s, h as i, H as a, g as h } from './p-9031eb6a.js';
import { t as o } from './p-6a46bf1b.js';
const n = class {
  constructor(i) {
    t(this, i),
      (this.guxactivetabchange = s(this, 'guxactivetabchange', 7)),
      (this.tabList = void 0),
      (this.tabPanels = []),
      (this.activeTab = void 0);
  }
  watchActiveTab(t) {
    this.activateTab(t, this.tabList, this.tabPanels), this.guxactivetabchange.emit(t);
  }
  onInternalActivateTabPanel(t) {
    t.stopPropagation(), this.activateTab(t.detail, this.tabList, this.tabPanels);
  }
  async guxActivate(t) {
    this.activateTab(t, this.tabList, this.tabPanels);
  }
  onSlotchange() {
    const [t, s] = Array.from(this.root.shadowRoot.querySelectorAll('slot'));
    (this.tabList = t.assignedElements()[0]),
      (this.tabPanels = s.assignedElements()),
      this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }
  activateTab(t, s, i) {
    var a;
    (this.activeTab =
      t ||
      (null === (a = null == s ? void 0 : s.querySelector('gux-tab-advanced')) || void 0 === a
        ? void 0
        : a.getAttribute('tab-id'))),
      s.guxSetActive(this.activeTab),
      i.forEach(t => {
        t.guxSetActive(t.tabId === this.activeTab);
      });
  }
  componentWillLoad() {
    o(this.root);
  }
  render() {
    return i(
      a,
      null,
      i(
        'div',
        { class: 'gux-tabs' },
        i('slot', { name: 'tab-list' }),
        i('div', null, i('slot', { onSlotchange: this.onSlotchange.bind(this) })),
      ),
    );
  }
  get root() {
    return h(this);
  }
  static get watchers() {
    return { activeTab: ['watchActiveTab'] };
  }
};
n.style = 'gux-tabs-advanced{-custom-noop:noop}';
export { n as gux_tabs_advanced };

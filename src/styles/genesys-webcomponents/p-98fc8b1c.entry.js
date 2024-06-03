import { r as t, c as s, h as i, H as h, g as a } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
const l = class {
  constructor(i) {
    t(this, i),
      (this.guxactivetabchange = s(this, 'guxactivetabchange', 7)),
      (this.activeTab = void 0),
      (this.orientation = 'horizontal'),
      (this.alignment = 'left'),
      (this.useFlexbox = !1),
      (this.tabList = void 0),
      (this.tabPanels = []);
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
    (this.activeTab = t || i[0].tabId),
      s.guxSetActive(this.activeTab),
      i.forEach(t => {
        t.guxSetActive(t.tabId === this.activeTab);
      });
  }
  componentWillLoad() {
    e(this.root);
  }
  render() {
    return i(
      h,
      { class: { 'gux-flex': this.useFlexbox } },
      i(
        'div',
        { class: `gux-tabs gux-${this.alignment} gux-${this.orientation}` },
        i('slot', { name: 'tab-list' }),
        i(
          'div',
          { class: `gux-${this.alignment} gux-${this.orientation} gux-panel-container` },
          i('slot', { onSlotchange: this.onSlotchange.bind(this) }),
        ),
      ),
    );
  }
  get root() {
    return a(this);
  }
  static get watchers() {
    return { activeTab: ['watchActiveTab'] };
  }
};
l.style =
  ':host(.gux-flex){display:flex;flex-direction:column}:host(.gux-flex) .gux-tabs{display:flex;flex-direction:column;height:100%}:host(.gux-flex) .gux-panel-container{display:flex;flex-direction:column;height:100%}.gux-tabs.gux-vertical{display:flex;height:100%}';
export { l as gux_tabs };

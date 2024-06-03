import { r as t, h as s, g as i } from './p-9031eb6a.js';
import { b as e } from './p-54ad2682.js';
import { f as o, g as r, t as a } from './p-547a5f79.js';
import { t as n } from './p-6a46bf1b.js';
import { s as h } from './p-d176c2ae.js';
import './p-8a133b9b.js';
const d = class {
  constructor(s) {
    t(this, s),
      (this.value = void 0),
      (this.workspaceDefault = void 0),
      (this.localDefault = void 0),
      (this.searchString = ''),
      (this.timeZoneOptionElements = void 0),
      (this.timeZoneList = void 0),
      (this.filteredZoneList = void 0);
  }
  on(t) {
    (this.searchString = t.detail),
      (this.filteredZoneList = this.filterTimeZoneList(this.timeZoneList)),
      (this.timeZoneOptionElements = this.renderTimeZones(this.filteredZoneList));
  }
  async componentWillLoad() {
    n(this.root),
      (this.i18n = await e(this.root, a)),
      (this.timeZoneList = this.getTimeZoneOptionsList()),
      (this.filteredZoneList = this.timeZoneList),
      (this.timeZoneOptionElements = this.renderTimeZones(this.filteredZoneList));
  }
  componentDidLoad() {
    var t;
    (null === (t = this.root) || void 0 === t ? void 0 : t.shadowRoot.querySelector('gux-dropdown')).addEventListener(
      'change',
      t => {
        const s = t.target;
        (this.value = null == s ? void 0 : s.value), h(this.root, 'change');
      },
    );
  }
  filterTimeZoneList(t) {
    const s = this.searchString;
    return t.filter(t => t.displayTextName.toLowerCase().includes(s.toLowerCase()));
  }
  getTimeZoneOption(t) {
    const s = this.i18n(t.name);
    if (!s) return;
    const i = o(t.currentTimeOffsetInMinutes),
      e = ` (${this.i18n('UTC')}${i})`;
    return {
      value: t.name,
      localizedName: s,
      formattedOffset: i,
      displayTextName: `${s}`,
      displayTextOffset: e,
      baseDisplayOffsetText: `${e}`,
    };
  }
  getTimeZoneOptionsList() {
    const t = r(),
      s = [];
    return (
      t.forEach(t => {
        const i = this.getTimeZoneOption(t);
        i && s.push(i);
      }),
      s.sort((t, s) => {
        var i;
        return (null === (i = t.displayTextName) || void 0 === i ? void 0 : i.localeCompare(s.displayTextName)) || 0;
      })
    );
  }
  getDefaultZones() {
    const t = [];
    return this.workspaceDefault && t.push(this.workspaceDefault), this.localDefault && t.push(this.localDefault), t;
  }
  getDefaultZoneList() {
    const t = this.getDefaultZones(),
      s = this.timeZoneList.reduce((s, i) => (t.includes(i.value) ? s.concat([Object.assign({}, i)]) : s), []);
    return (
      s.forEach(t => {
        const i = t.baseDisplayOffsetText;
        1 === s.length && this.workspaceDefault === this.localDefault
          ? (s[0].displayTextOffset = `${s[0].displayTextOffset} ${this.i18n('localAndWorkspaceDefault')}`)
          : t.value === this.workspaceDefault
          ? (t.displayTextOffset = `${i} ${this.i18n('workspaceDefault')}`)
          : t.value === this.localDefault && (t.displayTextOffset = `${i} ${this.i18n('localDefault')}`);
      }),
      s
    );
  }
  renderTimeZones(t) {
    return t.map(t =>
      s('gux-option', { value: t.value }, t.displayTextName, s('span', { class: 'tz-utc' }, t.displayTextOffset)),
    );
  }
  renderDefaultsList() {
    const t = this.renderTimeZones(this.getDefaultZoneList());
    if (t.length) return t;
  }
  render() {
    return s(
      'gux-dropdown',
      {
        class: { 'has-defaults': !!this.workspaceDefault || !!this.localDefault },
        'filter-type': 'custom',
        placeholder: this.i18n('selectZone'),
        value: this.value,
      },
      s(
        'gux-listbox',
        { 'aria-label': this.i18n('timeZones') },
        s('div', { class: 'zone-header' }, this.i18n('default')),
        this.renderDefaultsList(),
        s('gux-list-divider', null),
        s('div', { class: 'zone-header' }, this.i18n('all')),
        this.timeZoneOptionElements,
      ),
    );
  }
  get root() {
    return i(this);
  }
};
d.style =
  '.has-defaults gux-option{padding-left:20px}gux-dropdown .zone-header{padding:6px 12px;color:#6b7585;text-transform:uppercase}gux-dropdown .tz-utc{color:#596373}gux-dropdown gux-list-divider{width:97%;margin-left:15px}gux-dropdown gux-option.gux-active .tz-utc,gux-dropdown gux-option.gux-hovered:not(:disabled) .tz-utc{color:#e2e6ee}';
export { d as gux_time_zone_picker_beta };

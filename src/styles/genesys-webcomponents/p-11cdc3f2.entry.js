import { r as t, h as s, H as i, g as o } from './p-9031eb6a.js';
import { t as r } from './p-6a46bf1b.js';
import { b as n } from './p-54ad2682.js';
import { g as a, f as e, t as h } from './p-547a5f79.js';
import './p-8a133b9b.js';
const l = class {
  constructor(s) {
    t(this, s),
      (this.timeZoneId = void 0),
      (this.offset = void 0),
      (this.surroundOffset = void 0),
      (this.shorten = void 0);
  }
  renderZoneDisplay() {
    let t = this.i18n(this.timeZoneId);
    this.shorten &&
      (t = (function (t) {
        const s = t.split('/');
        return (null == s ? void 0 : s.pop()) || t;
      })(t));
    let i = t;
    if (this.offset) {
      const s = (function (t, s) {
        const i = a().find(t => t.name === s);
        return `${t}${e(null == i ? void 0 : i.currentTimeOffsetInMinutes)}`;
      })(this.i18n('UTC'), this.timeZoneId);
      (i = `${t} ${s}`), this.surroundOffset && (i = `${t} (${s})`);
    }
    return s('span', null, i);
  }
  async componentWillLoad() {
    r(this.root), (this.i18n = await n(this.root, h));
  }
  render() {
    return s(i, null, this.renderZoneDisplay());
  }
  get root() {
    return o(this);
  }
};
export { l as gux_time_zone_beta };

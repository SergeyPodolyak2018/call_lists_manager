import { r as t, h as s, H as o, g as r } from './p-9031eb6a.js';
import { t as i } from './p-6a46bf1b.js';
import { D as a, g as e } from './p-ec1ea945.js';
import { g as h } from './p-54ad2682.js';
import './p-8a133b9b.js';
const n = class {
  constructor(s) {
    t(this, s), (this.datetime = new Date().toISOString()), (this.format = 'short'), (this.timeZone = void 0);
  }
  componentWillLoad() {
    i(this.root), (this.formatter = new a(h(this.root)));
  }
  render() {
    return s(o, null, this.formatter.formatDate(new Date(this.datetime), this.format, { timeZone: e(this.timeZone) }));
  }
  get root() {
    return r(this);
  }
};
export { n as gux_date_beta };

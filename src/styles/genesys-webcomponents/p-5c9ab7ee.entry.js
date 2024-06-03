import { r as t, h as s, H as i, g as o } from './p-9031eb6a.js';
import { t as r } from './p-6a46bf1b.js';
import { D as e, g as a } from './p-ec1ea945.js';
import { g as h } from './p-54ad2682.js';
import './p-8a133b9b.js';
const m = class {
  constructor(s) {
    t(this, s), (this.datetime = new Date().toISOString()), (this.format = 'short'), (this.timeZone = void 0);
  }
  componentWillLoad() {
    r(this.root), (this.formatter = new e(h(this.root)));
  }
  render() {
    return s(
      i,
      null,
      this.formatter.formatDateTime(new Date(this.datetime), this.format, { timeZone: a(this.timeZone) }),
    );
  }
  get root() {
    return o(this);
  }
};
export { m as gux_date_time_beta };

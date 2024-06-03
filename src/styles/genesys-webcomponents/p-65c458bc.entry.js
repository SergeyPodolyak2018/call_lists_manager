import { r, h as o, g as d } from './p-9031eb6a.js';
import { t as a } from './p-6a46bf1b.js';
const t = class {
  constructor(o) {
    r(this, o), (this.accent = 'outline');
  }
  componentWillLoad() {
    a(this.root, { variant: this.accent });
  }
  render() {
    return o('div', { class: { 'gux-card': !0, [`gux-${this.accent}`]: !0 } }, o('slot', null));
  }
  get root() {
    return d(this);
  }
};
t.style =
  ':host{display:block;width:fit-content}.gux-card{box-sizing:border-box;padding:16px;background-color:#fdfdfd;border:1px solid #e2e6ee;border-radius:4px}.gux-card.gux-outline,.gux-card.gux-bordered{background-color:#fdfdfd}.gux-card.gux-filled{background-color:#f6f7f9}.gux-card.gux-raised{box-shadow:0 0 2px rgba(32, 41, 55, 0.16)}.gux-card.gux-borderless{border-color:transparent}';
export { t as gux_card_beta };

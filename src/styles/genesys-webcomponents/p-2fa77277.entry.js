import { r as t, h as o, H as s, g as i } from './p-9031eb6a.js';
import { t as r } from './p-6a46bf1b.js';
import { b as e } from './p-091f51f6.js';
const a = class {
  constructor(o) {
    t(this, o), (this.politeness = 'polite');
  }
  async guxAnnounce(t) {
    (this.containerElement.innerText = ''),
      e(() => {
        this.containerElement.innerText = t;
      });
  }
  componentWillLoad() {
    r(this.root);
  }
  render() {
    return o(s, { 'aria-live': this.politeness }, o('slot', null), o('div', { ref: t => (this.containerElement = t) }));
  }
  get root() {
    return i(this);
  }
};
a.style = ':host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}';
export { a as gux_announce_beta };

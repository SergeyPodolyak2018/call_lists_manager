import { r as t, h as o, g as s } from './p-9031eb6a.js';
import { t as r } from './p-6a46bf1b.js';
const e = class {
  constructor(o) {
    t(this, o);
  }
  componentWillLoad() {
    r(this.root);
  }
  render() {
    return o('span', { class: 'gux-sr-only' }, o('slot', null));
  }
  get root() {
    return s(this);
  }
};
e.style =
  '.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}';
export { e as gux_screen_reader_beta };

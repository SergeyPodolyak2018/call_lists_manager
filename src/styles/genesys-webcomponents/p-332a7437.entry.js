import { r as t, h as i, g as o } from './p-9031eb6a.js';
import { b as n } from './p-54ad2682.js';
import { t as a } from './p-6a46bf1b.js';
import './p-8a133b9b.js';
const s = { navigationName: 'Skip links navigation' },
  e = class {
    constructor(i) {
      t(this, i);
    }
    async componentWillLoad() {
      a(this.root), (this.i18n = await n(this.root, s));
    }
    render() {
      return i(
        'div',
        { class: 'gux-container' },
        i('nav', { 'aria-label': this.i18n('navigationName') }, i('ul', { role: 'list' }, i('slot', null))),
      );
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return o(this);
    }
  };
e.style =
  ':host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}:host(:focus-within){position:inherit;top:inherit;left:inherit;width:inherit;height:inherit;overflow:inherit;position:absolute;inset:0}.gux-container nav{width:fit-content;margin:40px auto}.gux-container nav ul{padding:0;margin:0}';
export { e as gux_skip_navigation_list_beta };

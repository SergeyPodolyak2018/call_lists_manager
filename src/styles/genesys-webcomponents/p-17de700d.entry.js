import { r, f as t, h as a, g as s } from './p-9031eb6a.js';
import { b as e } from './p-54ad2682.js';
import { t as i } from './p-6a46bf1b.js';
import './p-8a133b9b.js';
const n = { breadcrumbs: 'Breadcrumbs' },
  o = class {
    constructor(t) {
      r(this, t), (this.accent = 'primary');
    }
    componentWillLoad() {
      i(this.root, { variant: this.accent });
    }
    async componentWillRender() {
      this.i18n = await e(this.root, n);
    }
    onSlotChange() {
      Array.from(this.root.children).forEach(r => t(r));
    }
    render() {
      return a(
        'nav',
        { 'aria-label': this.i18n('breadcrumbs'), class: 'gux-breadcrumbs-container' },
        a('slot', { onSlotchange: this.onSlotChange.bind(this) }),
      );
    }
    get root() {
      return s(this);
    }
  };
o.style =
  '.gux-breadcrumbs-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start}';
export { o as gux_breadcrumbs };

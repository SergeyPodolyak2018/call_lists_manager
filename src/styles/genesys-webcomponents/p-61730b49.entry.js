import { r as s, h as t, H as e, g as a } from './p-9031eb6a.js';
import { l as r, n as o, f as i, p as n, b as c, c as l } from './p-417354e9.js';
import { t as u } from './p-6a46bf1b.js';
const h = ['gux-list-item'],
  m = class {
    constructor(t) {
      s(this, t);
    }
    componentWillLoad() {
      u(this.root);
    }
    onKeyDown(s) {
      switch (s.key) {
        case 'ArrowUp':
          s.preventDefault(), n(this.root, h);
          break;
        case 'Home':
          s.preventDefault(), i(this.root, h);
          break;
        case 'ArrowDown':
          s.preventDefault(), o(this.root, h);
          break;
        case 'End':
          s.preventDefault(), r(this.root, h);
      }
    }
    async guxFocusFirstItem() {
      i(this.root, h);
    }
    async guxFocusItemById(s) {
      c(this.root, h, s);
    }
    async guxFocusItemByClosestId(s) {
      l(this.root, h, s);
    }
    async guxFocusLastItem() {
      r(this.root, h);
    }
    renderFocusTarget() {
      return t('span', { tabindex: '-1' });
    }
    render() {
      return t(e, { role: 'list' }, this.renderFocusTarget(), t('slot', null));
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return a(this);
    }
  };
m.style =
  ':host{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start}';
export { m as gux_list };

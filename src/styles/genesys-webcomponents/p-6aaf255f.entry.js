import { r as t, h as o, g as s } from './p-9031eb6a.js';
import { t as r } from './p-6a46bf1b.js';
const n = class {
  constructor(o) {
    t(this, o), (this.singleOpenSection = !1);
  }
  handleInternalsectionopened(t) {
    t.stopImmediatePropagation(),
      this.singleOpenSection &&
        this.getAccordionSections().forEach(o => {
          o !== t.target && this.closeSection(o);
        });
  }
  componentWillLoad() {
    this.singleOpenSection &&
      this.getAccordionSections().reduceRight((t, o) => (t && this.closeSection(o), t || o.open), !1),
      r(this.root);
  }
  getAccordionSections() {
    return Array.from(this.root.children);
  }
  closeSection(t) {
    t.disabled || (t.open = !1);
  }
  render() {
    return o('slot', null);
  }
  get root() {
    return s(this);
  }
};
n.style = 'gux-accordion{-custom-noop:noop}';
export { n as gux_accordion };

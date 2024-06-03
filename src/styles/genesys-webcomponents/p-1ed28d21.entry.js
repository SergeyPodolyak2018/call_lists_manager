import { r, h as e, g as t } from './p-9031eb6a.js';
import { l as a } from './p-d0805f56.js';
const n = class {
  constructor(e) {
    r(this, e), (this.href = void 0);
  }
  getAccent() {
    const r = this.root.closest('gux-breadcrumbs');
    if (r) return r.accent;
    a(this.root, 'This component must be a child of a gux-breadcrumbs component.');
  }
  isLastBreadcrumb() {
    const r = this.root.parentNode.children;
    return r[r.length - 1] === this.root;
  }
  getBreadcrumb() {
    return !this.href || this.isLastBreadcrumb()
      ? e('span', { class: 'gux-breadcrumb-content' }, e('slot', null))
      : e('a', { class: 'gux-breadcrumb-content gux-link', href: this.href }, e('slot', null));
  }
  getSeparatorIcon(r) {
    if (this.isLastBreadcrumb()) return null;
    switch (r) {
      case 'primary':
      default:
        return e('span', { class: 'gux-breadcrumb-separator', 'aria-hidden': 'true' }, '/');
      case 'secondary':
        return e('gux-icon', { class: 'gux-breadcrumb-separator', 'icon-name': 'chevron-small-right', decorative: !0 });
    }
  }
  render() {
    const r = this.getAccent();
    return e('span', { class: `gux-breadcrumb-generation gux-${r}` }, this.getBreadcrumb(), this.getSeparatorIcon(r));
  }
  get root() {
    return t(this);
  }
};
n.style =
  '.gux-breadcrumb-generation{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start}.gux-breadcrumb-generation.gux-primary{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}.gux-breadcrumb-generation .gux-breadcrumb-content{color:#2e394c}.gux-breadcrumb-generation .gux-breadcrumb-content.gux-link{color:#2a60c8;text-decoration:none}.gux-breadcrumb-generation .gux-breadcrumb-content.gux-link:hover{text-decoration:underline}.gux-breadcrumb-generation .gux-breadcrumb-separator{margin:0 8px;color:#8a97ad}.gux-breadcrumb-generation gux-icon.gux-breadcrumb-separator{width:16px;height:16px;margin:0 4px}';
export { n as gux_breadcrumb_item };

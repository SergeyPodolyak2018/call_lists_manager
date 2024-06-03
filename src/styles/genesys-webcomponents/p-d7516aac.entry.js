import { r as t, h as e, g as i, H as r } from './p-9031eb6a.js';
const s = class {
  constructor(e) {
    t(this, e), (this.value = void 0), (this.disabled = void 0), (this.text = void 0), (this.selected = void 0);
  }
  updateParentSelection() {
    this.getParentGuxDropdown().setSelected();
  }
  shouldFilter(t) {
    return Promise.resolve(!!t && !this.text.toLowerCase().startsWith(t.toLowerCase()));
  }
  getParentGuxDropdown() {
    return this.root.closest('gux-dropdown-legacy');
  }
  componentWillLoad() {
    this.text || (this.text = this.root.textContent);
  }
  hostData() {
    return { tabindex: '0' };
  }
  __stencil_render() {
    return e(
      'div',
      { title: this.text },
      e('span', { ref: t => (this.slotContent = t), style: { display: 'none' } }, e('slot', null)),
      this.text,
    );
  }
  get root() {
    return i(this);
  }
  static get watchers() {
    return { selected: ['updateParentSelection'] };
  }
  render() {
    return e(r, this.hostData(), this.__stencil_render());
  }
};
s.style = 'gux-option-legacy gux-text-highlight mark{font-weight:700;color:inherit;background-color:inherit}';
export { s as gux_option_legacy };

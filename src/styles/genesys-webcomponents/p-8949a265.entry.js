import { r as t, h as i, H as e } from './p-9031eb6a.js';
const s = class {
  constructor(i) {
    t(this, i), (this.value = void 0), (this.selected = !1), (this.disabled = !1);
  }
  onClick(t) {
    this.disabled && t.stopPropagation();
  }
  render() {
    return i(
      e,
      { class: { 'gux-selected': this.selected } },
      i('button', { type: 'button', class: 'gux-switch-item', disabled: this.disabled }, i('slot', null)),
    );
  }
};
s.style =
  'gux-switch-item>.gux-switch-item{font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;font:unset;color:#2e394c;text-align:center;background:none;border:none;outline:none}gux-switch-item>.gux-switch-item>gux-icon svg{fill:#99a4b8}gux-switch-item[disabled]{pointer-events:none;opacity:0.5}gux-switch-item.gux-selected{font-family:Roboto, sans-serif;font-weight:400;font-weight:700}gux-switch>gux-switch-item .gux-switch-item{padding:0 8px 4px;border-bottom:1px solid #e2e6ee}gux-switch>gux-switch-item .gux-switch-item:focus-visible,gux-switch>gux-switch-item .gux-switch-item:hover{padding:0 8px 1px;border-bottom:4px solid #2a60c8;outline:none}gux-switch>gux-switch-item .gux-switch-item:focus-visible>gux-icon svg,gux-switch>gux-switch-item .gux-switch-item:hover>gux-icon svg{fill:#2e394c}gux-switch>gux-switch-item .gux-switch-item>gux-icon{width:32px;height:32px}gux-switch>gux-switch-item.gux-selected .gux-switch-item{padding:0 8px 1px;border-bottom:4px solid #2a60c8}gux-switch>gux-switch-item.gux-selected .gux-switch-item>gux-icon svg{fill:#2e394c}gux-switch.gux-small>gux-switch-item .gux-switch-item{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px;padding:0 4px;border-bottom:1px solid #e2e6ee}gux-switch.gux-small>gux-switch-item .gux-switch-item:focus-visible,gux-switch.gux-small>gux-switch-item .gux-switch-item:hover{border-bottom-color:#2e394c}gux-switch.gux-small>gux-switch-item .gux-switch-item>gux-icon{width:24px;height:24px}gux-switch.gux-small>gux-switch-item.gux-selected .gux-switch-item{border-bottom-color:#2e394c}';
export { s as gux_switch_item };

import { r as t, h as o, g as s } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
import { g as i } from './p-aa2f9991.js';
const n = class {
  constructor(o) {
    t(this, o), (this.iconOnly = !1), (this.accent = 'secondary'), (this.disabled = !1);
  }
  renderTooltip() {
    if (this.iconOnly) return o('gux-tooltip', null, i(this.root, 'text'));
  }
  componentWillLoad() {
    e(this.root);
  }
  render() {
    return o(
      'gux-button-slot-beta',
      { accent: this.accent },
      o(
        'button',
        { disabled: this.disabled, type: 'button', class: 'gux-action-title' },
        o('slot', { name: 'icon' }),
        o('span', { class: { 'gux-sr-only': this.iconOnly } }, o('slot', { name: 'text' })),
      ),
      this.renderTooltip(),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return s(this);
  }
};
n.style =
  ":host([disabled]),button[disabled]{pointer-events:none}.gux-sr-only{display:flex}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-action-title{display:flex;flex-direction:row;gap:8px;align-items:center}.gux-action-title slot[name='icon']::slotted(gux-icon){width:16px;height:16px}";
export { n as gux_table_toolbar_custom_action };

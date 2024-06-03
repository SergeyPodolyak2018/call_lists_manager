import { r as e, h as o, g as l } from './p-9031eb6a.js';
import { t } from './p-6a46bf1b.js';
import { b as g } from './p-54ad2682.js';
import './p-8a133b9b.js';
const r = {
    neutral: 'badge with label: {label}, color: neutral',
    'neutral-bold': 'badge with label: {label}, color: neutral bold',
    green: 'badge with label: {label}, color: green',
    'green-bold': 'badge with label: {label}, color: green bold',
    yellow: 'badge with label: {label}, color: yellow',
    'yellow-bold': 'badge with label: {label}, color: yellow bold',
    red: 'badge with label: {label}, color: red',
    'red-bold': 'badge with label: {label}, color: red bold',
    inherit: 'badge with label: {label}',
  },
  a = class {
    constructor(o) {
      e(this, o), (this.color = 'neutral'), (this.accent = 'info'), (this.bold = !1), (this.label = void 0);
    }
    onSlotChange(e) {
      const o = e.composedPath()[0].assignedNodes();
      this.label = o.map(e => e.textContent).join('');
    }
    renderBadgeTitle() {
      return o(
        'gux-tooltip-title',
        null,
        o('span', null, o('slot', { 'aria-hidden': 'true', onSlotchange: this.onSlotChange.bind(this) })),
      );
    }
    renderSrText() {
      return o('div', { class: 'gux-sr-only' }, this.i18n(this.getVariant(), { label: this.label }));
    }
    getVariant() {
      return `${this.color}${this.bold ? '-bold' : ''}`;
    }
    async componentWillLoad() {
      t(this.root), (this.i18n = await g(this.root, r));
    }
    render() {
      return o(
        'div',
        { class: { 'gux-badge': !0, [`gux-${this.color}`]: !0, [`gux-${this.accent}`]: !0, 'gux-bold': this.bold } },
        this.renderBadgeTitle(),
        this.renderSrText(),
      );
    }
    get root() {
      return l(this);
    }
  };
a.style =
  ':host{display:inline-block;height:fit-content;border-radius:100%}.gux-badge{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;height:20px;padding:2px 8px;color:#fdfdfd;background-color:#2e394c;border-radius:4px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-badge gux-tooltip-title{white-space:nowrap}.gux-badge gux-tooltip-title ::slotted(gux-icon){height:16px;font-size:16px}.gux-badge .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-badge.gux-info,.gux-badge.gux-neutral{color:#2e394c;background-color:#e2e6ee}.gux-badge.gux-info.gux-bold,.gux-badge.gux-neutral.gux-bold{color:#fdfdfd;background-color:#2e394c}.gux-badge.gux-error,.gux-badge.gux-red{color:#8f0707;background-color:#fceaea}.gux-badge.gux-error.gux-bold,.gux-badge.gux-red.gux-bold{color:#fdfdfd;background-color:#ea0b0b}.gux-badge.gux-warning,.gux-badge.gux-yellow{color:#976700;background-color:#fdf8ec}.gux-badge.gux-warning.gux-bold,.gux-badge.gux-yellow.gux-bold{color:#2e394c;background-color:#ffae00}.gux-badge.gux-success,.gux-badge.gux-green{color:#205a10;background-color:#eefcea}.gux-badge.gux-success.gux-bold,.gux-badge.gux-green.gux-bold{color:#fdfdfd;background-color:#3c8527}.gux-badge.gux-inherit{color:inherit;background-color:inherit}';
export { a as gux_badge_beta };

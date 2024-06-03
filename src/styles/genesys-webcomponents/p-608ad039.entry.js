import { r as e, h as r, g as i } from './p-9031eb6a.js';
import { b as t } from './p-54ad2682.js';
import { t as o } from './p-6a46bf1b.js';
import './p-8a133b9b.js';
const a = {
    info: 'Information alert with message',
    success: 'Success alert with message',
    warning: 'Warning alert with message',
    error: 'Error alert with message',
  },
  n = class {
    constructor(r) {
      e(this, r), (this.accent = 'info');
    }
    getIcon(e) {
      switch (e) {
        case 'info':
        default:
          return 'alert-info';
        case 'success':
          return 'alert-success';
        case 'warning':
          return 'alert-warning-triangle';
        case 'error':
          return 'alert-warning-octogon';
      }
    }
    async componentWillLoad() {
      o(this.root, { variant: this.accent }), (this.i18n = await t(this.root, a));
    }
    render() {
      return r(
        'div',
        { class: { 'gux-inline-alert': !0, [`gux-${this.accent}`]: !0 } },
        r('gux-icon', { 'icon-name': this.getIcon(this.accent), decorative: !0 }),
        r(
          'div',
          { class: 'gux-message-wrapper' },
          r('div', { class: 'gux-sr-only' }, this.i18n(this.accent)),
          r('slot', null),
        ),
      );
    }
    get root() {
      return i(this);
    }
  };
n.style =
  ':host{display:block}.gux-inline-alert{display:flex;flex-direction:row;flex-wrap:nowrap;gap:8px;align-items:center;justify-content:flex-start;padding:4px 8px;border-radius:4px;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-inline-alert gux-icon{flex-shrink:0;align-self:flex-start;width:16px;height:16px;margin-top:2px}.gux-inline-alert gux-tooltip-title{white-space:nowrap}.gux-inline-alert .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-inline-alert.gux-info{color:#4c5667;background-color:#f6f7f9;border:1px solid #d7dce5}.gux-inline-alert.gux-error{color:#8f0707;background-color:#fceaea;border:1px solid #f8b2b2}.gux-inline-alert.gux-warning{color:#976700;background-color:#fdf8ec;border:1px solid #fce5b1}.gux-inline-alert.gux-success{color:#205a10;background-color:#eefcea;border:1px solid #c2deb9}';
export { n as gux_inline_alert_beta };

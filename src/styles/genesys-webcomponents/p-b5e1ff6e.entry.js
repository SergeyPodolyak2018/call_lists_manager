import { r as e, h as t, H as o, g as i } from './p-9031eb6a.js';
import { c as l, o as s } from './p-3f5341ea.js';
import { O as r } from './p-f222d4b1.js';
import { p as a } from './p-c10e41a9.js';
import { h as n } from './p-08bc2e6b.js';
import { G as d, a as p, g as c, v as f } from './p-36a19e41.js';
import { t as g } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const h = class {
  constructor(t) {
    e(this, t), (this.disabled = void 0), (this.hasError = !1), (this.hasHelp = !1);
  }
  onMutation() {
    (this.hasError = n(this.root, 'error')), (this.hasHelp = n(this.root, 'help'));
  }
  componentWillLoad() {
    this.setInput(), (this.hasError = n(this.root, 'error')), (this.hasHelp = n(this.root, 'help')), g(this.root);
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect();
  }
  render() {
    return t(
      o,
      { class: { 'gux-input-error': this.hasError, 'gux-disabled': this.disabled } },
      t(
        'div',
        { class: 'gux-form-field-container' },
        t(
          'div',
          { class: 'gux-input-label' },
          t('div', { class: 'gux-input' }, t('slot', { name: 'input', onSlotchange: () => this.setInput() })),
          t(
            'div',
            { class: 'gux-label' },
            t('slot', { name: 'label' }),
            t(d, { show: this.hasError }, t('slot', { name: 'error' })),
            t(p, { show: !this.hasError && this.hasHelp }, t('slot', { name: 'help' })),
          ),
        ),
      ),
    );
  }
  setInput() {
    (this.input = c(this.root, 'input[type="checkbox"][slot="input"]')),
      a(this.input),
      (this.disabled = l(this.input)),
      (this.disabledObserver = s(this.input, e => {
        this.disabled = e;
      })),
      f(this.root, this.input);
  }
  get root() {
    return i(this);
  }
};
(function (e, t, o, i) {
  var l,
    s = arguments.length,
    r = s < 3 ? t : null === i ? (i = Object.getOwnPropertyDescriptor(t, o)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(e, t, o, i);
  else for (var a = e.length - 1; a >= 0; a--) (l = e[a]) && (r = (s < 3 ? l(r) : s > 3 ? l(t, o, r) : l(t, o)) || r);
  s > 3 && r && Object.defineProperty(t, o, r);
})([r({ childList: !0, subtree: !0 })], h.prototype, 'onMutation', null),
  (h.style =
    ".gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}:host(.gux-input-error) ::slotted(input[type='checkbox']:not(:checked))::before{background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.3077 1.84615H3.69231C2.67271 1.84615 1.84615 2.67271 1.84615 3.69231V12.3077C1.84615 13.3273 2.67271 14.1538 3.69231 14.1538H12.3077C13.3273 14.1538 14.1538 13.3273 14.1538 12.3077V3.69231C14.1538 2.67271 13.3273 1.84615 12.3077 1.84615ZM3.69231 0C1.6531 0 0 1.6531 0 3.69231V12.3077C0 14.3469 1.6531 16 3.69231 16H12.3077C14.3469 16 16 14.3469 16 12.3077V3.69231C16 1.6531 14.3469 0 12.3077 0H3.69231Z' fill='%23ea0b0b'/%3E%3C/svg%3E\")}:host(.gux-disabled){cursor:not-allowed;opacity:0.5}:host(.gux-disabled) ::slotted(label){cursor:not-allowed}.gux-input-label{display:flex;flex-direction:row}.gux-input-label .gux-label{display:flex;flex-direction:column}::slotted(input[type='checkbox']){display:inline-grid;width:16px;height:16px;margin:4px;text-align:center;vertical-align:middle;-webkit-appearance:none;appearance:none;cursor:pointer;border:0;outline:none}::slotted(input[type='checkbox'])::before{grid-area:1;content:'';border-radius:15%}::slotted(input[type='checkbox']:focus-visible)::before{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}::slotted(input[type='checkbox']:not(:checked))::before{background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.3077 1.84615H3.69231C2.67271 1.84615 1.84615 2.67271 1.84615 3.69231V12.3077C1.84615 13.3273 2.67271 14.1538 3.69231 14.1538H12.3077C13.3273 14.1538 14.1538 13.3273 14.1538 12.3077V3.69231C14.1538 2.67271 13.3273 1.84615 12.3077 1.84615ZM3.69231 0C1.6531 0 0 1.6531 0 3.69231V12.3077C0 14.3469 1.6531 16 3.69231 16H12.3077C14.3469 16 16 14.3469 16 12.3077V3.69231C16 1.6531 14.3469 0 12.3077 0H3.69231Z' fill='%2377828f'/%3E%3C/svg%3E\")}::slotted(input[type='checkbox']:not(:checked):not(:disabled):not(:indeterminate):hover)::before{background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.3077 1.84615H3.69231C2.67271 1.84615 1.84615 2.67271 1.84615 3.69231V12.3077C1.84615 13.3273 2.67271 14.1538 3.69231 14.1538H12.3077C13.3273 14.1538 14.1538 13.3273 14.1538 12.3077V3.69231C14.1538 2.67271 13.3273 1.84615 12.3077 1.84615ZM3.69231 0C1.6531 0 0 1.6531 0 3.69231V12.3077C0 14.3469 1.6531 16 3.69231 16H12.3077C14.3469 16 16 14.3469 16 12.3077V3.69231C16 1.6531 14.3469 0 12.3077 0H3.69231Z' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='checkbox']:checked)::before{background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.69231 0H12.3077C13.287 0 14.2261 0.38901 14.9185 1.08145C15.611 1.77389 16 2.71305 16 3.69231V12.3077C16 13.287 15.611 14.2261 14.9185 14.9185C14.2261 15.611 13.287 16 12.3077 16H3.69231C2.71305 16 1.77389 15.611 1.08145 14.9185C0.38901 14.2261 0 13.287 0 12.3077V3.69231C0 2.71305 0.38901 1.77389 1.08145 1.08145C1.77389 0.38901 2.71305 0 3.69231 0ZM5.62483 11.5936C5.79089 11.7597 6.00122 11.8372 6.21155 11.8372C6.43295 11.8372 6.64329 11.7486 6.79827 11.5936L13.2854 5.10652C13.6064 4.78549 13.6064 4.25412 13.2854 3.93308C12.9643 3.61205 12.433 3.61205 12.1119 3.93308L6.21155 9.83348L3.87575 7.4866C3.55472 7.16557 3.02335 7.16557 2.70231 7.4866C2.38128 7.80764 2.38128 8.339 2.70231 8.66004L5.62483 11.5936Z' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='checkbox']:indeterminate)::before{background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.69231 1.84615H12.3077C13.3273 1.84615 14.1538 2.67271 14.1538 3.69231V12.3077C14.1538 13.3273 13.3273 14.1538 12.3077 14.1538H3.69231C2.67271 14.1538 1.84615 13.3273 1.84615 12.3077V3.69231C1.84615 2.67271 2.67271 1.84615 3.69231 1.84615ZM0 3.69231C0 1.6531 1.6531 0 3.69231 0H12.3077C14.3469 0 16 1.6531 16 3.69231V12.3077C16 14.3469 14.3469 16 12.3077 16H3.69231C1.6531 16 0 14.3469 0 12.3077V3.69231ZM4.00028 9.2308H12.0003C12.5049 9.2308 12.9234 8.81234 12.9234 8.30773C12.9234 7.80311 12.5049 7.38465 12.0003 7.38465H4.00028C3.49567 7.38465 3.07721 7.80311 3.07721 8.30773C3.07721 8.81234 3.49567 9.2308 4.00028 9.2308Z' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='checkbox']:disabled)::before{cursor:not-allowed;opacity:0.5}::slotted(label){display:inline-block;font-size:12px;line-height:24px;vertical-align:middle}");
export { h as gux_form_field_checkbox };

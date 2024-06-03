import { r as t, h as e, g as i } from './p-9031eb6a.js';
import { b as r } from './p-54ad2682.js';
import { O as s } from './p-f222d4b1.js';
import { a as o, o as a } from './p-3701eff0.js';
import { t as n } from './p-6a46bf1b.js';
import { G as l, a as h } from './p-0c09e6a8.js';
import { G as f, a as p, v as d, b as u } from './p-36a19e41.js';
import { h as g } from './p-08bc2e6b.js';
import { g as x } from './p-aa2f9991.js';
import './p-8a133b9b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const m = { required: 'Required' };
const c = class {
  constructor(e) {
    t(this, e),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
      (this.disabled = void 0),
      (this.required = !1),
      (this.hasError = !1),
      (this.hasHelp = !1);
  }
  watchValue(t) {
    const e = this.root.querySelector('gux-phone-input-beta');
    e && (e.hasError = t);
  }
  onMutation() {
    (this.hasError = g(this.root, 'error')), (this.hasHelp = g(this.root, 'help'));
  }
  async componentWillLoad() {
    (this.getI18nValue = await r(this.root, m)),
      this.setInput(),
      this.setLabel(),
      (this.hasError = g(this.root, 'error')),
      (this.hasHelp = g(this.root, 'help')),
      n(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver.disconnect(), this.requiredObserver.disconnect();
  }
  render() {
    return e(
      h,
      { labelPosition: this.computedLabelPosition },
      e(
        l,
        { position: this.computedLabelPosition, required: this.required },
        e('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
        this.renderScreenReaderText(this.getI18nValue('required'), this.required),
        this.renderScreenReaderText(x(this.root, 'error'), this.hasError),
      ),
      e(
        'div',
        { class: 'gux-input-and-error-container' },
        e(
          'div',
          { class: { 'gux-input': !0, 'gux-input-error': this.hasError } },
          e('div', { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled } }, e('slot', null)),
        ),
        e(f, { show: this.hasError }, e('slot', { name: 'error' })),
        e(p, { show: !this.hasError && this.hasHelp }, e('slot', { name: 'help' })),
      ),
    );
  }
  renderScreenReaderText(t, i = !0) {
    if (i) return e('gux-screen-reader-beta', null, t);
  }
  get variant() {
    return `phoneInput-${this.labelPosition ? this.labelPosition.toLowerCase() : 'none'}`;
  }
  setInput() {
    (this.phoneInputElement = this.root.querySelector('gux-phone-input-beta')),
      (this.disabled = this.phoneInputElement.disabled),
      (this.required = this.phoneInputElement.required),
      (this.disabledObserver = o(this.phoneInputElement, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = a(this.phoneInputElement, t => {
        this.required = t;
      })),
      d(this.root, this.phoneInputElement);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = u(this.label, this.labelPosition));
  }
  get root() {
    return i(this);
  }
  static get watchers() {
    return { hasError: ['watchValue'] };
  }
};
(function (t, e, i, r) {
  var s,
    o = arguments.length,
    a = o < 3 ? e : null === r ? (r = Object.getOwnPropertyDescriptor(e, i)) : r;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, r);
  else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (a = (o < 3 ? s(a) : o > 3 ? s(e, i, a) : s(e, i)) || a);
  o > 3 && a && Object.defineProperty(e, i, a);
})([s({ childList: !0, subtree: !0 })], c.prototype, 'onMutation', null),
  (c.style =
    ".gux-form-field-fieldset-container{display:flex;min-width:0;padding:0;margin:var(--gux-form-field-fieldset-container-margin-top, 16px) 0 var(--gux-form-field-fieldset-container-margin-bottom, 16px) 0;border:none}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-legend-label{padding:0}.gux-form-field-legend-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-legend-label.gux-beside{position:relative;top:8px;float:left;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-legend-label.gux-above{margin-bottom:8px}.gux-form-field-legend-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-input-and-error-container{flex-grow:1}");
export { c as gux_form_field_phone };

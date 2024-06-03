import { r as t, h as e, g as i } from './p-9031eb6a.js';
import { b as o } from './p-54ad2682.js';
import { c as s, o as r } from './p-3f5341ea.js';
import { O as a } from './p-f222d4b1.js';
import { o as n } from './p-3701eff0.js';
import { h as l } from './p-08bc2e6b.js';
import { G as h, a as f, s as p, c as d, b as x } from './p-36a19e41.js';
import { G as u, a as g } from './p-0c09e6a8.js';
import { g as m } from './p-aa2f9991.js';
import { t as c } from './p-6a46bf1b.js';
import './p-8a133b9b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const b = { required: 'Required' };
const w = class {
  constructor(e) {
    t(this, e),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
      (this.disabled = void 0),
      (this.required = void 0),
      (this.hasError = !1),
      (this.hasHelp = !1);
  }
  watchValue(t) {
    const e = this.root.querySelector('gux-dropdown') || this.root.querySelector('gux-dropdown-multi-beta');
    e && (e.hasError = t);
  }
  onMutation() {
    (this.hasError = l(this.root, 'error')), (this.hasHelp = l(this.root, 'help'));
  }
  async componentWillLoad() {
    (this.getI18nValue = await o(this.root, b)),
      this.setInput(),
      this.setLabel(),
      (this.hasError = l(this.root, 'error')),
      (this.hasHelp = l(this.root, 'help')),
      c(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect();
  }
  renderScreenReaderText(t, i = !1) {
    if (i) return e('gux-screen-reader-beta', null, t);
  }
  render() {
    return e(
      g,
      { labelPosition: this.computedLabelPosition },
      e(
        u,
        { position: this.computedLabelPosition, required: this.required },
        e('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
        this.renderScreenReaderText(this.getI18nValue('required'), this.required),
        this.renderScreenReaderText(m(this.root, 'error'), this.hasError),
        this.renderScreenReaderText(m(this.root, 'help'), this.hasHelp),
      ),
      e(
        'div',
        { class: 'gux-input-and-error-container' },
        e(
          'div',
          { class: { 'gux-input': !0, 'gux-input-error': this.hasError, 'gux-disabled': this.disabled } },
          e('slot', null),
        ),
        e(h, { show: this.hasError }, e('slot', { name: 'error' })),
        e(f, { show: !this.hasError && this.hasHelp }, e('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    return `dropdown-${this.labelPosition ? this.labelPosition.toLowerCase() : 'none'}`;
  }
  setInput() {
    (this.dropdownElement =
      this.root.querySelector('gux-dropdown') || this.root.querySelector('gux-dropdown-multi-beta')),
      (this.listboxElement = this.root.querySelector('gux-listbox') || this.root.querySelector('gux-listbox-multi')),
      (this.disabled = s(this.dropdownElement)),
      (this.required = this.dropdownElement.required),
      (this.disabledObserver = r(this.dropdownElement, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = n(this.dropdownElement, t => {
        this.required = t;
      })),
      p(this.root, this.listboxElement, 'label'),
      d(this.root, this.listboxElement, 'error'),
      d(this.root, this.listboxElement, 'help');
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = x(this.label, this.labelPosition));
  }
  get root() {
    return i(this);
  }
  static get watchers() {
    return { hasError: ['watchValue'] };
  }
};
(function (t, e, i, o) {
  var s,
    r = arguments.length,
    a = r < 3 ? e : null === o ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, o);
  else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a);
  r > 3 && a && Object.defineProperty(e, i, a);
})([a({ childList: !0, subtree: !0 })], w.prototype, 'onMutation', null),
  (w.style =
    ".gux-form-field-fieldset-container{display:flex;min-width:0;padding:0;margin:var(--gux-form-field-fieldset-container-margin-top, 16px) 0 var(--gux-form-field-fieldset-container-margin-bottom, 16px) 0;border:none}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-legend-label{padding:0}.gux-form-field-legend-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-legend-label.gux-beside{position:relative;top:8px;float:left;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-legend-label.gux-above{margin-bottom:8px}.gux-form-field-legend-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-input-and-error-container{flex-grow:1;width:1px}.gux-input-and-error-container .gux-input.gux-disabled{pointer-events:none;opacity:0.5}");
export { w as gux_form_field_dropdown };

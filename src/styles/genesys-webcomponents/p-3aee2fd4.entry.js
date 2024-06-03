import { r as t, h as i, g as e } from './p-9031eb6a.js';
import { c as o, o as r } from './p-3f5341ea.js';
import { O as n } from './p-f222d4b1.js';
import { o as s } from './p-3701eff0.js';
import { p as a } from './p-c10e41a9.js';
import { h as l } from './p-08bc2e6b.js';
import { G as f, a as p, g as u, v as x, b as h } from './p-36a19e41.js';
import { G as g, a as d } from './p-43ad56a8.js';
import { t as c } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const m = class {
  constructor(i) {
    t(this, i),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = void 0),
      (this.disabled = void 0),
      (this.required = void 0),
      (this.hasError = !1),
      (this.hasHelp = !1);
  }
  onMutation() {
    (this.hasError = l(this.root, 'error')), (this.hasHelp = l(this.root, 'help'));
  }
  componentWillLoad() {
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
  render() {
    return i(
      d,
      { labelPosition: this.computedLabelPosition },
      i(
        g,
        { position: this.computedLabelPosition, required: this.required },
        i('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
      ),
      i(
        'div',
        { class: 'gux-input-and-error-container' },
        i(
          'div',
          { class: { 'gux-input': !0, 'gux-input-error': this.hasError } },
          i(
            'div',
            { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled } },
            i('slot', { name: 'input', onSlotchange: () => this.setInput() }),
          ),
        ),
        i(f, { show: this.hasError }, i('slot', { name: 'error' })),
        i(p, { show: !this.hasError && this.hasHelp }, i('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    return this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
  }
  setInput() {
    (this.input = u(this.root, 'input[type="color"][slot="input"]')),
      a(this.input),
      (this.disabled = o(this.input)),
      (this.required = this.input.required),
      (this.disabledObserver = r(this.input, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = s(this.input, t => {
        this.required = t;
      })),
      x(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = h(this.label, this.labelPosition));
  }
  get root() {
    return e(this);
  }
};
(function (t, i, e, o) {
  var r,
    n = arguments.length,
    s = n < 3 ? i : null === o ? (o = Object.getOwnPropertyDescriptor(i, e)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, i, e, o);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(i, e, s) : r(i, e)) || s);
  n > 3 && s && Object.defineProperty(i, e, s);
})([n({ childList: !0, subtree: !0 })], m.prototype, 'onMutation', null),
  (m.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input){flex:1 1 auto;align-self:auto;order:0;width:32px;height:32px;overflow:hidden;font-size:12px;color:#2e394c;text-align:right;text-overflow:ellipsis;background-color:#f6f7f9;border:none;border-radius:4px;outline:none}::slotted(input)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center}.gux-input-and-error-container .gux-input .gux-input-container{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;height:32px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border-radius:4px}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input .gux-input-container.gux-input-error .gux-input-container{border-color:#ea0b0b}");
export { m as gux_form_field_color };

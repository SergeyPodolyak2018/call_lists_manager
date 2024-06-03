import { r as e, h as t, g as o } from './p-9031eb6a.js';
import { c as i, o as n } from './p-3f5341ea.js';
import { O as r } from './p-f222d4b1.js';
import { o as a } from './p-3701eff0.js';
import { p as s } from './p-c10e41a9.js';
import { h as l } from './p-08bc2e6b.js';
import { G as p, a as u, v as x, b as f } from './p-36a19e41.js';
import { G as c, a as h } from './p-43ad56a8.js';
import { t as g } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const d = class {
  constructor(t) {
    e(this, t),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
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
      g(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect();
  }
  render() {
    return t(
      h,
      { labelPosition: this.computedLabelPosition },
      t(
        c,
        { position: this.computedLabelPosition, required: this.required },
        t('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
      ),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t(
          'div',
          { class: { 'gux-input': !0, 'gux-input-error': this.hasError } },
          t(
            'div',
            { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled } },
            t('slot', { name: 'input' }),
            t('gux-icon', { 'icon-name': 'chevron-small-down', decorative: !0 }),
          ),
        ),
        t(p, { show: this.hasError }, t('slot', { name: 'error' })),
        t(u, { show: !this.hasError && this.hasHelp }, t('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    const e = this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
    return `${this.input.getAttribute('type')}-${e}`;
  }
  setInput() {
    (this.input = this.root.querySelector('select[slot="input"]')),
      s(this.input),
      (this.disabled = i(this.input)),
      (this.required = this.input.required),
      (this.disabledObserver = n(this.input, e => {
        this.disabled = e;
      })),
      (this.requiredObserver = a(this.input, e => {
        this.required = e;
      })),
      x(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = f(this.label, this.labelPosition));
  }
  get root() {
    return o(this);
  }
};
(function (e, t, o, i) {
  var n,
    r = arguments.length,
    a = r < 3 ? t : null === i ? (i = Object.getOwnPropertyDescriptor(t, o)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, i);
  else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (a = (r < 3 ? n(a) : r > 3 ? n(t, o, a) : n(t, o)) || a);
  r > 3 && a && Object.defineProperty(t, o, a);
})([r({ childList: !0, subtree: !0 })], d.prototype, 'onMutation', null),
  (d.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(select){flex:1 1 auto;align-self:auto;order:0;width:100%;height:30px;padding:0 32px 0 12px;margin:0;color:#2e394c;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#f6f7f9;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}::slotted(select)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input .gux-input-container{position:relative;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{pointer-events:none;opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container:hover gux-icon{color:#2a60c8}.gux-input-and-error-container .gux-input .gux-input-container select{flex:1 1 auto;align-self:auto;order:0;height:32px;padding:0 32px 0 12px;margin:0;color:#2e394c;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#f6f7f9;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-input-and-error-container .gux-input .gux-input-container gux-icon{position:absolute;top:0;right:0;width:16px;height:16px;margin:8px;pointer-events:none}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error .gux-input-container{border-color:#ea0b0b}");
export { d as gux_form_field_select };

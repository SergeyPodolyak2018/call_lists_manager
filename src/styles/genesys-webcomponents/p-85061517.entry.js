import { r as t, f as i, h as e, g as o } from './p-9031eb6a.js';
import { c as r, o as n } from './p-3f5341ea.js';
import { O as s } from './p-f222d4b1.js';
import { o as a } from './p-3701eff0.js';
import { p as l } from './p-c10e41a9.js';
import { h as p } from './p-08bc2e6b.js';
import { h, d as f, G as u, a as x, g as c, v as d, b as g } from './p-36a19e41.js';
import { G as m, a as b } from './p-43ad56a8.js';
import { t as w } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const v = class {
  constructor(i) {
    t(this, i),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
      (this.clearable = !0),
      (this.disabled = void 0),
      (this.required = void 0),
      (this.hasContent = !1),
      (this.hasError = !1),
      (this.hasHelp = !1);
  }
  onMutation() {
    (this.hasError = p(this.root, 'error')), (this.hasHelp = p(this.root, 'help'));
  }
  async guxForceUpdate() {
    (this.hasContent = h(this.input)),
      (this.hasError = p(this.root, 'error')),
      (this.hasHelp = p(this.root, 'help')),
      i(this.root);
  }
  componentWillLoad() {
    this.setInput(),
      this.setLabel(),
      (this.hasError = p(this.root, 'error')),
      (this.hasHelp = p(this.root, 'help')),
      w(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect();
  }
  render() {
    return e(
      b,
      { labelPosition: this.computedLabelPosition },
      e(
        m,
        { position: this.computedLabelPosition, required: this.required },
        e('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
      ),
      e(
        'div',
        { class: 'gux-input-and-error-container' },
        e(
          'div',
          { class: { 'gux-input': !0, 'gux-input-error': this.hasError } },
          e(
            'div',
            { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled } },
            e('gux-icon', { 'icon-name': 'search', decorative: !0 }),
            e('slot', { name: 'input' }),
            this.clearable &&
              this.hasContent &&
              !this.disabled &&
              e('gux-form-field-input-clear-button', { onClick: () => f(this.input) }),
          ),
        ),
        e(u, { show: this.hasError }, e('slot', { name: 'error' })),
        e(x, { show: !this.hasError && this.hasHelp }, e('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    const t = this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
    return `${this.input.getAttribute('type')}-${t}`;
  }
  setInput() {
    (this.input = c(this.root, 'input[type="search"][slot="input"]')),
      (this.hasContent = h(this.input)),
      l(this.input),
      this.input.addEventListener('input', () => {
        this.hasContent = h(this.input);
      }),
      (this.disabled = r(this.input)),
      (this.required = this.input.required),
      (this.disabledObserver = n(this.input, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = a(this.input, t => {
        this.required = t;
      })),
      d(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = g(this.label, this.labelPosition));
  }
  get root() {
    return o(this);
  }
};
(function (t, i, e, o) {
  var r,
    n = arguments.length,
    s = n < 3 ? i : null === o ? (o = Object.getOwnPropertyDescriptor(i, e)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, i, e, o);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(i, e, s) : r(i, e)) || s);
  n > 3 && s && Object.defineProperty(i, e, s);
})([s({ childList: !0, subtree: !0 })], v.prototype, 'onMutation', null),
  (v.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input){flex:1 1 auto;align-self:auto;order:0;width:100%;overflow:hidden;font-size:12px;color:#2e394c;text-overflow:ellipsis;background-color:#f6f7f9;border:none;outline:none}::slotted(input)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center}.gux-input-and-error-container .gux-input .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 8px;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container gux-icon[icon-name='search']{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;margin-right:4px;color:#596373}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error .gux-input-container{border-color:#ea0b0b}");
export { v as gux_form_field_search };

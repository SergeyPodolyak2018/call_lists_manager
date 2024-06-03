import { r as t, f as i, h as e, g as o } from './p-9031eb6a.js';
import { c as s, o as r } from './p-3f5341ea.js';
import { O as n } from './p-f222d4b1.js';
import { o as a } from './p-3701eff0.js';
import { p as l } from './p-c10e41a9.js';
import { h as p } from './p-08bc2e6b.js';
import { h, c as f, d as u, G as x, a as d, g, v as c, b as m } from './p-36a19e41.js';
import { G as b, a as w } from './p-43ad56a8.js';
import { t as v } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const y = class {
  constructor(i) {
    t(this, i),
      (this.clearable = void 0),
      (this.labelPosition = void 0),
      (this.hasPrefix = void 0),
      (this.hasSuffix = void 0),
      (this.computedLabelPosition = 'above'),
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
      (this.hasPrefix = Boolean(this.root.querySelector('[slot="prefix"]'))),
      (this.hasSuffix = Boolean(this.root.querySelector('[slot="suffix"]'))),
      this.hasPrefix && f(this.root, this.input, 'prefix'),
      this.hasSuffix && f(this.root, this.input, 'suffix'),
      v(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect();
  }
  render() {
    return e(
      w,
      { labelPosition: this.computedLabelPosition },
      e(
        b,
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
            {
              class: {
                'gux-input-container': !0,
                'gux-disabled': this.disabled,
                'gux-has-prefix': this.hasPrefix,
                'gux-has-suffix': this.hasSuffix,
              },
            },
            e('slot', { name: 'prefix' }),
            e('slot', { name: 'input' }),
            e('slot', { name: 'suffix' }),
            this.clearable &&
              this.hasContent &&
              !this.disabled &&
              e('gux-form-field-input-clear-button', { onClick: () => u(this.input) }),
          ),
        ),
        e(x, { show: this.hasError }, e('slot', { name: 'error' })),
        e(d, { show: !this.hasError && this.hasHelp }, e('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    const t = this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
    return `${this.input.getAttribute('type')}-${this.clearable ? 'clearable' : 'unclearable'}-${t}`;
  }
  setInput() {
    (this.input = g(
      this.root,
      'input[type="email"][slot="input"], input[type="number"][slot="input"], input[type="password"][slot="input"], input[type="text"][slot="input"]',
    )),
      (this.hasContent = h(this.input)),
      l(this.input),
      this.input.addEventListener('input', () => {
        this.hasContent = h(this.input);
      }),
      (this.disabled = s(this.input)),
      (this.required = this.input.required),
      (this.disabledObserver = r(this.input, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = a(this.input, t => {
        this.required = t;
      })),
      c(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = m(this.label, this.labelPosition));
  }
  get root() {
    return o(this);
  }
};
(function (t, i, e, o) {
  var s,
    r = arguments.length,
    n = r < 3 ? i : null === o ? (o = Object.getOwnPropertyDescriptor(i, e)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) n = Reflect.decorate(t, i, e, o);
  else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (n = (r < 3 ? s(n) : r > 3 ? s(i, e, n) : s(i, e)) || n);
  r > 3 && n && Object.defineProperty(i, e, n);
})([n({ childList: !0, subtree: !0 })], y.prototype, 'onMutation', null),
  (y.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input){flex:1 1 auto;align-self:auto;order:0;width:100%;overflow:hidden;font-size:12px;color:#2e394c;text-overflow:ellipsis;background-color:#f6f7f9;border:none;outline:none}::slotted(input)::placeholder{color:#596373;opacity:1}slot[name='prefix'],slot[name='suffix']{color:#2e394c;white-space:nowrap}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input .gux-input-container{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-input-and-error-container .gux-input .gux-input-container.gux-has-suffix:not(.gux-input-and-error-container .gux-input .gux-input-container.gux-has-prefix) ::slotted(input){text-align:right}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error .gux-input-container{border-color:#ea0b0b}");
export { y as gux_form_field_text_like };

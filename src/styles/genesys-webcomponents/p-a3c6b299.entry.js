import { r as t, h as e, g as i } from './p-9031eb6a.js';
import { c as o, o as r } from './p-3f5341ea.js';
import { O as n } from './p-f222d4b1.js';
import { o as s } from './p-3701eff0.js';
import { p as a } from './p-c10e41a9.js';
import { h as l } from './p-08bc2e6b.js';
import { G as p, a as d, v as h, b as u } from './p-36a19e41.js';
import { G as x, a as f } from './p-43ad56a8.js';
import { t as g } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const c = class {
  constructor(e) {
    t(this, e),
      (this.resize = void 0),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
      (this.disabled = void 0),
      (this.required = !0),
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
  componentDidLoad() {
    this.updateHeight(this.textareaContainerElement, this.input, this.resize);
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect();
  }
  render() {
    return e(
      f,
      { labelPosition: this.computedLabelPosition },
      e(
        x,
        { position: this.computedLabelPosition, required: this.required },
        e('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
      ),
      e(
        'div',
        { class: 'gux-input-and-error-container' },
        e(
          'div',
          {
            ref: t => (this.textareaContainerElement = t),
            class: {
              'gux-input': !0,
              [`gux-resize-${this.resize}`]: !0,
              'gux-disabled': this.disabled,
              'gux-input-error': this.hasError,
            },
          },
          e('slot', { name: 'input' }),
        ),
        e(p, { show: this.hasError }, e('slot', { name: 'error' })),
        e(d, { show: !this.hasError && this.hasHelp }, e('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    const t = this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
    return `${this.resize}-${t}`;
  }
  setInput() {
    (this.input = this.root.querySelector('textarea[slot="input"]')),
      a(this.input),
      this.updateHeight(this.textareaContainerElement, this.input, this.resize),
      this.input.addEventListener('input', () => {
        this.updateHeight(this.textareaContainerElement, this.input, this.resize);
      }),
      (this.disabled = o(this.input)),
      (this.required = this.input.required),
      (this.disabledObserver = r(this.input, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = s(this.input, t => {
        this.required = t;
      })),
      h(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = u(this.label, this.labelPosition));
  }
  updateHeight(t, e, i) {
    'auto' === i && t && ((t.dataset.replicatedValue = e.value), (t.style.maxHeight = e.style.maxHeight));
  }
  get root() {
    return i(this);
  }
};
(function (t, e, i, o) {
  var r,
    n = arguments.length,
    s = n < 3 ? e : null === o ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, i, s) : r(e, i)) || s);
  n > 3 && s && Object.defineProperty(e, i, s);
})([n({ childList: !0, subtree: !0 })], c.prototype, 'onMutation', null),
  (c.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(textarea){flex:1 1 auto;align-self:auto;order:0;font-family:inherit;color:#2e394c;resize:vertical;background-color:#f6f7f9;background-image:none;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;min-height:90px;padding:4px 12px;margin:0}::slotted(textarea)::placeholder{color:#596373;opacity:1}::slotted(textarea)[disabled]{opacity:0.5}::slotted(textarea)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{position:relative;display:flex;border:1px solid #6b7585;border-radius:4px;outline:none}.gux-input-and-error-container .gux-input:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error{border-color:#ea0b0b}.gux-input-and-error-container .gux-input.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input.gux-resize-none ::slotted(textarea){resize:none}.gux-input-and-error-container .gux-input.gux-resize-auto{display:grid;overflow:hidden;word-break:normal;word-break:break-word;overflow-wrap:anywhere}.gux-input-and-error-container .gux-input.gux-resize-auto::after{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;white-space:pre-wrap;visibility:hidden;content:attr(data-replicated-value) ' ';min-height:90px;padding:4px 12px;margin:0}.gux-input-and-error-container .gux-input.gux-resize-auto ::slotted(textarea){grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;overflow-x:hidden;resize:none}");
export { c as gux_form_field_textarea };

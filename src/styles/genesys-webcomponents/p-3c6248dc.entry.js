import { r as e, h as t, H as i, g as o } from './p-9031eb6a.js';
import { c as s, o as l } from './p-3f5341ea.js';
import { O as r } from './p-f222d4b1.js';
import { p as a } from './p-c10e41a9.js';
import { h as n } from './p-08bc2e6b.js';
import { G as d, a as p, g as f, v as c } from './p-36a19e41.js';
import { t as u } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const g = class {
  constructor(t) {
    e(this, t), (this.disabled = void 0), (this.hasError = !1), (this.hasHelp = !1);
  }
  onMutation() {
    (this.hasError = n(this.root, 'error')), (this.hasHelp = n(this.root, 'help'));
  }
  componentWillLoad() {
    this.setInput(), (this.hasError = n(this.root, 'error')), (this.hasHelp = n(this.root, 'help')), u(this.root);
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect();
  }
  render() {
    return t(
      i,
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
    (this.input = f(this.root, 'input[type="radio"][slot="input"]')),
      a(this.input),
      (this.disabled = s(this.input)),
      (this.disabledObserver = l(this.input, e => {
        this.disabled = e;
      })),
      c(this.root, this.input);
  }
  get root() {
    return o(this);
  }
};
(function (e, t, i, o) {
  var s,
    l = arguments.length,
    r = l < 3 ? t : null === o ? (o = Object.getOwnPropertyDescriptor(t, i)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, o);
  else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (r = (l < 3 ? s(r) : l > 3 ? s(t, i, r) : s(t, i)) || r);
  l > 3 && r && Object.defineProperty(t, i, r);
})([r({ childList: !0, subtree: !0 })], g.prototype, 'onMutation', null),
  (g.style =
    ".gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}:host(.gux-disabled){cursor:not-allowed;opacity:0.5}:host(.gux-disabled) ::slotted(label){cursor:not-allowed}.gux-input-label{display:flex;flex-direction:row}.gux-input-label .gux-label{display:flex;flex-direction:column}::slotted(input[type='radio']){display:inline-grid;width:16px;height:16px;margin:4px;text-align:center;vertical-align:middle;-webkit-appearance:none;appearance:none;cursor:pointer;border:0;outline:none}::slotted(input[type='radio'])::before{grid-area:1;content:'';border-radius:50%}::slotted(input[type='radio']:focus-visible)::before{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}::slotted(input[type='radio']:not(:checked))::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%2377828f'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:not(:checked):not(:disabled):hover)::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:checked)::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8.026 5.262a2.8 2.8 0 1 0 .001 5.601 2.8 2.8 0 0 0-.001-5.601zm0-2.2c-2.761 0-5 2.211-5 4.938s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:disabled)::before{cursor:not-allowed;opacity:0.5}::slotted(label){display:inline-block;font-size:12px;line-height:24px;vertical-align:middle}");
export { g as gux_form_field_radio };

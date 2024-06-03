import { r as t, h as i, H as e, g as n } from './p-9031eb6a.js';
import { c as r, o } from './p-3f5341ea.js';
import { O as a } from './p-f222d4b1.js';
import { o as s } from './p-3701eff0.js';
import { p as g } from './p-c10e41a9.js';
import { h as l } from './p-08bc2e6b.js';
import { G as p, a as u, g as x, v as h, b as d } from './p-36a19e41.js';
import { a as c, G as f } from './p-43ad56a8.js';
import { t as b } from './p-6a46bf1b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
import './p-8fe7daff.js';
import './p-d176c2ae.js';
const m = class {
  constructor(i) {
    t(this, i),
      (this.displayUnits = void 0),
      (this.valueInTooltip = void 0),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
      (this.disabled = void 0),
      (this.required = void 0),
      (this.hasError = !1),
      (this.hasHelp = !1),
      (this.value = void 0),
      (this.active = void 0),
      (this.valueWatcherId = void 0);
  }
  onInput(t) {
    this.updateValue(t.target.value);
  }
  onMousedown() {
    this.disabled || (this.active = !0);
  }
  onMouseup() {
    this.active = !1;
  }
  onMutation() {
    (this.hasError = l(this.root, 'error')), (this.hasHelp = l(this.root, 'help'));
  }
  componentWillLoad() {
    this.setInput(),
      this.setLabel(),
      (this.hasError = l(this.root, 'error')),
      (this.hasHelp = l(this.root, 'help')),
      b(this.root, { variant: this.variant });
  }
  componentDidLoad() {
    this.updatePosition();
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect(),
      clearInterval(this.valueWatcherId);
  }
  render() {
    return i(
      e,
      { class: { 'gux-active': this.active } },
      i(
        c,
        { labelPosition: this.computedLabelPosition },
        i(
          f,
          { position: this.computedLabelPosition, required: this.required },
          i('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
        ),
        i(
          'div',
          { class: 'gux-input-and-error-container' },
          this.renderRangeInput(),
          i(p, { show: this.hasError }, i('slot', { name: 'error' })),
          i(u, { show: !this.hasError && this.hasHelp }, i('slot', { name: 'help' })),
        ),
      ),
    );
  }
  get variant() {
    return this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
  }
  setInput() {
    (this.input = x(this.root, 'input[type="range"][slot="input"]')),
      g(this.input),
      (this.disabled = r(this.input)),
      (this.required = this.input.required),
      (this.value = this.input.value),
      (this.disabledObserver = o(this.input, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = s(this.input, t => {
        this.required = t;
      })),
      clearInterval(this.valueWatcherId),
      (this.valueWatcherId = setInterval(() => {
        this.value !== this.input.value && this.updateValue(this.input.value);
      }, 100)),
      h(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = d(this.label, this.labelPosition));
  }
  renderRangeInput() {
    return i(
      'div',
      { class: { 'gux-range-input-container': !0, 'gux-disabled': this.disabled } },
      i(
        'div',
        { class: 'gux-range' },
        i('div', { class: 'gux-track' }, i('div', { class: 'gux-progress', ref: t => (this.progressElement = t) })),
        i('slot', { name: 'input' }),
        i(
          'div',
          {
            class: { 'gux-range-tooltip-container': !0, 'gux-hidden': !this.valueInTooltip },
            ref: t => (this.sliderTooltipContainer = t),
          },
          i('div', { class: 'gux-range-tooltip', ref: t => (this.sliderTooltip = t) }, this.getDisplayValue()),
        ),
      ),
      i('div', { class: { 'gux-display': !0, 'gux-hidden': this.valueInTooltip } }, this.getDisplayValue()),
    );
  }
  updateValue(t) {
    (this.value = t), this.updatePosition();
  }
  updatePosition() {
    const t = Number(this.input.value || 0),
      i = Number(this.input.min || 0),
      e = ((t - i) / (Number(this.input.max || 100) - i)) * 100;
    this.sliderTooltip &&
      (this.sliderTooltip.style.left = e - (e / 8 / this.sliderTooltipContainer.offsetWidth) * 100 + '%'),
      (this.progressElement.style.width = `${e}%`);
  }
  getDisplayValue() {
    return this.displayUnits ? `${this.value}${this.displayUnits}` : this.value;
  }
  get root() {
    return n(this);
  }
};
(function (t, i, e, n) {
  var r,
    o = arguments.length,
    a = o < 3 ? i : null === n ? (n = Object.getOwnPropertyDescriptor(i, e)) : n;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, i, e, n);
  else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (a = (o < 3 ? r(a) : o > 3 ? r(i, e, a) : r(i, e)) || a);
  o > 3 && a && Object.defineProperty(i, e, a);
})([a({ childList: !0, subtree: !0 })], m.prototype, 'onMutation', null),
  (m.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input[type='range']){position:absolute;width:100%;height:2px;margin:6px 0;margin-top:calc(-1 * (12px / 2 + 2px));-webkit-appearance:none;background:transparent}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-range-input-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;height:32px;font-size:12px}.gux-input-and-error-container .gux-range-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-range-input-container .gux-range{position:relative;flex:1 1 auto;align-self:center;order:0}.gux-input-and-error-container .gux-range-input-container .gux-range:hover .gux-range-tooltip,.gux-input-and-error-container .gux-range-input-container .gux-range:focus-within .gux-range-tooltip{visibility:visible}.gux-input-and-error-container .gux-range-input-container .gux-range .gux-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad}.gux-input-and-error-container .gux-range-input-container .gux-range .gux-track .gux-progress{height:2px;background-color:#2a60c8}.gux-input-and-error-container .gux-range-input-container .gux-display{flex:0 1 auto;align-self:auto;order:0;height:32px;margin:0 0 0 16px;line-height:32px;text-align:right}.gux-input-and-error-container .gux-range-input-container .gux-display.gux-hidden{display:none}.gux-input-and-error-container .gux-range-tooltip-container{position:absolute;top:-50px;width:100%;height:32px;pointer-events:none}.gux-input-and-error-container .gux-range-tooltip-container.gux-hidden{display:none}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px;position:absolute;z-index:var(--gux-zindex-tooltip, 1);display:flex;align-items:center;justify-content:center;width:50px;height:32px;margin-left:-20px;visibility:hidden;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::after,.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::before{position:absolute;top:100%;left:50%;width:0;height:0;pointer-events:none;content:' ';border:solid transparent}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::after{margin-left:-4px;border-width:4px;border-top-color:#fdfdfd}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::before{margin-left:-6px;border-width:6px;border-top-color:#b4bccb}");
export { m as gux_form_field_range };

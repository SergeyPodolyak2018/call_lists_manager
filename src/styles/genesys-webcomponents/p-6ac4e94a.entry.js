import { r as t, f as e, h as o, g as i, c as r, H as n } from './p-9031eb6a.js';
import { b as s } from './p-54ad2682.js';
import { c as a, o as p } from './p-3f5341ea.js';
import { O as l } from './p-f222d4b1.js';
import { o as u } from './p-3701eff0.js';
import { p as c } from './p-c10e41a9.js';
import { s as h } from './p-8fe7daff.js';
import { s as d } from './p-d176c2ae.js';
import { h as x } from './p-08bc2e6b.js';
import { h as g, d as f, G as b, a as m, g as w, v, b as y } from './p-36a19e41.js';
import { G as j, a as k } from './p-43ad56a8.js';
import { t as z } from './p-6a46bf1b.js';
import { t as O } from './p-89af02eb.js';
import { O as C } from './p-23975bfb.js';
import { b as R } from './p-091f51f6.js';
import { a as D, c as _, o as E, f as I, s as L, b as P } from './p-42e2cc1f.js';
import { g as T } from './p-3e6097e5.js';
import { f as $ } from './p-82ffe3cc.js';
import './p-8a133b9b.js';
import './p-cbcbd1bb.js';
import './p-d0805f56.js';
const F = { increment: 'Increment', decrement: 'Decrement' };
const S = class {
  constructor(e) {
    t(this, e),
      (this.clearable = void 0),
      (this.labelPosition = void 0),
      (this.computedLabelPosition = 'above'),
      (this.disabled = void 0),
      (this.required = void 0),
      (this.hasContent = !1),
      (this.hasError = !1),
      (this.hasHelp = !1);
  }
  onMutation() {
    (this.hasError = x(this.root, 'error')), (this.hasHelp = x(this.root, 'help'));
  }
  async guxForceUpdate() {
    (this.hasContent = g(this.input)),
      (this.hasError = x(this.root, 'error')),
      (this.hasHelp = x(this.root, 'help')),
      e(this.root);
  }
  async componentWillLoad() {
    (this.getI18nValue = await s(this.root, F)),
      this.setInput(),
      this.setLabel(),
      (this.hasError = x(this.root, 'error')),
      (this.hasHelp = x(this.root, 'help')),
      z(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      this.requiredObserver && this.requiredObserver.disconnect();
  }
  render() {
    const t = this.clearable && this.hasContent && !this.disabled;
    return o(
      k,
      { labelPosition: this.computedLabelPosition },
      o(
        j,
        { position: this.computedLabelPosition, required: this.required },
        o('slot', { name: 'label', onSlotchange: () => this.setLabel() }),
      ),
      o(
        'div',
        { class: 'gux-input-and-error-container' },
        o(
          'div',
          { class: { 'gux-input': !0, 'gux-input-error': this.hasError }, part: 'input-section' },
          o(
            'div',
            { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled, 'gux-clear': t } },
            o('slot', { name: 'input', onSlotchange: () => this.setInput() }),
            t && o('gux-form-field-input-clear-button', { onClick: () => f(this.input) }),
          ),
          this.renderStepButtons(this.input, this.getI18nValue, this.disabled),
        ),
        o(b, { show: this.hasError }, o('slot', { name: 'error' })),
        o(m, { show: !this.hasError && this.hasHelp }, o('slot', { name: 'help' })),
      ),
    );
  }
  get variant() {
    const t = this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
    return `${this.clearable ? 'clearable' : 'unclearable'}-${t}`;
  }
  setInput() {
    (this.input = w(this.root, 'input[type="number"][slot="input"]')),
      (this.hasContent = g(this.input)),
      c(this.input),
      this.input.addEventListener('input', () => {
        this.hasContent = g(this.input);
      }),
      (this.disabled = a(this.input)),
      (this.required = this.input.required),
      (this.disabledObserver = p(this.input, t => {
        this.disabled = t;
      })),
      (this.requiredObserver = u(this.input, t => {
        this.required = t;
      })),
      v(this.root, this.input);
  }
  setLabel() {
    (this.label = this.root.querySelector('label[slot="label"]')),
      (this.computedLabelPosition = y(this.label, this.labelPosition));
  }
  renderStepButtons(t, e, i) {
    return o(
      'div',
      { class: 'gux-step-buttons-container' },
      o(
        'button',
        {
          class: 'gux-step-button',
          tabIndex: -1,
          type: 'button',
          title: e('increment'),
          disabled: i,
          onClick: () => this.stepUp(t),
        },
        o('gux-icon', { 'icon-name': 'chevron-small-up', decorative: !0 }),
      ),
      o(
        'button',
        {
          class: 'gux-step-button',
          tabIndex: -1,
          type: 'button',
          title: e('decrement'),
          disabled: i,
          onClick: () => this.stepDown(t),
        },
        o('gux-icon', { 'icon-name': 'chevron-small-down', decorative: !0 }),
      ),
    );
  }
  stepDown(t) {
    '' === t.value ? h(t, t.min || '0', !1) : (t.stepDown(), this.simulateNativeInputAndChangeEvents(t));
  }
  stepUp(t) {
    '' === t.value ? h(t, t.min || '0', !1) : (t.stepUp(), this.simulateNativeInputAndChangeEvents(t));
  }
  simulateNativeInputAndChangeEvents(t) {
    d(t, 'input'), d(t, 'change');
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return i(this);
  }
};
(function (t, e, o, i) {
  var r,
    n = arguments.length,
    s = n < 3 ? e : null === i ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, o, i);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, o, s) : r(e, o)) || s);
  n > 3 && s && Object.defineProperty(e, o, s);
})([l({ childList: !0, subtree: !0 })], S.prototype, 'onMutation', null),
  (S.style =
    ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input){flex:1 1 auto;align-self:auto;order:0;width:100%;overflow:hidden;font-size:12px;color:#2e394c;text-align:right;text-overflow:ellipsis;background-color:#f6f7f9;border:none;outline:none}::slotted(input)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;width:100%}.gux-input-and-error-container .gux-input .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container.gux-clear{padding-right:0}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error .gux-input-container{border-color:#ea0b0b}.gux-step-buttons-container{flex:0 1 14px;align-self:auto;order:0;margin:0 4px}.gux-step-buttons-container .gux-step-button{display:flex;flex:0 1 auto;align-items:center;align-self:auto;justify-content:center;order:0;padding:0;color:#596373;background:transparent;border:none}.gux-step-buttons-container .gux-step-button:not(:disabled):focus-visible,.gux-step-buttons-container .gux-step-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}.gux-step-buttons-container .gux-step-button gux-icon{flex:0 0 auto;width:14px;height:14px}");
const U = class {
  constructor(e) {
    t(this, e), (this.goToPage = r(this, 'goToPage', 7)), (this.isOpen = !1), (this.totalPages = void 0);
  }
  handleKeyDown(t) {
    const e = t.composedPath();
    switch (t.key) {
      case 'Escape':
        (this.isOpen = !1), this.ellipsisButton.focus();
        break;
      case 'Tab':
        this.isOpen = !1;
        break;
      case 'ArrowDown':
      case 'Enter':
        e.includes(this.ellipsisButton) && (t.preventDefault(), (this.isOpen = !0), this.focusInputElement());
    }
  }
  handleKeyup(t) {
    if (' ' === t.key) t.composedPath().includes(this.ellipsisButton) && ((this.isOpen = !0), this.focusInputElement());
  }
  toggle() {
    (this.isOpen = !this.isOpen), this.isOpen && this.focusInputElement();
  }
  onClickOutside() {
    this.isOpen = !1;
  }
  focusInputElement() {
    R(() => {
      this.inputElement.focus();
    });
  }
  applyInputListener() {
    var t;
    null === (t = this.inputElement) ||
      void 0 === t ||
      t.addEventListener('keydown', t => {
        ('Enter' != t.key && ' ' != t.key) ||
          (t.preventDefault(), this.goToPage.emit(t.target.value), (this.isOpen = !1));
      });
  }
  async componentWillLoad() {
    (this.i18n = await s(this.root, O)), z(this.root);
  }
  componentDidLoad() {
    this.applyInputListener();
  }
  render() {
    return o(
      n,
      null,
      o(
        'button',
        {
          id: 'popover-target',
          type: 'button',
          ref: t => (this.ellipsisButton = t),
          onClick: () => this.toggle(),
          'aria-haspopup': 'true',
          'aria-expanded': this.isOpen.toString(),
        },
        o('gux-icon', { screenreaderText: this.i18n('goToPage'), 'icon-name': 'menu-kebab-horizontal' }),
      ),
      o('gux-tooltip', { for: 'popover-target' }, this.i18n('goToPage')),
      o(
        'gux-popover-beta',
        { 'is-open': this.isOpen, for: 'popover-target' },
        o('span', { slot: 'title' }, this.i18n('goToPage')),
        o(
          'gux-form-field-number',
          null,
          o('input', {
            slot: 'input',
            type: 'number',
            ref: t => (this.inputElement = t),
            min: '1',
            max: this.totalPages,
            value: '1',
          }),
          o('label', { slot: 'label' }),
        ),
      ),
    );
  }
  get root() {
    return i(this);
  }
};
(function (t, e, o, i) {
  var r,
    n = arguments.length,
    s = n < 3 ? e : null === i ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, o, i);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, o, s) : r(e, o)) || s);
  n > 3 && s && Object.defineProperty(e, o, s);
})([C({ triggerEvents: 'mousedown' })], U.prototype, 'onClickOutside', null),
  (U.style =
    "button{padding:0 2px;color:#6b7585;cursor:pointer;background:none;border:none}button:hover{color:#2e394c}button:focus-visible{border:3px solid #aac9ff;border-radius:5px;outline:none}button gux-icon{width:16px;height:16px;padding-top:4px}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}input[type='number']{-moz-appearance:textfield}");
const B = class {
  constructor(e) {
    t(this, e),
      (this.guxdismiss = r(this, 'guxdismiss', 7)),
      (this.for = void 0),
      (this.position = 'bottom'),
      (this.displayDismissButton = void 0),
      (this.closeOnClickOutside = !1),
      (this.isOpen = !1);
  }
  checkForClickOutside(t) {
    const e = t.composedPath(),
      o = $(this.root, this.for),
      i = e.includes(o);
    (!this.closeOnClickOutside && this.displayDismissButton) || !this.isOpen || i || this.dismiss();
  }
  get titleSlot() {
    return T(this.root, 'title');
  }
  runUpdatePosition() {
    this.root.isConnected
      ? (this.cleanupUpdatePosition = D($(this.root, this.for), this.popupElement, () => this.updatePosition(), {
          ancestorScroll: !0,
          elementResize: !0,
          animationFrame: !0,
          ancestorResize: !0,
        }))
      : this.disconnectedCallback();
  }
  updatePosition() {
    const t = $(this.root, this.for);
    this.popupElement &&
      _(t, this.popupElement, {
        placement: this.position,
        middleware: [E(7), I(), L(), P({ element: this.arrowElement, padding: 16 })],
      }).then(({ x: t, y: e, middlewareData: o, placement: i }) => {
        Object.assign(this.popupElement.style, { left: `${t}px`, top: `${e}px` });
        const r = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[i.split('-')[0]];
        if (o.arrow) {
          const { x: t, y: e } = o.arrow;
          this.popupElement.setAttribute('data-placement', i),
            Object.assign(this.arrowElement.style, {
              left: null != t ? `${t}px` : '',
              top: null != e ? `${e}px` : '',
              right: '',
              bottom: '',
              [r]: '-6.5px',
              transform: 'rotate(45deg)',
            });
        }
      });
  }
  dismiss() {
    this.guxdismiss.emit().defaultPrevented || (this.isOpen = !1);
  }
  connectedCallback() {
    z(this.root, { variant: this.position });
  }
  componentDidLoad() {
    this.isOpen && this.runUpdatePosition();
  }
  componentDidUpdate() {
    this.isOpen ? this.runUpdatePosition() : this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  disconnectedCallback() {
    this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  renderDismissButton() {
    if (this.displayDismissButton)
      return o('gux-dismiss-button', { onClick: this.dismiss.bind(this), position: 'inherit' });
  }
  render() {
    return o(
      'div',
      {
        ref: t => (this.popupElement = t),
        class: { 'gux-hidden': !this.isOpen, 'gux-popover-wrapper': !0 },
        'data-placement': !0,
      },
      o('div', { ref: t => (this.arrowElement = t), class: 'gux-arrow' }),
      o(
        'div',
        { class: { 'gux-popover-header': Boolean(this.titleSlot) } },
        o('slot', { name: 'title' }),
        this.renderDismissButton(),
      ),
      o('div', { class: 'gux-popover-content' }, o('slot', null)),
    );
  }
  get root() {
    return i(this);
  }
};
(function (t, e, o, i) {
  var r,
    n = arguments.length,
    s = n < 3 ? e : null === i ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, o, i);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, o, s) : r(e, o)) || s);
  n > 3 && s && Object.defineProperty(e, o, s);
})([C({ triggerEvents: 'mousedown' })], B.prototype, 'checkForClickOutside', null),
  (B.style =
    ".gux-popover-wrapper{position:absolute;top:0;left:0;z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:16px;color:#2e394c;background-color:#fdfdfd;border-radius:4px;box-shadow:0 3px 14px rgba(46, 57, 76, 0.22)}.gux-popover-wrapper.gux-hidden{display:none}.gux-popover-wrapper .gux-arrow{position:absolute;width:10px;height:10px;background:inherit}.gux-popover-wrapper[data-placement='bottom'] .gux-arrow,.gux-popover-wrapper[data-placement='bottom-start'] .gux-arrow,.gux-popover-wrapper[data-placement='bottom-end'] .gux-arrow{border-top:1px solid #b4bccb;border-left:1px solid #b4bccb}.gux-popover-wrapper[data-placement='top'] .gux-arrow,.gux-popover-wrapper[data-placement='top-start'] .gux-arrow,.gux-popover-wrapper[data-placement='top-end'] .gux-arrow{border-right:1px solid #b4bccb;border-bottom:1px solid #b4bccb}.gux-popover-wrapper[data-placement='left'] .gux-arrow,.gux-popover-wrapper[data-placement='left-start'] .gux-arrow,.gux-popover-wrapper[data-placement='left-end'] .gux-arrow{border-top:1px solid #b4bccb;border-right:1px solid #b4bccb}.gux-popover-wrapper[data-placement='right'] .gux-arrow,.gux-popover-wrapper[data-placement='right-start'] .gux-arrow,.gux-popover-wrapper[data-placement='right-end'] .gux-arrow{border-bottom:1px solid #b4bccb;border-left:1px solid #b4bccb}.gux-popover-wrapper .gux-popover-header{font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;display:flex;flex-direction:row;align-content:center;align-items:center;justify-content:space-between;padding-bottom:16px}.gux-popover-wrapper gux-dismiss-button{float:right}");
export { S as gux_form_field_number, U as gux_pagination_ellipsis_button, B as gux_popover_beta };

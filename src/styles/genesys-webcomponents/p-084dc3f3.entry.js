import { r as t, h as n, g as e } from './p-9031eb6a.js';
import { t as i } from './p-6a46bf1b.js';
import { b as o } from './p-54ad2682.js';
import { r } from './p-cbcbd1bb.js';
import { a } from './p-3701eff0.js';
import { s as u } from './p-8fe7daff.js';
import { s } from './p-d176c2ae.js';
import { c as g, a as p } from './p-eab67c09.js';
import './p-8a133b9b.js';
const c = class {
  constructor(n) {
    t(this, n);
  }
  componentWillLoad() {
    i(this.root);
  }
  render() {
    return n(
      'div',
      { class: 'gux-container' },
      n('gux-icon', { 'icon-name': 'alert-warning-octogon', decorative: !0 }),
      n('div', { class: 'gux-message' }, n('slot', null), n('slot', { name: 'error' })),
    );
  }
  get root() {
    return e(this);
  }
};
c.style =
  '.gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;font-size:11px;color:#2e394c}.gux-container gux-icon{flex:0 1 auto;align-self:auto;order:0;width:16px;height:16px;margin:0 4px;color:#ea0b0b}.gux-container .gux-message{flex:0 1 auto;align-self:auto;order:0}';
const l = class {
  constructor(n) {
    t(this, n);
  }
  render() {
    return n(
      'div',
      { class: 'gux-input-checkbox-container' },
      n('slot', { name: 'input' }),
      n('slot', { name: 'label' }),
    );
  }
};
l.style =
  "gux-input-checkbox{display:block;color:#2e394c}gux-input-checkbox .gux-input-checkbox-container{position:relative;padding-left:24px;line-height:24px}gux-input-checkbox input{position:absolute;z-index:-1;opacity:0}gux-input-checkbox label{display:inline-block;font-size:12px}gux-input-checkbox label:hover{cursor:pointer}gux-input-checkbox label::after{position:absolute;top:4px;left:4px;display:block;width:16px;height:16px;content:'';border-radius:15%}gux-input-checkbox input:focus-visible~label::after{box-shadow:0 0 3px 2px #aac9ff}gux-input-checkbox input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%2377828f' /%3E%3C/svg%3E\")}gux-input-checkbox.gux-input-error input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%23ea0b0b' /%3E%3C/svg%3E\")}gux-input-checkbox input:not(:checked):not(:disabled):not(:indeterminate)~label:hover::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:checked~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 1.467h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zM6.8 11 3.638 7.941l.89-.932L6.8 9.2l3.947-3.861.891.932z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:indeterminate~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4.138 8.467h7v-1h-7zm7-7h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zm2 10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:disabled~label::after,gux-input-checkbox input:disabled~label{cursor:not-allowed;opacity:0.5}";
const x = { required: 'Required' },
  d = class {
    constructor(n) {
      t(this, n),
        (this.requiredId = r('gux-input-color-required')),
        (this.guxLabelDescribedby = void 0),
        (this.guxErrorDescribedby = void 0),
        (this.guxRequired = void 0),
        (this.disabled = void 0),
        (this.color = void 0),
        (this.opened = void 0),
        (this.colorOnOpen = void 0);
    }
    onClick(t) {
      this.root.contains(t.target) || this.setOpened(!1);
    }
    onInput(t) {
      this.color = t.target.value;
    }
    async componentWillLoad() {
      (this.i18n = await o(this.root, x)),
        (this.input = this.root.querySelector('input[slot="input"]')),
        this.input.addEventListener('change', t => {
          this.opened && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
        }),
        (this.disabledObserver = a(this.input, t => {
          this.disabled = t;
        })),
        (this.disabled = this.input.disabled),
        (this.color = this.input.value);
    }
    disconnectedCallback() {
      this.disabledObserver && this.disabledObserver.disconnect();
    }
    render() {
      return n(
        'section',
        null,
        n('span', { class: 'gux-hidden', id: this.requiredId }, this.i18n('required')),
        n(
          'button',
          {
            'aria-describedby': `${this.guxLabelDescribedby} ${this.guxRequired ? this.requiredId : ''} ${
              this.guxErrorDescribedby
            }`,
            'aria-expanded': this.opened ? 'true' : 'false',
            type: 'button',
            class: { 'gux-input-color-main-element': !0, 'gux-opened': this.opened },
            disabled: this.disabled,
            onClick: this.clickHandler.bind(this),
          },
          n('div', { class: 'gux-input-color-selected-color', style: { background: this.color } }),
          n('div', { class: 'gux-input-color-color-name' }, this.color),
          n('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
        ),
        n(
          'gux-color-select',
          { class: { 'gux-input-color-color-select': !0, 'gux-opened': this.opened } },
          n('slot', { name: 'input', slot: 'input' }),
        ),
      );
    }
    setOpened(t) {
      this.colorOnOpen &&
        this.colorOnOpen !== this.color &&
        ((this.colorOnOpen = this.color), this.input.dispatchEvent(new Event('change', { bubbles: !0 }))),
        (this.colorOnOpen = this.color),
        (this.opened = t);
    }
    clickHandler() {
      this.disabled || this.setOpened(!this.opened);
    }
    get root() {
      return e(this);
    }
  };
d.style =
  'gux-input-color{color:#2e394c}gux-input-color>section{position:relative;display:inline-block;width:160px}gux-input-color>gux-input-color-option{display:none}gux-input-color .gux-input-color-main-element{box-sizing:border-box;width:100%;padding:0;margin:0;cursor:pointer;user-select:none;background-color:#f6f7f9;border:1px solid #b4bccb;border-radius:4px;outline:none;box-shadow:0 0 0 0 transparent;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);transition:box-shadow 0.2s}gux-input-color .gux-input-color-main-element:focus-visible,gux-input-color .gux-input-color-main-element.gux-opened{border-color:#2a60c8;outline:none;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}gux-input-color .gux-input-color-main-element:disabled{pointer-events:none;cursor:default;opacity:0.5}gux-input-color .gux-input-color-main-element:hover gux-icon,gux-input-color .gux-input-color-main-element:focus-visible gux-icon{color:#2e394c}gux-input-color .gux-input-color-selected-color{float:left;padding:8px;margin:8px 12px}gux-input-color .gux-input-color-color-name{float:left;margin:9px 0;font-size:12px}gux-input-color .gux-input-color-color-select{position:absolute;top:100%;left:0;z-index:var(--gux-zindex-popup, 1);display:none;width:100%}gux-input-color .gux-input-color-color-select.gux-opened{display:inherit}gux-input-color gux-icon{position:absolute;top:0;right:0;display:flex;align-items:center;width:16px;height:100%;padding:0 7px;overflow:hidden;color:#596373;pointer-events:none;cursor:pointer;background:none;border:none;outline:none}gux-input-color .gux-hidden{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}';
const h = { clear: 'Clear', increment: 'Increment', decrement: 'Decrement' },
  b = class {
    constructor(n) {
      t(this, n), (this.clearable = void 0), (this.hasContent = !1), (this.disabled = void 0);
    }
    clearInput() {
      u(this.input, '', !0);
    }
    setHasContent() {
      this.hasContent = Boolean(this.input.value);
    }
    simulateNativeInputAndChangeEvents() {
      s(this.input, 'input'), s(this.input, 'change');
    }
    stepUp() {
      '' === this.input.value
        ? u(this.input, this.input.min || '0', !1)
        : (this.input.stepUp(), this.simulateNativeInputAndChangeEvents());
    }
    stepDown() {
      '' === this.input.value
        ? u(this.input, this.input.min || '0', !1)
        : (this.input.stepDown(), this.simulateNativeInputAndChangeEvents());
    }
    renderClearButton() {
      return this.clearable && this.hasContent && !this.disabled
        ? n(
            'button',
            {
              class: 'gux-clear-button',
              tabIndex: -1,
              type: 'button',
              title: this.getI18nValue('clear'),
              disabled: this.disabled,
              onClick: this.clearInput.bind(this),
            },
            n('gux-icon', { 'icon-name': 'close', decorative: !0 }),
          )
        : null;
    }
    renderStepButtons() {
      return n(
        'div',
        { class: 'gux-step-buttons-container' },
        n(
          'button',
          {
            class: 'gux-step-button',
            tabIndex: -1,
            type: 'button',
            title: this.getI18nValue('increment'),
            disabled: this.disabled,
            onClick: () => this.stepUp(),
          },
          n('gux-icon', { 'icon-name': 'chevron-small-up', decorative: !0 }),
        ),
        n(
          'button',
          {
            class: 'gux-step-button',
            tabIndex: -1,
            type: 'button',
            title: this.getI18nValue('decrement'),
            disabled: this.disabled,
            onClick: () => this.stepDown(),
          },
          n('gux-icon', { 'icon-name': 'chevron-small-down', decorative: !0 }),
        ),
      );
    }
    async componentWillLoad() {
      (this.getI18nValue = await o(this.root, h)),
        (this.input = this.root.querySelector('input[slot="input"]')),
        this.setHasContent(),
        (this.disabled = this.input.disabled),
        this.input.addEventListener('input', () => {
          this.setHasContent();
        }),
        (this.disabledObserver = a(this.input, t => {
          this.disabled = t;
        }));
    }
    disconnectedCallback() {
      this.disabledObserver && this.disabledObserver.disconnect();
    }
    render() {
      return n(
        'div',
        { class: { 'gux-input-number-container': !0, 'gux-disabled': this.disabled } },
        n('div', { class: 'gux-input-container' }, n('slot', { name: 'input' }), this.renderClearButton()),
        this.renderStepButtons(),
      );
    }
    get root() {
      return e(this);
    }
  };
b.style =
  "gux-input-number{position:relative;display:block}gux-input-number .gux-input-number-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center}gux-input-number .gux-input-number-container.gux-disabled{opacity:0.5}gux-input-number .gux-input-number-container .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-number .gux-input-number-container .gux-input-container input{flex:1 1 auto;align-self:auto;order:0;color:#2e394c;text-align:right;background-color:#f6f7f9;border:none;outline:none;}gux-input-number .gux-input-number-container .gux-input-container input::placeholder{color:#596373;opacity:1}gux-input-number .gux-input-number-container .gux-input-container input::-webkit-outer-spin-button,gux-input-number .gux-input-number-container .gux-input-container input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}gux-input-number .gux-input-number-container .gux-input-container input[type='number']{-moz-appearance:textfield}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button:not(:disabled):focus-visible,gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button gux-icon{width:12px;height:12px}gux-input-number .gux-input-number-container .gux-step-buttons-container{flex:0 1 16px;align-self:auto;order:0;margin:0 4px}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button:not(:disabled):focus-visible,gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button gux-icon{width:10px;height:10px}gux-input-number .gux-input-number-container:focus-within .gux-input-container{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}";
const m = class {
  constructor(n) {
    t(this, n);
  }
  render() {
    return n('div', { class: 'gux-input-radio-container' }, n('slot', { name: 'input' }), n('slot', { name: 'label' }));
  }
};
m.style =
  "gux-input-radio{display:block;color:#2e394c}gux-input-radio .gux-input-radio-container{position:relative;padding-left:24px;line-height:24px}gux-input-radio input{position:absolute;z-index:-1;opacity:0}gux-input-radio label{display:inline-block;font-size:12px}gux-input-radio label::after{position:absolute;top:4px;left:4px;display:block;width:16px;height:16px;content:'';border-radius:50%}gux-input-radio input:focus-within~label::after{box-shadow:0 0 2px 1px #aac9ff, inset 0 0 2px 1px #aac9ff}gux-input-radio input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%2377828f'/%3E%3C/svg%3E\")}gux-input-radio input:not(:checked):not(:disabled)~label:hover::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%232a60c8'/%3E%3C/svg%3E\")}gux-input-radio input:checked~label::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8.026 5.262a2.8 2.8 0 1 0 .001 5.601 2.8 2.8 0 0 0-.001-5.601zm0-2.2c-2.761 0-5 2.211-5 4.938s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%232a60c8'/%3E%3C/svg%3E\")}gux-input-radio input:disabled~label::after,gux-input-radio input:disabled~label{cursor:not-allowed;opacity:0.5}";
for (
  var f = g(function (t) {
      (function () {
        var n, e, i, o, r, a;
        'undefined' != typeof performance && null !== performance && performance.now
          ? (t.exports = function () {
              return performance.now();
            })
          : 'undefined' != typeof process && null !== process && process.hrtime
          ? ((t.exports = function () {
              return (n() - r) / 1e6;
            }),
            (e = process.hrtime),
            (o = (n = function () {
              var t;
              return 1e9 * (t = e())[0] + t[1];
            })()),
            (a = 1e9 * process.uptime()),
            (r = o - a))
          : Date.now
          ? ((t.exports = function () {
              return Date.now() - i;
            }),
            (i = Date.now()))
          : ((t.exports = function () {
              return new Date().getTime() - i;
            }),
            (i = new Date().getTime()));
      }).call(p);
    }),
    v = 'undefined' == typeof window ? p : window,
    w = ['moz', 'webkit'],
    k = 'AnimationFrame',
    y = v['request' + k],
    z = v['cancel' + k] || v['cancelRequest' + k],
    C = 0;
  !y && C < w.length;
  C++
)
  (y = v[w[C] + 'Request' + k]), (z = v[w[C] + 'Cancel' + k] || v[w[C] + 'CancelRequest' + k]);
if (!y || !z) {
  var E = 0,
    _ = 0,
    M = [];
  (y = function (t) {
    if (0 === M.length) {
      var n = f(),
        e = Math.max(0, 16.666666666666668 - (n - E));
      (E = e + n),
        setTimeout(function () {
          var t = M.slice(0);
          M.length = 0;
          for (var n = 0; n < t.length; n++)
            if (!t[n].cancelled)
              try {
                t[n].callback(E);
              } catch (t) {
                setTimeout(function () {
                  throw t;
                }, 0);
              }
        }, Math.round(e));
    }
    return M.push({ handle: ++_, callback: t, cancelled: !1 }), _;
  }),
    (z = function (t) {
      for (var n = 0; n < M.length; n++) M[n].handle === t && (M[n].cancelled = !0);
    });
}
var j,
  D = function (t) {
    return y.call(v, t);
  };
(D.cancel = function () {
  z.apply(v, arguments);
}),
  (D.polyfill = function (t) {
    t || (t = v), (t.requestAnimationFrame = y), (t.cancelAnimationFrame = z);
  }),
  (function (t) {
    (t[(t.MODE_TIMEOUT = 0)] = 'MODE_TIMEOUT'), (t[(t.MODE_INTERVAL = 1)] = 'MODE_INTERVAL');
  })(j || (j = {}));
const B = new Map(),
  I = new Set();
let L = !1,
  q = 0;
function T() {
  return new Date().getTime();
}
function $(t) {
  const { fn: n, args: e } = t;
  n(...e);
}
function R() {
  if (0 === B.size) return void (L = !1);
  const t = T();
  B.forEach(
    (t => (n, e) => {
      const { nextTick: i, ms: o, mode: r } = n;
      t - i >= 0 && (I.add(n), r === j.MODE_TIMEOUT ? B.delete(e) : B.set(e, { ...n, nextTick: i + o }));
    })(t),
  ),
    0 !== I.size && (I.forEach($), I.clear()),
    0 !== B.size ? D(R) : (L = !1);
}
const N = class {
  constructor(n) {
    t(this, n),
      (this.displayUnits = void 0),
      (this.disabled = void 0),
      (this.value = void 0),
      (this.active = void 0),
      (this.valueWatcherId = void 0),
      (this.valueInTooltip = !1);
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
  updateValue(t) {
    (this.value = t), this.updatePosition();
  }
  updatePosition() {
    const t = Number(this.input.value || 0),
      n = Number(this.input.min || 0),
      e = ((t - n) / (Number(this.input.max || 100) - n)) * 100;
    if (this.sliderTooltip) {
      const t = Math.round(1e3 * (e / 100 - e / 8 / this.sliderTooltipContainer.offsetWidth)) / 10;
      this.sliderTooltip.style.left = `${t}%`;
    }
    this.progressElement.style.width = `${e}%`;
  }
  getDisplayValue() {
    return this.displayUnits ? `${this.value}${this.displayUnits}` : this.value;
  }
  componentWillLoad() {
    (this.input = this.root.querySelector('input[slot="input"]')),
      (this.disabled = this.input.disabled),
      (this.value = this.input.value),
      (this.disabledObserver = a(this.input, t => {
        this.disabled = t;
      })),
      (this.valueWatcherId = ((t, n = 0, ...e) =>
        (function ({ fn: t, ms: n, args: e, mode: i }) {
          if (!t) return null;
          const o = q;
          return B.set(o, { fn: t, ms: n, nextTick: T() + n, args: e, mode: i }), L || ((L = !0), D(R)), (q += 1), o;
        })({ fn: t, ms: n, args: e, mode: j.MODE_INTERVAL }))(() => {
        this.value !== this.input.value && this.updateValue(this.input.value);
      }, 100));
  }
  componentDidLoad() {
    this.updatePosition();
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect(),
      (function (t) {
        null != t && B.has(t) && B.delete(t);
      })(this.valueWatcherId);
  }
  render() {
    return n(
      'div',
      { class: { 'gux-container': !0, 'gux-disabled': this.disabled } },
      n(
        'div',
        { class: { 'gux-range': !0, 'gux-active': this.active } },
        n('div', { class: 'gux-track' }, n('div', { class: 'gux-progress', ref: t => (this.progressElement = t) })),
        n('slot', { name: 'input' }),
        n(
          'div',
          {
            class: { 'gux-range-tooltip-container': !0, 'gux-hidden': !this.valueInTooltip },
            ref: t => (this.sliderTooltipContainer = t),
          },
          n('div', { class: 'gux-range-tooltip', ref: t => (this.sliderTooltip = t) }, this.getDisplayValue()),
        ),
      ),
      n('div', { class: { 'gux-display': !0, 'gux-hidden': this.valueInTooltip } }, this.getDisplayValue()),
    );
  }
  get root() {
    return e(this);
  }
};
N.style =
  "gux-input-range .gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;height:32px;font-size:12px}gux-input-range .gux-container.gux-disabled{pointer-events:none;opacity:0.5}gux-input-range .gux-container .gux-range{position:relative;flex:1 1 auto;align-self:center;order:0}gux-input-range .gux-container .gux-range .gux-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad}gux-input-range .gux-container .gux-range .gux-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']{position:absolute;width:100%;height:2px;margin:6px 0;margin-top:calc(-1 * (12px / 2 + 2px));-webkit-appearance:none;background:transparent}gux-input-range .gux-container .gux-range input[type='range']:focus{outline:none}gux-input-range .gux-container .gux-range input[type='range']::-webkit-slider-runnable-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad;background:transparent}gux-input-range .gux-container .gux-range input[type='range']::-webkit-slider-runnable-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-webkit-slider-thumb{display:block;width:12px;height:12px;cursor:pointer;border-radius:100%;margin-top:-5px;-webkit-appearance:none;background:#2a60c8;border:0 solid #2a60c8}gux-input-range .gux-container .gux-range input[type='range']:focus::-webkit-slider-runnable-track{background:rgba(13, 13, 13, 0)}gux-input-range .gux-container .gux-range input[type='range']::-moz-range-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad;background:transparent}gux-input-range .gux-container .gux-range input[type='range']::-moz-range-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-moz-range-thumb{display:block;width:12px;height:12px;cursor:pointer;border-radius:100%;margin-top:-5px;background:#2a60c8;border:0 solid #2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-ms-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad;color:transparent;background:transparent;border-color:transparent;border-width:12px 0}gux-input-range .gux-container .gux-range input[type='range']::-ms-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-ms-fill-lower{background:rgba(0, 0, 0, 0)}gux-input-range .gux-container .gux-range input[type='range']::-ms-fill-upper{background:transparent}gux-input-range .gux-container .gux-range input[type='range']::-ms-thumb{display:block;width:12px;height:12px;cursor:pointer;border-radius:100%;background:#2a60c8;border:0 solid #2a60c8}gux-input-range .gux-container .gux-range input[type='range']:focus::-ms-fill-lower{background:transparent}gux-input-range .gux-container .gux-range input[type='range']:focus::-ms-fill-upper{background:rgba(13, 13, 13, 0)}gux-input-range .gux-container .gux-range.gux-active input[type='range']::-webkit-slider-thumb{transform:scale(1.5)}gux-input-range .gux-container .gux-range.gux-active input[type='range']::-moz-range-thumb{transform:scale(1.5)}gux-input-range .gux-container .gux-range.gux-active input[type='range']::-ms-thumb{transform:scale(1.5)}gux-input-range .gux-container .gux-display{flex:0 1 auto;align-self:auto;order:0;height:32px;margin:0 0 0 16px;line-height:32px;text-align:right}gux-input-range .gux-container .gux-display.gux-hidden{display:none}gux-input-range .gux-range-tooltip-container{position:absolute;top:-50px;width:100%;height:32px;visibility:hidden}gux-input-range .gux-range-tooltip-container .gux-range-tooltip{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px;position:absolute;z-index:1;display:flex;align-items:center;justify-content:center;width:50px;height:32px;margin-left:-20px;visibility:hidden;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-input-range .gux-range-tooltip-container .gux-range-tooltip::after,gux-input-range .gux-range-tooltip-container .gux-range-tooltip::before{position:absolute;top:100%;left:50%;width:0;height:0;pointer-events:none;content:' ';border:solid transparent}gux-input-range .gux-range-tooltip-container .gux-range-tooltip::after{margin-left:-4px;border-width:4px;border-top-color:#fdfdfd}gux-input-range .gux-range-tooltip-container .gux-range-tooltip::before{margin-left:-6px;border-width:6px;border-top-color:#b4bccb}gux-input-range input[type='range']:hover~.gux-range-tooltip-container:not(.gux-hidden),gux-input-range input[type='range']:focus~.gux-range-tooltip-container:not(.gux-hidden),gux-input-range input[type='range']:active~.gux-range-tooltip-container:not(.gux-hidden){visibility:visible}gux-input-range input[type='range']:hover~.gux-range-tooltip-container:not(.gux-hidden) .gux-range-tooltip,gux-input-range input[type='range']:focus~.gux-range-tooltip-container:not(.gux-hidden) .gux-range-tooltip,gux-input-range input[type='range']:active~.gux-range-tooltip-container:not(.gux-hidden) .gux-range-tooltip{visibility:visible}";
const W = class {
  constructor(n) {
    t(this, n), (this.disabled = void 0);
  }
  componentWillLoad() {
    (this.input = this.root.querySelector('select[slot="input"]')),
      (this.disabled = this.input.disabled),
      (this.disabledObserver = a(this.input, t => {
        this.disabled = t;
      }));
  }
  disconnectedCallback() {
    this.disabledObserver && this.disabledObserver.disconnect();
  }
  render() {
    return n(
      'div',
      { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled } },
      n('slot', { name: 'input' }),
      n('gux-icon', { decorative: !0, iconName: 'ic-dropdown-arrow' }),
    );
  }
  get root() {
    return e(this);
  }
};
W.style =
  'gux-input-select{position:relative;display:block}gux-input-select .gux-input-container{position:relative;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-select .gux-input-container.gux-disabled{pointer-events:none;opacity:0.5}gux-input-select .gux-input-container:hover gux-icon{color:#2a60c8}gux-input-select .gux-input-container select{flex:1 1 auto;align-self:auto;order:0;height:32px;padding:0 32px 0 12px;margin:0;color:#2e394c;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#f6f7f9;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-select .gux-input-container gux-icon{position:absolute;top:0;right:0;width:16px;height:16px;margin:8px;pointer-events:none}gux-input-select .gux-input-container:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}';
const O = class {
  constructor(n) {
    t(this, n), (this.resize = 'none');
  }
  componentWillLoad() {
    (this.input = this.root.querySelector('textarea[slot="input"]')),
      this.input.addEventListener('input', () => {
        this.updateHeight();
      });
  }
  componentDidLoad() {
    this.updateHeight();
  }
  updateHeight() {
    'auto' === this.resize &&
      ((this.containerElement.dataset.replicatedValue = this.input.value),
      (this.containerElement.style.maxHeight = this.input.style.maxHeight));
  }
  render() {
    return n(
      'div',
      { ref: t => (this.containerElement = t), class: `gux-resize-${this.resize}` },
      n('slot', { name: 'input' }),
    );
  }
  get root() {
    return e(this);
  }
};
O.style =
  "gux-input-textarea{position:relative;display:block}gux-input-textarea .gux-resize-none textarea{resize:none}gux-input-textarea .gux-resize-auto{display:grid;overflow:hidden;word-break:normal;word-break:break-word;overflow-wrap:anywhere}gux-input-textarea .gux-resize-auto::after{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;white-space:pre-wrap;visibility:hidden;content:attr(data-replicated-value) ' ';min-width:100%;max-width:100%;min-height:90px;padding:4px 12px;margin:0;border:1px solid #6b7585}gux-input-textarea .gux-resize-auto textarea{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;overflow-x:hidden;resize:none}gux-input-textarea textarea{flex:1 1 auto;align-self:auto;order:0;font-family:inherit;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;color:#2e394c;background-color:#f6f7f9;background-image:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);min-width:100%;max-width:100%;min-height:90px;padding:4px 12px;margin:0;border:1px solid #6b7585}gux-input-textarea textarea::placeholder{color:#596373;opacity:1}gux-input-textarea textarea:focus-within{border-color:#2a60c8;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}gux-input-textarea textarea[disabled]{opacity:0.5}";
export {
  c as gux_error_message_beta,
  l as gux_input_checkbox,
  d as gux_input_color,
  b as gux_input_number,
  m as gux_input_radio,
  N as gux_input_range,
  W as gux_input_select,
  O as gux_input_textarea,
};

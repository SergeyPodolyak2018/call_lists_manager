import { r as t, h as e, g as i } from './p-9031eb6a.js';
import { O as s } from './p-23975bfb.js';
import { s as o } from './p-d176c2ae.js';
import { b as n } from './p-091f51f6.js';
import { g as r, b as u } from './p-54ad2682.js';
import { t as a } from './p-6a46bf1b.js';
import './p-8a133b9b.js';
const c = {
  am: 'AM',
  'time-separator': ':',
  clockButton: 'Toggle suggested times',
  hoursInput: 'Input hours',
  minutesInput: 'Input minutes',
  pm: 'PM',
  timeOptionsState: 'Time options open: {state}',
  toggleAmPM: '{amOrPm} selected, click to toggle',
};
function p(t, e) {
  const [i, s] = t.split(':');
  return `${((parseInt(i, 10) + e + 24) % 24).toString().padStart(2, '0')}:${s}`;
}
function l(t, e, i) {
  const [s, o] = t.split(':');
  let n = (parseInt(o, 10) + e + 60) % 60;
  for (; n % i != 0; ) n = (n + e + 60) % 60;
  return `${s}:${n.toString().padStart(2, '0')}`;
}
function h(t, e) {
  const [i, s] = t.split(':');
  return '12h' === e ? `${(parseInt(i, 10) % 12 || 12).toString()}:${s}` : `${i}:${s}`;
}
function g(t, e, i) {
  const [s, o] = t.split(':');
  return '12h' === e
    ? i
      ? `${(parseInt(s, 10) % 12).toString().padStart(2, '0')}:${o}`
      : `${((parseInt(s, 10) % 12) + 12).toString().padStart(2, '0')}:${o}`
    : `${s}:${o}`;
}
function m(t, e) {
  const [i] = h(t, e).split(':');
  return i;
}
function x(t) {
  const [, e] = t.split(':');
  return e;
}
function d(t) {
  const [e] = t.split(':');
  return parseInt(e, 10) < 12;
}
function b(t) {
  return '12h' === t ? '^(0?[1-9]|1[012])$' : '^([01]?[0-9]|2[0-3])$';
}
const f = class {
  constructor(e) {
    t(this, e),
      (this.value = '00:00'),
      (this.interval = 60),
      (this.step = 1),
      (this.disabled = !1),
      (this.required = !1),
      (this.hasError = !1),
      (this.clockType = void 0),
      (this.expanded = !1);
  }
  onFocus() {
    this.valueLastChange = this.value;
  }
  onBlur() {
    this.valueLastChange !== this.value && o(this.root, 'change');
  }
  onClickOutside() {
    this.expanded = !1;
  }
  handleKeydown(t) {
    switch (t.key) {
      case 'Escape':
      case 'Tab':
        this.expanded = !1;
    }
  }
  async componentWillLoad() {
    a(this.root),
      (this.i18n = await u(this.root, c)),
      (this.clockType =
        this.clockType ||
        (function (t) {
          const e = r(t),
            i = new Date('January 19, 1975 15:00:00 UTC+00:00'),
            s = new Intl.DateTimeFormat(e, { timeStyle: 'short', timeZone: 'UTC' }).format(i);
          return e.startsWith('ar') || new RegExp('.*15.*').test(s) ? '24h' : '12h';
        })(this.root));
  }
  updateValue(t, e = !1) {
    t !== this.value &&
      ((this.value = t),
      o(this.root, 'input'),
      e && this.valueLastChange !== this.value && (o(this.root, 'change'), (this.valueLastChange = this.value)));
  }
  valueToId(t) {
    return `gux-id-${t.replace(':', '-')}`;
  }
  focusRelevantItemInPopupList() {
    n(() => {
      this.listElement.guxFocusItemByClosestId(this.valueToId(this.value));
    });
  }
  toggleDropdown() {
    (this.expanded = !this.expanded), this.expanded && this.focusRelevantItemInPopupList();
  }
  handleClickDropdownValue(t) {
    const e = g(t, this.clockType, d(this.value));
    this.updateValue(e, !0), this.clockButton.focus(), (this.expanded = !1);
  }
  onHourKeyDown(t) {
    switch (t.key) {
      case 'Tab':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Escape':
        break;
      case 'ArrowDown':
        t.preventDefault(), this.updateValue(p(this.value, -1));
        break;
      case 'ArrowUp':
        t.preventDefault(), this.updateValue(p(this.value, 1));
        break;
      case 'Backspace':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        t.preventDefault(),
          this.hourInputElement.setSelectionRange(2, 2),
          this.updateValue(
            (function (t, e, i, s, o) {
              const [n, r] = h(t, e).split(':');
              let u = n;
              return (
                (u =
                  'Backspace' === i
                    ? '12h' == e && 1 == o
                      ? u
                          .split('')
                          .filter((t, e) => e == s - 1)
                          .join('')
                      : u
                          .split('')
                          .filter((t, e) => e !== s - 1)
                          .join('')
                          .padStart(2, '0')
                    : parseInt(u.slice(0, s) + i + u.slice(s + 1), 10)
                        .toString()
                        .slice(-2)
                        .padStart(2, '0')),
                new RegExp(b(e)).test(u) || (u = '12h' === e ? i : i.padStart(2, '0')),
                g(`${u}:${r}`, e, d(t))
              );
            })(
              this.value,
              this.clockType,
              t.key,
              this.hourInputElement.selectionStart,
              this.hourInputElement.value.length,
            ),
          );
        break;
      default:
        t.preventDefault();
    }
  }
  onMinuteKeyDown(t) {
    switch (t.key) {
      case 'Tab':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Escape':
        break;
      case 'ArrowDown':
        t.preventDefault(), this.updateValue(l(this.value, -1, this.step));
        break;
      case 'ArrowUp':
        t.preventDefault(), this.updateValue(l(this.value, 1, this.step));
        break;
      case 'Backspace':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        t.preventDefault(),
          this.minuteInputElement.setSelectionRange(2, 2),
          this.updateValue(
            (function (t, e, i) {
              const [s, o] = t.split(':');
              let n = o;
              return (
                (n =
                  'Backspace' === e
                    ? n
                        .split('')
                        .filter((t, e) => e !== i - 1)
                        .join('')
                        .padStart(2, '0')
                    : (n.slice(0, i) + e + n.slice(i + 1)).slice(-2).padStart(2, '0')),
                new RegExp('^[0-5][0-9]$').test(n) || (n = e.padStart(2, '0')),
                `${s}:${n}`
              );
            })(this.value, t.key, this.minuteInputElement.selectionStart),
          );
        break;
      default:
        t.preventDefault();
    }
  }
  onAmPmButtonKeyDown(t) {
    switch (t.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.toggleAmPm(t);
    }
  }
  onListKeyDown(t) {
    'Escape' === t.key && ((this.expanded = !1), this.clockButton.focus());
  }
  toggleAmPm(t) {
    t.preventDefault(), this.updateValue(p(this.value, 12), !0);
  }
  getAmPmString() {
    return d(this.value) ? this.i18n('am') : this.i18n('pm');
  }
  renderNumberInput() {
    return e(
      'div',
      { class: 'gux-input-time-container' },
      e('input', {
        class: 'gux-input-time-hours',
        type: 'text',
        disabled: this.disabled,
        value: m(this.value, this.clockType),
        onKeyDown: t => this.onHourKeyDown(t),
        'aria-label': this.i18n('hoursInput'),
        pattern: b(this.clockType),
        ref: t => (this.hourInputElement = t),
      }),
      e('span', { class: 'gux-time-separator' }, this.i18n('time-separator')),
      e('input', {
        class: 'gux-input-time-minutes',
        type: 'text',
        disabled: this.disabled,
        value: x(this.value),
        onKeyDown: t => this.onMinuteKeyDown(t),
        'aria-label': this.i18n('minutesInput'),
        pattern: '^[0-5][0-9]$',
        ref: t => (this.minuteInputElement = t),
      }),
    );
  }
  renderAmPmSelector() {
    if ('12h' === this.clockType)
      return e(
        'button',
        {
          class: 'gux-input-time-am-pm-selector',
          type: 'button',
          disabled: this.disabled,
          'aria-label': this.i18n('toggleAmPM', { amOrPm: this.getAmPmString() }),
          onClick: t => this.toggleAmPm(t),
          onKeyDown: t => this.onAmPmButtonKeyDown(t),
        },
        e('div', { class: { 'gux-meridiem': !0, 'gux-visible': d(this.value) } }, this.i18n('am')),
        e('div', { class: { 'gux-meridiem': !0, 'gux-visible': !d(this.value) } }, this.i18n('pm')),
      );
  }
  renderClockButton() {
    return e(
      'button',
      {
        class: { 'gux-clock-button': !0, 'gux-active': this.expanded },
        type: 'button',
        disabled: this.disabled,
        'aria-label': this.i18n('clockButton'),
        'aria-expanded': this.expanded.toString(),
        onClick: this.toggleDropdown.bind(this),
        ref: t => (this.clockButton = t),
      },
      e('gux-icon', { decorative: !0, 'icon-name': 'clock-outline' }),
    );
  }
  renderTimeListItems() {
    return (function (t, e) {
      const i = [0, 15, 30, 45].filter(e => Number.isInteger(e / t)).map(t => String(t).padStart(2, '0'));
      return (
        '12h' === e
          ? ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
          : Array.from(Array(24).keys()).map(t => String(t).padStart(2, '0'))
      ).reduce((t, e) => t.concat(i.map(t => `${e}:${t}`)), []);
    })(this.interval, this.clockType).map(t => {
      const i = g(t, this.clockType, d(this.value));
      return e('gux-list-item', { id: this.valueToId(i), onClick: () => this.handleClickDropdownValue(t) }, t);
    });
  }
  renderTarget() {
    return e(
      'div',
      { class: 'gux-input-time', slot: 'target' },
      this.renderNumberInput(),
      this.renderAmPmSelector(),
      this.renderClockButton(),
    );
  }
  renderPopup() {
    return e(
      'div',
      { slot: 'popup', class: 'gux-list-container', onKeyDown: t => this.onListKeyDown(t) },
      e('gux-list', { ref: t => (this.listElement = t) }, this.renderTimeListItems()),
    );
  }
  render() {
    return e(
      'gux-popup-beta',
      {
        class: { 'gux-time-picker': !0, 'gux-error': this.hasError },
        expanded: this.expanded,
        disabled: this.disabled,
      },
      this.renderTarget(),
      this.renderPopup(),
    );
  }
  get root() {
    return i(this);
  }
};
(function (t, e, i, s) {
  var o,
    n = arguments.length,
    r = n < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s);
  else for (var u = t.length - 1; u >= 0; u--) (o = t[u]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
  n > 3 && r && Object.defineProperty(e, i, r);
})([s({ triggerEvents: 'mousedown' })], f.prototype, 'onClickOutside', null),
  (f.style =
    '.gux-time-picker{position:relative;display:inline-block}.gux-time-picker.gux-error .gux-input-time{border-color:#ea0b0b}.gux-time-picker .gux-input-time{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;gap:8px;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 8px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-time-picker .gux-input-time:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-time-picker .gux-input-time input{flex:1 1 auto;align-self:auto;order:0;width:20px;padding:0;font-size:12px;color:#2e394c;text-align:center;text-align:left;background-color:#f6f7f9;border:none;outline:none}.gux-time-picker .gux-input-time input.gux-input-time-hours{text-align:right}.gux-time-picker .gux-input-time input::placeholder{color:#596373;opacity:1}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector{display:grid;grid-template:auto 1fr / auto 1fr auto;place-items:flex-end;padding:0;font-size:12px;font-weight:bold;color:#2e394c;background:transparent;border:none;outline:none}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector:not(:disabled):hover{color:#2a60c8;cursor:pointer}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector:focus-visible{color:#2a60c8;outline:2px solid #aac9ff;outline-offset:0;border-radius:2px}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector .gux-meridiem{grid-row:1;grid-column:1;visibility:hidden}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector .gux-meridiem.gux-visible{visibility:visible}.gux-time-picker .gux-input-time .gux-clock-button{display:flex;flex:0 1 auto;align-items:center;align-self:auto;justify-content:center;order:0;padding:0;color:#596373;background:transparent;border:none}.gux-time-picker .gux-input-time .gux-clock-button.gux-active:not(:disabled){color:#2a60c8;cursor:pointer}.gux-time-picker .gux-input-time .gux-clock-button.gux-active:not(:disabled):hover{color:#2a60c8 !important;cursor:pointer}.gux-time-picker .gux-input-time .gux-clock-button:not(:disabled):hover{color:#2e394c;cursor:pointer}.gux-time-picker .gux-input-time .gux-clock-button:focus{border:none;outline:none}.gux-time-picker .gux-input-time .gux-clock-button:focus-visible gux-icon{outline:2px solid #aac9ff;outline-offset:0;border-radius:2px}.gux-time-picker .gux-input-time .gux-clock-button gux-icon{width:16px;height:16px}.gux-time-picker .gux-list-container{max-height:150px;padding:8px 0;margin:0;overflow-y:scroll;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}');
export { f as gux_time_picker_beta };

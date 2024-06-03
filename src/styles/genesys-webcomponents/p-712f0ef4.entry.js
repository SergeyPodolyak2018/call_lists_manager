import { r as t, c as e, h as i, g as s } from './p-9031eb6a.js';
import { a, c as n, o as r, f as d } from './p-42e2cc1f.js';
import { r as c } from './p-cbcbd1bb.js';
import { a as u } from './p-091f51f6.js';
import { f as o, a as h, b as l, c as p } from './p-4f26144b.js';
import { O as x } from './p-23975bfb.js';
import { t as g } from './p-6a46bf1b.js';
import { b as f } from './p-54ad2682.js';
import './p-8a133b9b.js';
const k = { start: 'Start', end: 'End', date: 'Date', toggleCalendar: 'Toggle calendar view' };
function b(t, e) {
  let i = new Date(e.getTime());
  return (
    i.setDate(i.getDate() + t),
    t < 0
      ? i.getDate() > e.getDate() && (i = new Date(e.getFullYear(), e.getMonth() + 1, 0, 0, 0, 0))
      : i.getDate() < e.getDate() && i.setMonth(i.getMonth() - 1),
    i
  );
}
function m(t, e) {
  const i = new Date(e.valueOf()),
    s = (function (t) {
      let e = t;
      for (; e < 0; ) e += 12;
      return (e %= 12), e;
    })(i.getMonth() + t);
  return i.setMonth(s), i.setFullYear(e.getFullYear()), i.getMonth() !== s ? m(t, b(-1, e)) : i;
}
function y(t, e) {
  const i = t[e];
  return i && '/' !== i ? i : t[e - 1];
}
function w(t) {
  return t.match(/\W/)[0];
}
function v(t) {
  const e = w(t);
  return t.split(e).reduce((t, e) => t.concat(e[0]), []);
}
function D(t, e) {
  return { selectionStart: t.indexOf(e), selectionEnd: t.lastIndexOf(e) + 1 };
}
const F = class {
  constructor(i) {
    t(this, i),
      (this.input = e(this, 'input', 7)),
      (this.yearFormat = 'yyyy'),
      (this.isSelectingRangeWithMouse = !1),
      (this.lastYear = new Date().getFullYear()),
      (this.startInputId = c('gux-datepicker')),
      (this.endInputId = c('gux-datepicker')),
      (this.value = void 0),
      (this.label = ''),
      (this.numberOfMonths = 1),
      (this.startDayOfWeek = void 0),
      (this.minDate = ''),
      (this.maxDate = ''),
      (this.mode = 'single'),
      (this.format = 'mm/dd/yyyy'),
      (this.disabled = !1),
      (this.labelPosition = 'beside'),
      (this.formattedValue = ''),
      (this.minDateDate = void 0),
      (this.maxDateDate = void 0),
      (this.toFormattedValue = ''),
      (this.active = !1);
  }
  watchValue() {
    this.updateDate();
  }
  watchMinDate(t) {
    this.minDateDate = t ? o(t) : null;
  }
  watchMaxDate(t) {
    this.maxDateDate = t ? o(t) : null;
  }
  watchFormat(t) {
    t.includes('yyyy') || (this.yearFormat = 'yy'),
      (this.intervalOrder = v(t)),
      (this.lastIntervalRange = this.initialIntervalRange);
  }
  watchActiveCalendar(t) {
    if (!0 === t) {
      const t = o(this.value.split('/')[0]);
      this.calendarElement.resetCalendarView(t);
    }
  }
  onKeyDown(t) {
    if (this.isInputFieldEvent(t))
      switch (((this.focusedField = this.getInputFieldFromEvent(t)), t.key)) {
        case 'Enter':
        case 'Escape':
          this.focusedField.blur(), (this.active = !1);
          break;
        case 'Tab':
          break;
        case 'ArrowDown':
          t.preventDefault(), this.increment(-1), this.setCursorRange();
          break;
        case 'ArrowUp':
          t.preventDefault(), this.increment(1), this.setCursorRange();
          break;
        case 'ArrowLeft': {
          t.preventDefault();
          const e = (function (t, e) {
            const i = v(t),
              s = y(t, e.selectionStart),
              a = i.indexOf(s);
            return D(t, i[(a + i.length - 1) % i.length]);
          })(this.format, this.intervalRange);
          this.setIntervalRange(e), this.setCursorRange();
          break;
        }
        case 'ArrowRight': {
          t.preventDefault();
          const e = (function (t, e) {
            const i = v(t),
              s = y(t, e.selectionStart),
              a = i.indexOf(s);
            return D(t, i[(a + 1) % i.length]);
          })(this.format, this.intervalRange);
          this.setIntervalRange(e), this.setCursorRange();
          break;
        }
        default:
          t.preventDefault(),
            this.isSelectingRangeWithMouse ||
              (this.setIntervalRange({
                selectionStart: this.focusedField.selectionStart,
                selectionEnd: this.focusedField.selectionEnd,
              }),
              this.updateIntervalValue(t),
              this.setCursorRange());
      }
    else
      switch (t.key) {
        case 'Enter':
        case 'Escape':
        case ' ': {
          this.active = !1;
          const t = this.root.shadowRoot.querySelector('.gux-calendar-toggle-button');
          u(() => {
            t.focus();
          });
          break;
        }
        case 'Tab':
          this.active && (this.active = !1);
      }
  }
  onMouseDown(t) {
    this.isInputFieldEvent(t) && (this.isSelectingRangeWithMouse = !0);
    const e = t.composedPath(),
      i = e.includes(this.datepickerElement);
    Array.from(this.root.shadowRoot.querySelectorAll('.gux-calendar-toggle-button')).every(t => !e.includes(t)) &&
      (this.active = i);
  }
  onClickOutside() {
    this.active = !1;
  }
  onInputFocusIn(t) {
    (this.focusedField = this.getInputFieldFromEvent(t)), this.isSelectingRangeWithMouse || u(() => this.setRange());
  }
  onInputFocusOut() {
    this.lastIntervalRange = this.initialIntervalRange;
  }
  onInputMouseUp(t) {
    t.preventDefault(),
      (this.lastIntervalRange = D(this.format, y(this.format, this.focusedField.selectionStart))),
      this.setRange(),
      (this.isSelectingRangeWithMouse = !1);
  }
  isInputFieldEvent(t) {
    const e = t.composedPath();
    return e.includes(this.inputElement) || e.includes(this.toInputElement);
  }
  get initialIntervalRange() {
    return D(this.format, y(this.format, 0));
  }
  getInputFieldFromEvent(t) {
    return t.composedPath()[0];
  }
  updateIntervalValue(t) {
    const e = parseInt(t.key, 10);
    if (!isNaN(e)) {
      const i = this.focusedField.value.slice(this.focusedField.selectionStart, this.focusedField.selectionEnd);
      'y' === y(this.format, this.focusedField.selectionStart) && 'yyyy' === this.yearFormat
        ? this.typeYearValue(i, t.key)
        : this.canSetDate(e)
        ? (this.updateSelection(this.focusedField, `${i[1]}${t.key}`), this.setValue())
        : (this.updateSelection(this.focusedField, `0${t.key}`.replace('00', '01')), this.setValue());
    }
  }
  updateSelection(t, e) {
    t.value =
      t.value.substr(0, this.intervalRange.selectionStart) + e + t.value.substr(this.intervalRange.selectionEnd);
  }
  getCalendarLabels() {
    return (function (t, e, i) {
      const s = t.split(',').map(t => t.trim());
      return 'range' === e ? [s[0] || i[0], s[1] || i[1]] : 'range' === e || s[0] ? [s[0]] : [i[2]];
    })(this.label, this.mode, [this.i18n('start'), this.i18n('end'), this.i18n('date')]);
  }
  stringToDate(t) {
    const e = w(this.format),
      i = this.format.toLowerCase().split(e),
      s = t.split(e),
      a = parseInt(s[i.indexOf(this.yearFormat)], 10),
      n = parseInt(s[i.indexOf('mm')], 10) - 1,
      r = parseInt(s[i.indexOf('dd')], 10),
      d = new Date(a, n, r);
    return (
      'yy' === this.yearFormat &&
        d.getFullYear() < 1970 &&
        this.lastYear > 1970 &&
        d.setFullYear(d.getFullYear() + 100),
      d
    );
  }
  onCalendarSelect(t) {
    (this.value = t.target.value),
      t.stopPropagation(),
      this.input.emit(this.value),
      this.updateDate(),
      (this.inputElement.value = this.formattedValue),
      'range' === this.mode && (this.toInputElement.value = this.toFormattedValue),
      (document.activeElement === this.inputElement && document.activeElement === this.toInputElement) ||
        (this.active = !1);
  }
  setValue() {
    if ('range' === this.mode) {
      const t = this.stringToDate(this.inputElement.value),
        e = this.stringToDate(this.toInputElement.value);
      (this.value = h(t, e)), this.updateDate(), this.calendarElement.setValue([t, e]);
    } else {
      const t = this.stringToDate(this.inputElement.value);
      (this.value = l(t)), this.updateDate(), this.calendarElement.setValue(t);
    }
    this.input.emit(this.value);
  }
  setRange() {
    this.setIntervalRange(this.lastIntervalRange), this.setCursorRange();
  }
  typeYearValue(t, e) {
    ' ' !== t[0]
      ? this.updateSelection(this.focusedField, `   ${e}`)
      : (this.updateSelection(this.focusedField, `${t.substr(1)}${e}`),
        (t.substr(1) + e).includes(' ') || this.setValue());
  }
  canSetDate(t) {
    const e = parseInt([this.focusedField.value[this.intervalRange.selectionEnd - 1].toString(), t].join(''), 10);
    if (e)
      switch (y(this.format, this.focusedField.selectionStart)) {
        case 'd': {
          const t = o(this.value);
          if (e <= new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()) return !0;
          break;
        }
        case 'm':
          if (e <= 12) return !0;
          break;
        case 'y':
          return !0;
      }
    return !1;
  }
  getMapAndRegexFromField(t) {
    const e = { dd: `0${t.getDate()}`.slice(-2), mm: `0${t.getMonth() + 1}`.slice(-2) };
    return (
      'yyyy' === this.yearFormat
        ? (e.yyyy = t.getFullYear().toString())
        : (e.yy = t.getFullYear().toString().slice(-2)),
      { map: e, regexp: new RegExp(Object.keys(e).join('|'), 'gi') }
    );
  }
  updateDate() {
    if ('range' === this.mode) {
      const [t, e] = p(this.value),
        { map: i, regexp: s } = this.getMapAndRegexFromField(t);
      this.formattedValue = this.format.replace(s, t => i[t]);
      const { map: a, regexp: n } = this.getMapAndRegexFromField(e);
      this.toFormattedValue = this.format.replace(n, t => a[t]);
    } else {
      const t = o(this.value),
        { map: e, regexp: i } = this.getMapAndRegexFromField(t);
      this.formattedValue = this.format.replace(i, t => e[t]);
    }
  }
  setCursorRange() {
    this.intervalRange &&
      (this.focusedField.setSelectionRange(0, 100),
      this.focusedField.setSelectionRange(this.intervalRange.selectionStart, this.intervalRange.selectionEnd));
  }
  toggleCalendar() {
    (this.active = !this.active),
      this.active &&
        u(() => {
          this.calendarElement.focusPreviewDate();
        });
  }
  setIntervalRange(t) {
    this.intervalRange = t;
  }
  getCombinedFocusedDateValue() {
    return 'range' === this.mode ? this.getRangeFocusedDateValue() : this.getFocusedDateValue();
  }
  getFocusedDateValue() {
    return o(this.value);
  }
  getRangeFocusedDateValue() {
    const [t, e] = p(this.value);
    return this.focusedField === this.inputElement ? t : e;
  }
  increment(t) {
    const e = y(this.format, this.focusedField.selectionStart),
      i = this.getCombinedFocusedDateValue();
    let s;
    switch (e) {
      case 'd':
        s = b(t, i);
        break;
      case 'm':
        s = m(t, i);
        break;
      case 'y':
        s = (function (t, e) {
          const i = new Date(e.valueOf());
          return i.setFullYear(e.getFullYear() + t), i;
        })(t, i);
    }
    var a, n, r;
    (a = s),
      (n = this.minDateDate),
      (((r = this.maxDateDate) && r < a) || (n && n > a)) && (s = i),
      (this.lastYear = s.getFullYear()),
      this.setIntervalRange({
        selectionStart: this.focusedField.selectionStart,
        selectionEnd: this.focusedField.selectionEnd,
      }),
      (this.focusedField.value = (function (t, e) {
        const i = w(e),
          s = e
            .split(i)
            .map(e => {
              switch (e[0]) {
                case 'd':
                  return (function (t) {
                    return `0${t.getDate().toString()}`.slice(-2);
                  })(t);
                case 'm':
                  return (function (t) {
                    return `0${(t.getMonth() + 1).toString()}`.slice(-2);
                  })(t);
                case 'y':
                  return (function (t, e) {
                    return 'yyyy' === e ? t.getFullYear().toString() : t.getFullYear().toString().slice(-2);
                  })(t, e);
              }
            })
            .join(i);
        return s;
      })(s, this.format)),
      this.setValue();
  }
  async componentWillLoad() {
    if (
      (g(this.root, { variant: this.mode }),
      (this.i18n = await f(this.root, k)),
      this.watchMinDate(this.minDate),
      this.watchMaxDate(this.maxDate),
      this.watchFormat(this.format),
      !this.value)
    ) {
      const t = new Date();
      t.setHours(0, 0, 0, 0),
        (this.value = 'range' === this.mode ? h(t, t) : l(t)),
        'range' === this.mode && this.numberOfMonths < 2 && (this.numberOfMonths = 2);
    }
    this.updateDate();
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = a(this.datepickerElement, this.calendarElement, () => this.updatePosition(), {
      ancestorScroll: !0,
      elementResize: !0,
      animationFrame: !0,
      ancestorResize: !0,
    });
  }
  updatePosition() {
    n(this.datepickerElement, this.calendarElement, {
      strategy: 'fixed',
      placement: 'bottom-start',
      middleware: [r({ crossAxis: -3 }), d({ fallbackStrategy: 'initialPlacement' })],
    }).then(({ x: t, y: e }) => {
      Object.assign(this.calendarElement.style, { left: `${t}px`, top: `${e}px` });
    });
  }
  componentDidUpdate() {
    this.active ? this.runUpdatePosition() : this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  disconnectedCallback() {
    this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  renderCalendarToggleButton() {
    return i(
      'button',
      {
        class: 'gux-calendar-toggle-button',
        type: 'button',
        onClick: () => this.toggleCalendar(),
        'aria-expanded': this.active.toString(),
        'aria-label': this.i18n('toggleCalendar'),
        disabled: this.disabled,
      },
      i('gux-icon', { decorative: !0, 'icon-name': 'calendar' }),
    );
  }
  renderCalendar() {
    return i('gux-calendar', {
      tabIndex: -1,
      ref: t => (this.calendarElement = t),
      value: this.value,
      mode: this.mode,
      onInput: t => this.onCalendarSelect(t),
      minDate: this.minDate,
      maxDate: this.maxDate,
      numberOfMonths: this.numberOfMonths,
      startDayOfWeek: this.startDayOfWeek,
    });
  }
  renderStartDateField() {
    return i(
      'div',
      { class: { 'gux-datepicker-field': !0, 'gux-above': 'above' === this.labelPosition } },
      i(
        'label',
        {
          htmlFor: this.startInputId,
          class: { 'gux-datepicker-field-label': !0, 'gux-sr-only': 'single' === this.mode && !this.label },
        },
        this.getCalendarLabels()[0],
      ),
      i(
        'div',
        { class: 'gux-datepicker-field-input' },
        i(
          'div',
          { class: 'gux-datepicker-field-text-input' },
          i('input', {
            id: this.startInputId,
            type: 'text',
            onClick: t => this.onInputMouseUp(t),
            onFocusin: t => this.onInputFocusIn(t),
            onFocusout: () => this.onInputFocusOut(),
            ref: t => (this.inputElement = t),
            value: this.formattedValue,
            disabled: this.disabled,
          }),
          this.renderCalendarToggleButton(),
        ),
        this.renderCalendar(),
      ),
    );
  }
  renderEndDateField() {
    return 'single' === this.mode
      ? null
      : i(
          'div',
          { class: { 'gux-datepicker-field': !0, 'gux-above': 'above' === this.labelPosition } },
          i('label', { htmlFor: this.endInputId, class: 'gux-datepicker-field-label' }, this.getCalendarLabels()[1]),
          i(
            'div',
            { class: 'gux-datepicker-field-input' },
            i(
              'div',
              { class: 'gux-datepicker-field-text-input' },
              i('input', {
                id: this.endInputId,
                type: 'text',
                ref: t => (this.toInputElement = t),
                onMouseUp: t => this.onInputMouseUp(t),
                onFocusin: t => this.onInputFocusIn(t),
                onFocusout: () => this.onInputFocusOut(),
                value: this.toFormattedValue,
                disabled: this.disabled,
              }),
              this.renderCalendarToggleButton(),
            ),
          ),
        );
  }
  render() {
    return i(
      'div',
      {
        class: { 'gux-datepicker': !0, 'gux-active': this.active, 'gux-disabled': this.disabled },
        ref: t => (this.datepickerElement = t),
      },
      this.renderStartDateField(),
      this.renderEndDateField(),
    );
  }
  get root() {
    return s(this);
  }
  static get watchers() {
    return {
      value: ['watchValue'],
      minDate: ['watchMinDate'],
      maxDate: ['watchMaxDate'],
      format: ['watchFormat'],
      active: ['watchActiveCalendar'],
    };
  }
};
(function (t, e, i, s) {
  var a,
    n = arguments.length,
    r = n < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s);
  else for (var d = t.length - 1; d >= 0; d--) (a = t[d]) && (r = (n < 3 ? a(r) : n > 3 ? a(e, i, r) : a(e, i)) || r);
  n > 3 && r && Object.defineProperty(e, i, r);
})([x({ triggerEvents: 'mousedown' })], F.prototype, 'onClickOutside', null),
  (F.style =
    ':host{display:block}.gux-datepicker{display:inline-block}.gux-datepicker.gux-disabled{pointer-events:none;cursor:default}.gux-datepicker.gux-disabled .gux-datepicker-field .gux-datepicker-field-input{opacity:0.5}.gux-datepicker .gux-datepicker-field{display:inline-flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start}.gux-datepicker .gux-datepicker-field~.gux-datepicker-field{margin-left:20px}.gux-datepicker .gux-datepicker-field.gux-above{flex-direction:column;align-items:self-start}.gux-datepicker .gux-datepicker-field.gux-above .gux-datepicker-field-input{margin-top:0}.gux-datepicker .gux-datepicker-field.gux-above .gux-datepicker-field-label{margin-right:0}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-label{flex:0 1 auto;align-self:auto;order:0;margin-right:8px;font-size:12px;font-weight:bold;line-height:20px}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input{position:relative;flex:0 1 auto;align-self:auto;order:0;margin:4px 0}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 8px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input input{flex:1 1 auto;align-self:auto;order:0;width:100px;overflow:hidden;color:#2e394c;background-color:#f6f7f9;border:none;outline:none}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input input::placeholder{color:#596373;opacity:1}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input input::-webkit-search-cancel-button,.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input input::-webkit-search-results-button,.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input input::-webkit-calendar-picker-indicator{display:none;-webkit-appearance:none}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button{display:flex;flex:0 1 auto;align-items:center;align-self:auto;justify-content:center;order:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px;outline:none}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button:not(:disabled):focus-visible,.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button:not(:disabled):hover{color:#2e394c;cursor:pointer}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button gux-icon{width:16px;height:16px}.gux-datepicker .gux-datepicker-field .gux-datepicker-field-input gux-calendar{position:fixed;z-index:var(--gux-zindex-popup, 1);display:none;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-datepicker.gux-active .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button{color:#2a60c8}.gux-datepicker.gux-active .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button:not(:disabled):focus-visible,.gux-datepicker.gux-active .gux-datepicker-field .gux-datepicker-field-input .gux-datepicker-field-text-input button:not(:disabled):hover{color:#2a60c8}.gux-datepicker.gux-active .gux-datepicker-field .gux-datepicker-field-input gux-calendar{display:block}.gux-sr-only{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}');
export { F as gux_datepicker };

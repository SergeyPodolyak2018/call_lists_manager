import { r as t, c as e, h as n, g as a } from './p-9031eb6a.js';
import { a as s } from './p-091f51f6.js';
import { a as i, c as r, b as o, f as d } from './p-4f26144b.js';
import { t as h } from './p-6a46bf1b.js';
import { g as l, a as c } from './p-54ad2682.js';
import { c as u } from './p-251befef.js';
import './p-8a133b9b.js';
function g(t, e) {
  x(t, 'remove', e);
}
function x(t = [], e, n) {
  const a = [].concat(t);
  for (const t of a) t.classList[e](n);
}
function b(t, e) {
  return u(t.toLocaleDateString(e, { year: 'numeric', month: 'long' }));
}
const f = class {
  constructor(n) {
    t(this, n),
      (this.input = e(this, 'input', 7)),
      (this.locale = 'en'),
      (this.value = ''),
      (this.minDate = ''),
      (this.maxDate = ''),
      (this.mode = 'single'),
      (this.numberOfMonths = 1),
      (this.startDayOfWeek = void 0),
      (this.previewValue = new Date()),
      (this.selectingDate = null);
  }
  emitInput() {
    this.input.emit(this.value);
  }
  async setValue(t) {
    if ('range' === this.mode && t instanceof Array) {
      const [e, n] = t;
      (this.value = i(e, n)), (this.previewValue = r(this.value)[0]);
    } else {
      const e = t;
      (this.value = o(e)), (this.previewValue = e);
    }
  }
  async focusPreviewDate() {
    const t = this.root.shadowRoot.querySelector(`td[data-date="${this.previewValue.getTime()}"]`);
    t && t.focus();
  }
  async resetCalendarView(t) {
    this.previewValue = t;
  }
  incrementPreviewDateByMonth(t) {
    (this.previewValue = new Date(this.previewValue.getFullYear(), this.previewValue.getMonth() + t, 15, 0, 0, 0)),
      s(() => {
        this.focusPreviewDate();
      });
  }
  async setValueAndEmit(t) {
    await this.setValue(t), this.emitInput();
  }
  outOfBounds(t) {
    return ('' !== this.maxDate && d(this.maxDate) < t) || ('' !== this.minDate && d(this.minDate) > t);
  }
  generateDatesFrom(t, e, n) {
    const a = [],
      s = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
    for (let e = 0; e < n; e++) {
      const e = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0, 0),
        n = [];
      let i = !1,
        o = !1;
      e.getMonth() !== t &&
        (n.push('gux-not-in-month'), (i = !0), 'range' === this.mode && (n.push('gux-hidden'), (o = !0))),
        this.outOfBounds(e) && (n.push('gux-disabled'), (i = !0));
      let h = !1;
      if ('range' === this.mode) {
        const [t, a] = r(this.value),
          s = t.getTime(),
          i = a.getTime();
        e.getTime() === s
          ? ((h = !0), n.push('gux-selected'), n.push('gux-start-date'))
          : e.getTime() === i && ((h = !0), n.push('gux-selected'), n.push('gux-end-date'));
      } else {
        const t = d(this.value).getTime();
        e.getTime() === t && ((h = !0), n.push('gux-selected'));
      }
      a.push({ class: n.join(' '), date: e, hidden: o, disabled: i, selected: h }), s.setDate(s.getDate() + 1);
    }
    return a;
  }
  create2DArray(t, e) {
    const n = [];
    for (let a = 0; a < e - 1; a++) {
      const s = t.slice(a * e, a * e + e);
      this.weekShouldBeDisplayed(s) && n.push(s);
    }
    return n;
  }
  isFocusableDate(t) {
    return t.selected || this.previewValue.getTime() === t.date.getTime();
  }
  weekShouldBeDisplayed(t) {
    const e = t.find(t => !t.hidden);
    return t.length && !!e;
  }
  getMonthDays(t) {
    const e = new Date(this.previewValue.getTime());
    e.setDate(1), e.setMonth(e.getMonth() + t);
    const n = e.getMonth(),
      a = (function (t, e, n) {
        const a = new Date(e, t, 1, 1, 0, 0, 0),
          s = (-1 * (n - a.getDay() - 7)) % 7;
        return new Date(a.getTime() - 864e5 * s);
      })(n, e.getFullYear(), this.startDayOfWeek),
      s = this.generateDatesFrom(n, a, 42);
    return this.create2DArray(s, 7);
  }
  addDays(t, e) {
    const n = new Date(t.valueOf());
    return n.setDate(n.getDate() + e), n;
  }
  getAllDatesElements() {
    const t = this.root.shadowRoot.querySelectorAll('td');
    return Array.from(t);
  }
  getAllSelectableDatesElements() {
    const t = this.root.shadowRoot.querySelectorAll('td[tabindex="0"]');
    return Array.from(t);
  }
  getRangeDatesElements(t, e) {
    const n = [];
    let a;
    a = e < t ? this.getRangeDates(e, t) : this.getRangeDates(t, e);
    for (const t of a) {
      const e = this.root.shadowRoot.querySelector(`td[data-date="${t.getTime()}"]:not(.gux-hidden)`);
      e && n.push(e);
    }
    return n;
  }
  getRangeDates(t, e) {
    const n = [];
    let a = t;
    for (; a <= e; ) n.push(new Date(a)), (a = this.addDays(a, 1));
    return n;
  }
  async onDateClick(t) {
    if (!this.outOfBounds(t))
      if ('range' !== this.mode) await this.setValueAndEmit(t);
      else if (null === this.selectingDate)
        g(this.getAllDatesElements(), 'gux-hovered'),
          (this.selectingDate = new Date(t.valueOf())),
          (this.value = i(t, t));
      else {
        const e = this.root.shadowRoot.querySelector(`td[data-date="${t.getTime()}"]`);
        e && e.classList.add('gux-selected'),
          this.updateRangeElements(),
          await this.setValueAndEmit([this.selectingDate, t]),
          (this.previewValue = t),
          (this.selectingDate = null);
      }
  }
  onDateMouseEnter(t) {
    'range' === this.mode &&
      null !== this.selectingDate &&
      ((this.value = i(t, this.selectingDate)), this.updateRangeElements());
  }
  updateRangeElements() {
    if ('range' === this.mode) {
      g(this.getAllDatesElements(), 'gux-hovered');
      const [t, e] = r(this.value);
      x(this.getRangeDatesElements(t, e), 'add', 'gux-hovered');
    }
  }
  async onKeyDown(t) {
    switch (t.key) {
      case ' ':
      case 'Enter':
        t.preventDefault(), await this.onDateClick(this.previewValue);
        break;
      case 'ArrowDown':
        t.preventDefault(),
          (this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() + 7))),
          this.onDateMouseEnter(this.previewValue),
          s(() => {
            this.focusPreviewDate();
          });
        break;
      case 'ArrowUp':
        t.preventDefault(),
          (this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() - 7))),
          this.onDateMouseEnter(this.previewValue),
          s(() => {
            this.focusPreviewDate();
          });
        break;
      case 'ArrowLeft':
        t.preventDefault(),
          (this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() - 1))),
          this.onDateMouseEnter(this.previewValue),
          s(() => {
            this.focusPreviewDate();
          });
        break;
      case 'ArrowRight':
        t.preventDefault(),
          (this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() + 1))),
          this.onDateMouseEnter(this.previewValue),
          s(() => {
            this.focusPreviewDate();
          });
        break;
      case 'PageUp':
        this.incrementPreviewDateByMonth(1), this.onDateMouseEnter(this.previewValue);
        break;
      case 'PageDown':
        this.incrementPreviewDateByMonth(-1), this.onDateMouseEnter(this.previewValue);
    }
  }
  componentWillLoad() {
    if (
      (h(this.root, { variant: this.mode }),
      (this.locale = l(this.root)),
      (this.startDayOfWeek = this.startDayOfWeek || c(this.locale)),
      !this.value)
    ) {
      const t = new Date();
      t.setHours(0, 0, 0, 0), (this.value = 'range' === this.mode ? i(t, t) : o(t));
    }
    this.previewValue = d(this.value);
  }
  componentDidRender() {
    this.updateRangeElements();
  }
  renderMonthHeader() {
    return n(
      'div',
      { class: 'gux-month-list' },
      Array.from(Array(this.numberOfMonths).keys()).map(t => {
        const e = (function (t, e) {
          const n = new Date(t);
          return n.setDate(1), n.setMonth(n.getMonth() + e), n;
        })(this.previewValue, t);
        return n('label', null, b(e, this.locale));
      }),
    );
  }
  renderCalendarTable(t) {
    return n(
      'table',
      null,
      n(
        'tr',
        null,
        (function (t, e) {
          const n = [],
            a = new Date(1970, 0, 4);
          for (let e = 0; e < 7; e++) {
            const e = a.toLocaleString(t, { weekday: 'narrow' });
            n.push(e), a.setDate(a.getDate() + 1);
          }
          return (s = n).concat(s.splice(0, (i = e) > s.length ? i % s.length : i));
          var s, i;
        })(this.locale, this.startDayOfWeek).map(t => n('th', null, t)),
      ),
      this.getMonthDays(t).map(t =>
        n(
          'tr',
          null,
          t.map(t =>
            n(
              'td',
              {
                tabindex: this.isFocusableDate(t) ? '0' : '-1',
                class: t.class,
                'aria-hidden': t.hidden ? 'true' : 'false',
                'aria-disabled': t.disabled ? 'true' : 'false',
                'data-date': t.date.getTime(),
                onClick: () => {
                  this.onDateClick(t.date);
                },
                onMouseEnter: () => this.onDateMouseEnter(t.date),
                onKeyDown: t => {
                  this.onKeyDown(t);
                },
              },
              t.date.getDate(),
              n('span', { class: 'gux-sr-only' }, b(t.date, this.locale)),
            ),
          ),
        ),
      ),
    );
  }
  render() {
    return n(
      'div',
      { class: 'gux-calendar' },
      n(
        'div',
        { class: 'gux-header' },
        n(
          'button',
          {
            type: 'button',
            class: 'gux-left',
            onClick: () => this.incrementPreviewDateByMonth(-1),
            tabindex: '-1',
            'aria-hidden': 'true',
          },
          n('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-left' }),
        ),
        this.renderMonthHeader(),
        n(
          'button',
          {
            type: 'button',
            class: 'gux-right',
            onClick: () => this.incrementPreviewDateByMonth(1),
            tabindex: '-1',
            'aria-hidden': 'true',
          },
          n('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-right' }),
        ),
      ),
      n(
        'div',
        { class: 'gux-content' },
        Array.from(Array(this.numberOfMonths).keys()).map(t => this.renderCalendarTable(t)),
      ),
    );
  }
  get root() {
    return a(this);
  }
};
f.style =
  ':host{display:inline-block}.gux-calendar{margin-top:2px;border:1px solid #b4bccb;border-radius:4px}.gux-calendar .gux-header{position:relative;display:flex;align-items:center;justify-content:space-between;height:16px;color:#fdfdfd;background-color:#2a60c8;border-top-left-radius:3px;border-top-right-radius:3px}.gux-calendar .gux-header button{position:absolute;color:#fdfdfd;cursor:pointer;background:none;border:none;outline:none}.gux-calendar .gux-header button:focus-visible{outline:#75a8ff auto 5px}.gux-calendar .gux-header button.gux-left{left:18px}.gux-calendar .gux-header button.gux-right{right:18px}.gux-calendar .gux-header button gux-icon{width:16px;height:16px;pointer-events:none}.gux-calendar .gux-header .gux-month-list{display:flex;justify-content:space-between;width:100%}.gux-calendar .gux-header .gux-month-list label{width:100%;text-align:center;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-calendar .gux-content{display:flex;align-items:flex-start;padding:20px 24px;color:#2e394c;background-color:#fdfdfd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.gux-calendar .gux-content table{width:168px;text-align:left;table-layout:fixed;border-spacing:0;-ms-user-select:none;user-select:none}.gux-calendar .gux-content table:not(:last-child){padding-right:24px}.gux-calendar .gux-content table tr{height:28px}.gux-calendar .gux-content table tr:empty{display:none}.gux-calendar .gux-content table tr th,.gux-calendar .gux-content table tr td{width:28px;height:28px;padding:0;margin:0;text-align:center;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-calendar .gux-content table tr th{font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-calendar .gux-content table tr td{cursor:pointer}.gux-calendar .gux-content table tr td.gux-hovered{background-color:#deeaff}.gux-calendar .gux-content table tr td.gux-selected{color:#fdfdfd;background-color:#2a60c8;border-radius:4px}.gux-calendar .gux-content table tr td.gux-selected.gux-start-date{border-radius:4px 0 0 4px}.gux-calendar .gux-content table tr td.gux-selected.gux-end-date{border-radius:0 4px 4px 0}.gux-calendar .gux-content table tr td:hover:not(.gux-calendar .gux-content table tr td.gux-start-date):not(.gux-calendar .gux-content table tr td.gux-end-date){color:#fdfdfd;background-color:#2a60c8;border-radius:4px}.gux-calendar .gux-content table tr td.gux-disabled{color:rgba(46, 57, 76, 0.5);pointer-events:none}.gux-calendar .gux-content table tr td.gux-not-in-month{color:rgba(107, 117, 133, 0.5)}.gux-calendar .gux-content table tr td.gux-not-in-month:hover{color:#2e394c;background-color:#e2e6ee}.gux-calendar .gux-content table tr td.gux-not-in-month.gux-hidden{visibility:hidden}.gux-sr-only{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}';
export { f as gux_calendar };

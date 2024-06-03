import { r as t, h as e, g as r } from './p-9031eb6a.js';
import { b as a, g as n } from './p-54ad2682.js';
import { s } from './p-d176c2ae.js';
import { b as o } from './p-091f51f6.js';
import { g as i, b as h, a as u } from './p-955a1e6a.js';
import './p-8a133b9b.js';
const d = { changeYear: 'Current year is {currentYear}, Click to change year to {changeYear}' },
  c = class {
    constructor(e) {
      t(this, e),
        (this.value = void 0),
        (this.min = void 0),
        (this.max = void 0),
        (this.year = void 0),
        (this.locale = void 0);
    }
    onValueUpdate(t) {
      const { year: e } = i(t);
      this.year = e;
    }
    async guxFocus(t) {
      t = t || h();
      const { year: e } = i(t);
      (this.year = e),
        o(() => {
          const e = this.root.shadowRoot.querySelector(`gux-month-list-item[value="${t}"]`);
          e && e.focus();
        });
    }
    async componentWillLoad() {
      (this.i18n = await a(this.root, d)),
        (this.locale = n(this.root)),
        (this.year = this.value ? i(this.value).year : i(h()).year);
    }
    updateValue(t) {
      (this.value = t), s(this.root, 'input'), s(this.root, 'change');
    }
    isOutOfBounds(t) {
      return (this.max && this.max < t) || (this.min && this.min > t);
    }
    onMonthClick(t) {
      this.isOutOfBounds(t) || this.updateValue(t);
    }
    getMonthAriaLabel(t) {
      const { year: e, month: r } = i(t);
      return new Date(Number(e), Number(r) - 1).toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
    }
    getYearLabel(t) {
      return new Date(Number(t), 5).toLocaleDateString(this.locale, { year: 'numeric' });
    }
    isSelectedMonth(t) {
      return t === this.value;
    }
    isAriaSelectedMonth(t) {
      return !!this.isSelectedMonth(t) && 'true';
    }
    changeYear(t) {
      this.year = (parseInt(this.year) + t).toString();
    }
    isPreviousYearLessThanMinYear(t, e) {
      return (parseInt(t) - 1).toString() < (e && i(e).year);
    }
    isNextYearGreaterThanMaxYear(t, e) {
      return (parseInt(t) + 1).toString() > (e && i(e).year);
    }
    getMonthShortName(t, e) {
      return new Date(Number(t), Number(e) - 1).toLocaleDateString(this.locale, { month: 'short' });
    }
    doFocusTrap() {
      this.previousYearElement.disabled || this.previousYearElement.focus(),
        this.nextYearElement.disabled || this.nextYearElement.focus(),
        this.monthListElement.focus();
    }
    renderHeader() {
      return e(
        'div',
        { class: 'gux-year-header' },
        e(
          'button',
          {
            type: 'button',
            class: 'gux-year-change',
            onClick: () => this.changeYear(-1),
            disabled: this.isPreviousYearLessThanMinYear(this.year, this.min),
            ref: t => (this.previousYearElement = t),
          },
          e('gux-icon', {
            'icon-name': 'chevron-small-left',
            'screenreader-text': this.i18n('changeYear', {
              currentYear: parseInt(this.year),
              changeYear: parseInt(this.year) - 1,
            }),
          }),
        ),
        e('div', { class: 'gux-year' }, this.getYearLabel(this.year)),
        e(
          'button',
          {
            type: 'button',
            class: 'gux-year-change',
            onClick: () => this.changeYear(1),
            disabled: this.isNextYearGreaterThanMaxYear(this.year, this.max),
            ref: t => (this.nextYearElement = t),
          },
          e('gux-icon', {
            'icon-name': 'chevron-small-right',
            'screenreader-text': this.i18n('changeYear', {
              currentYear: parseInt(this.year),
              changeYear: parseInt(this.year) + 1,
            }),
          }),
        ),
      );
    }
    renderMonths() {
      const t = Array.from(new Array(12), (t, e) => String(e + 1).padStart(2, '0')).map(t => {
        const r = u(this.year, t);
        return e(
          'gux-month-list-item',
          {
            value: r,
            selected: this.isSelectedMonth(r),
            'aria-selected': this.isAriaSelectedMonth(r),
            'aria-label': this.getMonthAriaLabel(r),
            onClick: () => this.onMonthClick(r),
            disabled: this.isOutOfBounds(r),
          },
          this.getMonthShortName(this.year, t),
        );
      });
      return e('gux-month-list', { tabIndex: 1, ref: t => (this.monthListElement = t) }, t);
    }
    renderTrapFocusEl() {
      return e('span', { onFocus: () => this.doFocusTrap(), tabindex: '0' });
    }
    render() {
      return e(
        'div',
        { class: 'gux-month-calendar' },
        this.renderHeader(),
        this.renderMonths(),
        this.renderTrapFocusEl(),
      );
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return r(this);
    }
    static get watchers() {
      return { value: ['onValueUpdate'] };
    }
  };
c.style =
  '.gux-month-calendar{flex-wrap:wrap;width:255px;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-month-calendar .gux-year-header{position:relative;display:flex;align-items:center;justify-content:space-between;height:16px;padding:16px;color:#fdfdfd;background-color:#2a60c8;border-top-left-radius:3px;border-top-right-radius:3px}.gux-month-calendar .gux-year-header button{color:#fdfdfd;cursor:pointer;background:none;border:none;outline:none}.gux-month-calendar .gux-year-header button:focus-visible{border-radius:4px;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-month-calendar .gux-year-header button.gux-year-change:disabled{cursor:default;opacity:0.5}.gux-month-calendar .gux-year-header button gux-icon{width:16px;height:16px;pointer-events:none}.gux-month-calendar .gux-year-header .gux-year{font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-month-calendar .gux-months{padding:24px;background-color:#fdfdfd}.gux-month-calendar .gux-months button{width:65px;height:50px;margin:2px;text-align:center;cursor:pointer;background:none;border:none;border-radius:4px;outline:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-month-calendar .gux-months button:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-month-calendar .gux-months button.gux-selected,.gux-month-calendar .gux-months button:hover{color:#fdfdfd;background-color:#2a60c8}.gux-month-calendar .gux-months button:disabled{color:#596373;pointer-events:none;background-color:#fdfdfd}';
export { c as gux_month_calendar };

import { r as t, h as e, g as i } from './p-9031eb6a.js';
import { t as s } from './p-6a46bf1b.js';
import { O as r } from './p-23975bfb.js';
import { b as n, g as o } from './p-54ad2682.js';
import { s as a } from './p-d176c2ae.js';
import { b as h } from './p-091f51f6.js';
import { g as u, a as p, b as g } from './p-955a1e6a.js';
import './p-8a133b9b.js';
const l = { toggleCalendar: 'Toggle month calendar view', month: 'Month', year: 'Year', unset: 'Unset' };
const d = { year: 'numeric', month: 'long' },
  x = ['ar', 'he', 'ja', 'ko', 'zh-cn', 'zh-tw'],
  c = class {
    constructor(e) {
      t(this, e),
        (this.value = void 0),
        (this.min = void 0),
        (this.max = void 0),
        (this.disabled = !1),
        (this.expanded = !1),
        (this.locale = void 0);
    }
    onKeyDown(t) {
      'Escape' === t.key && ((this.expanded = !1), this.calendarToggleButtonElement.focus());
    }
    onValueUpdate(t) {
      (this.value = this.isOutOfBounds(t) ? (this.isBeforeMin(t) ? this.min : this.max) : t),
        a(this.root, 'input'),
        a(this.root, 'change');
    }
    onClickOutside() {
      this.expanded = !1;
    }
    async componentWillLoad() {
      s(this.root), (this.i18n = await n(this.root, l)), (this.locale = o(this.root));
    }
    isOutOfBounds(t) {
      return this.isBeforeMin(t) || this.isAfterMax(t);
    }
    isBeforeMin(t) {
      return this.min && this.min > t;
    }
    isAfterMax(t) {
      return this.max && this.max < t;
    }
    toggleCalendar() {
      (this.expanded = !this.expanded),
        this.expanded &&
          h(() => {
            this.monthCalendarElement.guxFocus(this.value);
          });
    }
    onMonthCalendarInput() {
      (this.value = this.monthCalendarElement.value), (this.expanded = !1), this.calendarToggleButtonElement.focus();
    }
    incrementMonth(t) {
      if (this.value) {
        const { year: e, month: i } = u(this.value),
          s = (((parseInt(i) + 11 + t) % 12) + 1).toString().padStart(2, '0');
        this.value = p(e, s);
      } else this.value = g();
    }
    incrementYear(t) {
      if (this.value) {
        const { year: e, month: i } = u(this.value),
          s = Math.max(Number(e) + t, 0).toString();
        this.value = p(s, i);
      } else this.value = g();
    }
    onSpinnerKeyDown(t, e, i) {
      switch (t.key) {
        case 'ArrowDown':
          t.preventDefault(), e(-1);
          break;
        case 'ArrowUp':
          t.preventDefault(), e(1);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          t.preventDefault(), i.focus();
          break;
        case 'Enter':
          t.preventDefault(),
            (this.expanded = !0),
            h(() => {
              this.monthCalendarElement.guxFocus(this.value);
            });
          break;
        case ' ':
          t.preventDefault();
      }
    }
    onSpinnerKeyUp(t) {
      t.stopPropagation(),
        ' ' === t.key &&
          (t.preventDefault(),
          (this.expanded = !0),
          h(() => {
            this.monthCalendarElement.guxFocus(this.value);
          }));
    }
    onSpinnerClick() {
      this.expanded = !0;
    }
    getSpinnerLabel(t) {
      if (this.value) {
        const { year: e, month: i } = u(this.value);
        return new Date(Number(e), Number(i) - 1).toLocaleDateString(this.locale, { [t]: d[t] });
      }
      return this.i18n(t);
    }
    getSpinnerValueNow(t) {
      return this.value ? u(this.value)[t] : '0';
    }
    getSpinnerValueText() {
      if (this.value) {
        const { year: t, month: e } = u(this.value);
        return new Date(Number(t), Number(e) - 1).toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
      }
      return this.i18n('unset');
    }
    renderMonthSpinnerButton() {
      return e(
        'div',
        {
          role: 'spinbutton',
          class: { 'gux-spinner': !0, 'gux-empty': Boolean(!this.value) },
          tabIndex: this.disabled ? -1 : 0,
          onKeyDown: t => this.onSpinnerKeyDown(t, t => this.incrementMonth(t), this.yearSpinnerElement),
          onKeyUp: t => this.onSpinnerKeyUp(t),
          onClick: () => this.onSpinnerClick(),
          ref: t => (this.monthSpinnerElement = t),
          'aria-valuenow': this.getSpinnerValueNow('month'),
          'aria-valuetext': this.getSpinnerValueText(),
          'aria-valuemin': '1',
          'aria-valuemax': '12',
          'aria-label': this.i18n('month'),
        },
        this.getSpinnerLabel('month'),
      );
    }
    renderYearSpinnerButton() {
      return e(
        'div',
        {
          role: 'spinbutton',
          class: { 'gux-spinner': !0, 'gux-empty': Boolean(!this.value) },
          tabIndex: this.disabled ? -1 : 0,
          onKeyDown: t => this.onSpinnerKeyDown(t, t => this.incrementYear(t), this.monthSpinnerElement),
          onKeyUp: t => this.onSpinnerKeyUp(t),
          onClick: () => this.onSpinnerClick(),
          ref: t => (this.yearSpinnerElement = t),
          'aria-valuenow': this.getSpinnerValueNow('year'),
          'aria-valuetext': this.getSpinnerValueText(),
          'aria-valuemin': '0',
          'aria-label': this.i18n('year'),
        },
        this.getSpinnerLabel('year'),
      );
    }
    renderSpinnerButtons() {
      return x.includes(this.locale)
        ? e('span', { class: 'gux-display' }, this.renderYearSpinnerButton(), this.renderMonthSpinnerButton())
        : e('span', { class: 'gux-display' }, this.renderMonthSpinnerButton(), this.renderYearSpinnerButton());
    }
    renderCalendarToggleButton() {
      return e(
        'button',
        {
          class: { 'gux-popup-toggle': !0, 'gux-expanded': this.expanded },
          ref: t => (this.calendarToggleButtonElement = t),
          type: 'button',
          onClick: () => this.toggleCalendar(),
          disabled: this.disabled,
        },
        e('gux-icon', { 'icon-name': 'calendar', 'screenreader-text': this.i18n('toggleCalendar') }),
      );
    }
    renderTarget() {
      return e(
        'div',
        { class: 'gux-target', slot: 'target' },
        this.renderSpinnerButtons(),
        this.renderCalendarToggleButton(),
      );
    }
    renderPopup() {
      return e('gux-month-calendar', {
        slot: 'popup',
        ref: t => (this.monthCalendarElement = t),
        onInput: () => this.onMonthCalendarInput(),
        value: this.value,
        min: this.min,
        max: this.max,
      });
    }
    render() {
      return e(
        'gux-popup-beta',
        { expanded: this.expanded, disabled: this.disabled, exceedTargetWidth: !0 },
        this.renderTarget(),
        this.renderPopup(),
      );
    }
    get root() {
      return i(this);
    }
    static get watchers() {
      return { value: ['onValueUpdate'] };
    }
  };
(function (t, e, i, s) {
  var r,
    n = arguments.length,
    o = n < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s);
  else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(e, i, o) : r(e, i)) || o);
  n > 3 && o && Object.defineProperty(e, i, o);
})([r({ triggerEvents: 'mousedown' })], c.prototype, 'onClickOutside', null),
  (c.style =
    ':host{display:inline-block}.gux-target{display:inline-flex;padding:4px 8px 4px 12px;cursor:pointer;background-color:#f6f7f9;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target .gux-display{display:inline-flex;min-width:100px;padding-right:8px;color:#2e394c}.gux-target .gux-display .gux-spinner{outline:none}.gux-target .gux-display .gux-spinner:not(:first-child){margin-left:4px}.gux-target .gux-display .gux-spinner:focus-visible{background:#deeaff}.gux-target .gux-display .gux-spinner.gux-empty{color:#596373}.gux-target .gux-popup-toggle{justify-content:right;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}.gux-target .gux-popup-toggle:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target .gux-popup-toggle:not(:disabled):focus,.gux-target .gux-popup-toggle:not(:disabled):hover{color:#2e394c;cursor:pointer}.gux-target .gux-popup-toggle gux-icon{width:16px;height:16px}.gux-target .gux-popup-toggle.gux-expanded{color:#2a60c8}.gux-target .gux-popup-toggle.gux-expanded:not(:disabled):focus-visible,.gux-target .gux-popup-toggle.gux-expanded:not(:disabled):hover{color:#2a60c8}');
export { c as gux_month_picker_beta };

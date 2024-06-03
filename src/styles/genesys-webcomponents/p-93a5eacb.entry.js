import { r as o, c as e, f as t, h as i, g as d } from './p-9031eb6a.js';
import { O as n } from './p-23975bfb.js';
import { w as g } from './p-76ff3e75.js';
import { t as u } from './p-6a46bf1b.js';
import { O as r } from './p-f222d4b1.js';
var x = function (o, e, t, i) {
  var d,
    n = arguments.length,
    g = n < 3 ? e : null === i ? (i = Object.getOwnPropertyDescriptor(e, t)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) g = Reflect.decorate(o, e, t, i);
  else for (var u = o.length - 1; u >= 0; u--) (d = o[u]) && (g = (n < 3 ? d(g) : n > 3 ? d(e, t, g) : d(e, t)) || g);
  return n > 3 && g && Object.defineProperty(e, t, g), g;
};
const l = class {
  constructor(t) {
    o(this, t),
      (this.change = e(this, 'change', 7)),
      (this.inputIsFocused = !1),
      (this.valueEdited = !1),
      (this.mode = 'default'),
      (this.disabled = !1),
      (this.value = ''),
      (this.placeholder = void 0),
      (this.filterable = void 0),
      (this.opened = void 0),
      (this.forcedGhostValue = void 0),
      (this.srLabeledBy = void 0);
  }
  emitChange(o) {
    this.change.emit(o);
  }
  onClickOutside(o) {
    (o.relatedTarget && this.root.contains(o.relatedTarget)) ||
      ((this.opened = !1),
      (this.forcedGhostValue = ''),
      this.getSelectionOptions().some(o => o.text === this.value) || (this.value = ''));
  }
  async setLabeledBy(o) {
    this.srLabeledBy = o;
  }
  async setSelected() {
    const o = this.getSelectionOptions(),
      e = o.map(o => o.selected).lastIndexOf(!0);
    if (e >= 0) return void (this.value = o[e].text);
    const t = o.find(o => this.value === o.value);
    this.value = t ? t.text : '';
  }
  onMutation() {
    t(this.root), this.setSelected();
  }
  onKeyDown(o) {
    const e = this.getSelectionOptions(),
      t = this.getFocusIndex(e);
    switch (o.key) {
      case 'ArrowUp':
        o.preventDefault(), t > 0 && e[t - 1].focus();
        break;
      case 'ArrowDown':
        o.preventDefault(), this.inputIsFocused && (this.opened = !0), t < e.length - 1 && e[t + 1].focus();
        break;
      case 'Home':
        if (!e.length) return;
        e[0].focus();
        break;
      case 'End':
        if (!e.length) return;
        e[e.length - 1].focus();
        break;
      case 'Escape':
      case 'Tab':
        this.textFieldElement.focus(), (this.opened = !1);
        break;
      case 'Enter':
      case 'Space':
        break;
      default:
        if (((this.valueEdited = !0), !this.filterable)) {
          const t = e.filter(e => e.text.startsWith(o.key));
          t[0] && t[0].focus();
        }
    }
  }
  setValue(o, e) {
    (this.value = o), (this.opened = !1), (this.valueEdited = !1), this.emitChange(e);
  }
  _clickHandler() {
    this.disabled || (this.opened = !this.opened);
  }
  _focusHandler() {
    this.inputIsFocused = !0;
  }
  _optionFocusedHandler(o) {
    g('gux-option-legacy', o, o => {
      this.forcedGhostValue = this.value + o.text.substring(this.value.length);
    });
  }
  optionSelectedHandler(o) {
    g('gux-option-legacy', o, o => {
      const e = o;
      this.getSelectionOptions().forEach(o => {
        o === e ? ((o.selected = !0), this.setValue(o.text, o.value || o.text)) : (o.selected = !1);
      });
    });
  }
  optionKeyDownHandler(o) {
    (' ' !== o.key && 'Enter' !== o.key) || this.optionSelectedHandler(o);
  }
  _blurHandler() {
    (this.inputIsFocused = !1), (this.forcedGhostValue = '');
  }
  _inputHandler(o) {
    (this.value = o.target.value), (this.opened = !0);
  }
  getFilteredItems() {
    const o = this.getSelectionOptions();
    return this.filterable ? o.filter(o => o.text.toLowerCase().startsWith(this.value.toLowerCase())) : o;
  }
  getSuggestionText(o = '') {
    this.searchHighlightAndFilter(this.value);
    const e = o.length,
      t = this.getFilteredItems().length ? this.getFilteredItems()[0].text : '';
    return e > 0 && t && this.opened && this.filterable ? t.substring(e) : '';
  }
  componentWillLoad() {
    u(this.root, { variant: this.filterable ? 'filterable' : 'full' });
  }
  componentDidLoad() {
    this.setSelected(), this.filterable || (this.textFieldElement.readOnly = !0);
  }
  getSelectionOptions() {
    const o = [],
      e = this.root.getElementsByClassName('gux-options')[0];
    return e
      ? (Array.from(e.children).forEach(e => {
          e.matches('gux-option-legacy') && o.push(e);
        }),
        o)
      : [];
  }
  render() {
    return i(
      'div',
      {
        class: `gux-dropdown gux-${this.mode} ${this.disabled ? 'gux-disabled' : ''} ${
          this.opened ? 'gux-active' : ''
        }`,
        onKeyDown: o => this.onKeyDown(o),
      },
      i(
        'div',
        { class: 'gux-select-field' },
        i(
          'span',
          { class: 'gux-filter-suggestion ' + (this.opened ? 'gux-active' : ''), 'aria-hidden': 'true' },
          i('span', { class: 'gux-filter-text' }, this.value),
          i('span', { class: 'gux-filter-typeahead' }, this.getSuggestionText(this.value)),
        ),
        i(
          'gux-input-text-like',
          null,
          i('input', {
            placeholder: this.placeholder,
            slot: 'input',
            value: this.value,
            'aria-labelledby': this.srLabeledBy,
            disabled: this.disabled,
            ref: o => (this.textFieldElement = o),
            onMouseDown: () => {
              this._clickHandler();
            },
            onFocus: () => {
              this._focusHandler();
            },
            onBlur: () => {
              this._blurHandler();
            },
            onInput: o => {
              this._inputHandler(o);
            },
          }),
        ),
        i(
          'button',
          { class: 'gux-dropdown-indicator', 'aria-hidden': 'true', tabindex: '-1', type: 'button' },
          i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
        ),
      ),
      i(
        'div',
        {
          class: 'gux-options ' + (this.opened ? 'gux-opened' : ''),
          onClick: this.optionSelectedHandler.bind(this),
          onFocusin: this._optionFocusedHandler.bind(this),
          onKeyDown: this.optionKeyDownHandler.bind(this),
        },
        i('slot', null),
      ),
    );
  }
  getFocusIndex(o) {
    return o.findIndex(o => o.matches(':focus'));
  }
  searchHighlightAndFilter(o) {
    const e = this.getSelectionOptions();
    if (e)
      for (const t of e)
        t.shouldFilter(o).then(o => {
          this.filterable && o && this.valueEdited
            ? t.classList.add('gux-filtered')
            : t.classList.remove('gux-filtered');
        });
  }
  get root() {
    return d(this);
  }
};
x([n({ triggerEvents: 'mousedown' })], l.prototype, 'onClickOutside', null),
  x([r({ childList: !0, subtree: !0 })], l.prototype, 'onMutation', null),
  (l.style =
    'gux-dropdown-legacy .gux-hidden{display:none}gux-dropdown-legacy div.gux-dropdown{position:relative;margin:4px 0}gux-dropdown-legacy div.gux-dropdown.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-dropdown-legacy div.gux-dropdown .gux-select-field{position:relative;width:100%;height:32px}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion{position:absolute;box-sizing:border-box;width:100%;height:32px;padding:6px 25px 6px 14px;overflow:hidden;font-size:12px;line-height:1.6667;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion .gux-filter-text{color:#2e394c}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion .gux-filter-typeahead{color:#596373}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like>div{margin:0}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like input{width:100%;padding-right:25px;font-size:12px;text-overflow:ellipsis;cursor:pointer;background-color:transparent}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like.gux-unclearable button{display:none}gux-dropdown-legacy div.gux-dropdown .gux-select-field button.gux-dropdown-indicator{position:absolute;top:1px;right:3px;bottom:0;display:block;overflow:hidden;pointer-events:none;cursor:pointer;background:none;border:none;outline:none}gux-dropdown-legacy div.gux-dropdown .gux-select-field button.gux-dropdown-indicator gux-icon{width:16px;height:16px;color:#596373}gux-dropdown-legacy div.gux-dropdown .gux-select-field:hover button.gux-dropdown-indicator gux-icon,gux-dropdown-legacy div.gux-dropdown .gux-select-field:focus-within button.gux-dropdown-indicator gux-icon{color:#2e394c}gux-dropdown-legacy div.gux-dropdown .gux-options{position:absolute;z-index:var(--gux-zindex-popup, 1);display:none;width:100%;padding:8px 0;margin-top:2px;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-dropdown-legacy div.gux-dropdown .gux-options.gux-opened{display:block}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy{position:relative;display:flex;height:32px;padding:0 16px;line-height:32px;cursor:pointer}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy>div{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy>div .gux-filter-suggestion{position:absolute}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy[disabled]{pointer-events:none;cursor:default;opacity:0.5}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy.gux-filtered{display:none}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy:not([disabled])[selected]{color:#2e394c;background:#deeaff}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy:not([disabled]):hover,gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy:not([disabled]):focus-visible{color:#fdfdfd;background:#2a60c8}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field{height:48px}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field .gux-filter-suggestion{height:48px;padding:2px 25px 4px 11px;overflow:hidden;line-height:1.6667;white-space:nowrap;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like div.gux-input-container{height:48px}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px;height:48px;line-height:1.6667;color:transparent;caret-color:#2e394c;border:none;border-bottom:2px solid transparent}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input:focus-visible{border:none;border-bottom:2px solid rgba(117, 168, 255, 0.5);box-shadow:none}gux-dropdown-legacy div.gux-dropdown.gux-page.gux-active .gux-select-field gux-input-text-like input:focus{border-bottom:1px solid #2a60c8}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field{height:52px}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field .gux-filter-suggestion{height:52px;padding:9px 25px 4px 11px;overflow:hidden;line-height:1.6667;white-space:nowrap;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like div.gux-input-container{height:52px}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px;height:52px;line-height:1.6667;border:none;border-bottom:2px solid transparent}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input:focus-visible{border:none;border-bottom:2px solid rgba(117, 168, 255, 0.5);box-shadow:none}gux-dropdown-legacy div.gux-dropdown.gux-palette.gux-active .gux-select-field gux-input-text-like input:focus{border-bottom:1px solid #2a60c8}gux-dropdown-legacy:hover gux-icon,gux-dropdown-legacy:focus-visible gux-icon{color:#2e394c}.gux-dropdown-light-theme div.gux-dropdown .gux-select-field .gux-filter-suggestion{color:#596373}.gux-dropdown-light-theme div.gux-dropdown .gux-select-field gux-input-text-like input{color:transparent;caret-color:#2e394c;border-color:#6b7585}.gux-dropdown-light-theme div.gux-dropdown .gux-select-field button.gux-dropdown-indicator{color:#596373}.gux-dropdown-light-theme div.gux-dropdown.gux-page .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}.gux-dropdown-light-theme div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}.gux-dropdown-light-theme div.gux-dropdown.gux-page.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}.gux-dropdown-light-theme div.gux-dropdown.gux-palette .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}.gux-dropdown-light-theme div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}.gux-dropdown-light-theme div.gux-dropdown.gux-palette.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion{color:#596373}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like input{color:transparent;caret-color:#2e394c;border-color:#6b7585}gux-dropdown-legacy div.gux-dropdown .gux-select-field button.gux-dropdown-indicator{color:#596373}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}gux-dropdown-legacy div.gux-dropdown.gux-page.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}gux-dropdown-legacy div.gux-dropdown.gux-palette.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}');
export { l as gux_dropdown_legacy };

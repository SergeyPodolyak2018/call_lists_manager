import { r as e, c as t, h as s, g as i } from './p-9031eb6a.js';
import { o } from './p-93904222.js';
import { O as a } from './p-23975bfb.js';
import { a as n } from './p-091f51f6.js';
import { t as r } from './p-6a46bf1b.js';
import { b as p } from './p-54ad2682.js';
import './p-8a133b9b.js';
const u = { searchAria: 'Search' };
const c = class {
  constructor(s) {
    e(this, s),
      (this.input = t(this, 'input', 7)),
      (this.filter = t(this, 'filter', 7)),
      (this.disabled = !1),
      (this.placeholder = void 0),
      (this.noFilter = !1),
      (this.filterDebounceTimeout = 500),
      (this.dropdownHeight = '320px'),
      (this.srLabelledby = void 0),
      (this.opened = void 0),
      (this.currentlySelectedOption = void 0),
      (this.selectionOptions = void 0);
  }
  watchValue(e) {
    this.opened && e && this.closeDropdown(!1);
  }
  get value() {
    var e;
    return null === (e = this.currentlySelectedOption) || void 0 === e ? void 0 : e.text;
  }
  getSelectedValues() {
    return Promise.resolve([this.value]);
  }
  async setLabeledBy(e) {
    this.srLabelledby = e;
  }
  onClickOutside() {
    this.closeDropdown(!1);
  }
  async componentWillLoad() {
    r(this.root),
      (this.i18n = await p(this.root, u)),
      (this.handleSelectionChange = this.handleSelectionChange.bind(this)),
      this.updateSelectionState(),
      this.addOptionListener(),
      (this.slotObserver = o(this.root, () => this.updateSelectionState()));
  }
  disconnectedCallback() {
    this.slotObserver && this.slotObserver.disconnect();
  }
  render() {
    return s(
      'gux-popup-beta',
      { expanded: this.opened, disabled: this.disabled },
      s(
        'div',
        { slot: 'target', class: 'gux-select-field', onMouseDown: () => this.inputMouseDown() },
        s(
          'a',
          {
            ref: e => (this.inputBox = e),
            class: 'gux-select-input',
            'aria-labelledby': this.srLabelledby,
            tabindex: '0',
            onKeyDown: e => this.inputKeyDown(e),
          },
          this.placeholder &&
            !this.value &&
            s('span', { class: 'gux-select-placeholder', title: this.placeholder }, this.placeholder),
          this.value && s('span', { class: 'gux-select-value', title: this.value }, this.value),
        ),
        s('div', { class: 'gux-icon-wrapper' }, s('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' })),
      ),
      s(
        'div',
        { slot: 'popup', class: 'gux-advanced-dropdown-menu' },
        s(
          'div',
          { class: 'gux-dropdown-menu-container' },
          s(
            'gux-form-field-search',
            { 'label-position': 'screenreader' },
            s('label', { slot: 'label' }, this.i18n('searchAria')),
            s('input', {
              slot: 'input',
              type: 'search',
              onInput: e => {
                this.handleSearchInput(e);
              },
              ref: e => (this.searchInput = e),
            }),
          ),
          s(
            'div',
            {
              class: 'gux-dropdown-options',
              style: { maxHeight: this.dropdownHeight },
              onKeyDown: e => this.optionsKeyDown(e),
            },
            s('slot', null),
          ),
        ),
      ),
    );
  }
  updateSelectionState() {
    (this.selectionOptions = this.getSelectionOptions()),
      (this.currentlySelectedOption = this.selectionOptions.find(e => e.selected));
  }
  addOptionListener() {
    this.root.addEventListener('selectedChanged', e => this.handleSelectionChange(e));
  }
  handleSelectionChange({ target: e }) {
    const t = e;
    this.closeDropdown(!0),
      this.currentlySelectedOption !== t &&
        (this.currentlySelectedOption && (this.currentlySelectedOption.selected = !1),
        (this.currentlySelectedOption = t),
        this.input.emit(t.value));
  }
  getSelectionOptions() {
    const e = this.root.querySelectorAll('gux-dropdown-option');
    return Array.from(e);
  }
  inputMouseDown() {
    this.disabled || (this.opened ? this.closeDropdown(!0) : this.openDropdown(!1));
  }
  getFocusIndex() {
    return this.selectionOptions.findIndex(e => e.matches(':focus'));
  }
  optionsKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        const t = this.getFocusIndex();
        t > 0 && this.selectionOptions[t - 1].focus();
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const t = this.getFocusIndex();
        t < this.selectionOptions.length - 1 && this.selectionOptions[t + 1].focus();
        break;
      }
      case 'Home':
        if (!this.selectionOptions.length) return;
        this.selectionOptions[0].focus();
        break;
      case 'End':
        if (!this.selectionOptions.length) return;
        this.selectionOptions[this.selectionOptions.length - 1].focus();
    }
  }
  inputKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        this.openDropdown(!0);
    }
  }
  handleSearchInput(e) {
    e.stopPropagation(),
      clearTimeout(this.filterDebounceTimer),
      (this.filterDebounceTimer = setTimeout(() => this.searchRequested(), this.filterDebounceTimeout));
  }
  searchRequested() {
    this.filter.emit(this.searchInput.value), this.setFilteredOptions();
  }
  setFilteredOptions() {
    const e = this.searchInput.value;
    if (!this.noFilter)
      for (const t of this.selectionOptions)
        t.shouldFilter(e).then(e => {
          t.filtered = e;
        });
  }
  changeFocusToSearch() {
    n(() => {
      this.searchInput.focus();
    });
  }
  openDropdown(e) {
    (this.opened = !0), e && this.changeFocusToSearch();
  }
  closeDropdown(e) {
    (this.opened = !1), (this.searchInput.value = ''), this.setFilteredOptions(), e && this.inputBox.focus();
  }
  get root() {
    return i(this);
  }
  static get watchers() {
    return { disabled: ['watchValue'] };
  }
};
(function (e, t, s, i) {
  var o,
    a = arguments.length,
    n = a < 3 ? t : null === i ? (i = Object.getOwnPropertyDescriptor(t, s)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) n = Reflect.decorate(e, t, s, i);
  else for (var r = e.length - 1; r >= 0; r--) (o = e[r]) && (n = (a < 3 ? o(n) : a > 3 ? o(t, s, n) : o(t, s)) || n);
  a > 3 && n && Object.defineProperty(t, s, n);
})([a({ triggerEvents: 'mousedown' })], c.prototype, 'onClickOutside', null),
  (c.style =
    ':host{color:#2e394c}gux-popup-beta{display:block;margin:4px 0}gux-popup-beta .gux-select-field{position:relative;width:100%;height:32px}gux-popup-beta .gux-select-field a.gux-select-input{position:absolute;inset:0;padding:6px 24px 6px 12px;overflow:hidden;color:#2e394c;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-popup-beta .gux-select-field a.gux-select-input .gux-select-placeholder,gux-popup-beta .gux-select-field a.gux-select-input .gux-select-value{line-height:20px}gux-popup-beta .gux-select-field a.gux-select-input .gux-select-placeholder{color:#596373}gux-popup-beta .gux-select-field a.gux-select-input:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(117, 168, 255, 0.5)}gux-popup-beta .gux-select-field .gux-icon-wrapper{position:absolute;top:1px;right:8px;bottom:0;display:flex;align-items:center;overflow:hidden;cursor:pointer}gux-popup-beta .gux-select-field .gux-icon-wrapper gux-icon{width:16px;height:16px;color:#596373}gux-popup-beta .gux-select-field:hover .gux-icon-wrapper gux-icon{color:#2e394c}gux-popup-beta .gux-advanced-dropdown-menu{background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 0 2px 0 rgba(32, 41, 55, 0.24);box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search{margin:8px 16px}gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search input::-webkit-search-cancel-button,gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search input::-webkit-search-results-button,gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search input::-webkit-calendar-picker-indicator{display:none;-webkit-appearance:none}gux-popup-beta .gux-dropdown-options{padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border-radius:4px;box-shadow:none}');
export { c as gux_advanced_dropdown };

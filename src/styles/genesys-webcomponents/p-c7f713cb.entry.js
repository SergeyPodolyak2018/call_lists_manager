import { r as t, c as e, f as i, h as s, g as n } from './p-9031eb6a.js';
import { O as o } from './p-23975bfb.js';
import { b as r } from './p-54ad2682.js';
import { s as l } from './p-d176c2ae.js';
import { b as u } from './p-091f51f6.js';
import { o as a } from './p-3f5341ea.js';
import { t as d } from './p-6a46bf1b.js';
import { g as h } from './p-55cf6d81.js';
import { O as c } from './p-f222d4b1.js';
import './p-8a133b9b.js';
const x = {
  textInputResults: 'Type to filter dropdown results',
  noSelection: 'Select...',
  dropdown: 'Dropdown',
  numberSelected: '{numberSelected} selected',
  pressEnterToCreate: 'Press Enter to create new option, {textInputValue}',
};
var g = function (t, e, i, s) {
  var n,
    o = arguments.length,
    r = o < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s);
  else for (var l = t.length - 1; l >= 0; l--) (n = t[l]) && (r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r);
  return o > 3 && r && Object.defineProperty(e, i, r), r;
};
const p = class {
  constructor(i) {
    t(this, i),
      (this.guxcreateoption = e(this, 'guxcreateoption', 7)),
      (this.guxexpanded = e(this, 'guxexpanded', 7)),
      (this.guxcollapsed = e(this, 'guxcollapsed', 7)),
      (this.guxfilter = e(this, 'guxfilter', 7)),
      (this.value = void 0),
      (this.disabled = !1),
      (this.required = !1),
      (this.loading = !1),
      (this.placeholder = void 0),
      (this.filterable = !1),
      (this.filterType = 'none'),
      (this.hasError = !1),
      (this.hasCreate = !1),
      (this.expanded = !1),
      (this.textInput = '');
  }
  onMutation() {
    var t;
    this.listboxElement ||
      ((this.listboxElement = null === (t = this.root) || void 0 === t ? void 0 : t.querySelector('gux-listbox-multi')),
      this.applyListboxEventListeners());
  }
  onInternalExpanded(t) {
    t.stopPropagation(), this.guxexpanded.emit();
  }
  onInternalCollapsed(t) {
    t.stopPropagation(), this.guxcollapsed.emit();
  }
  focusSelectedItemAfterRender(t) {
    t &&
      this.listboxElement &&
      u(() => {
        this.hasTextInput() ? this.textInputElement.focus() : this.listboxElement.focus();
      }),
      t || (this.textInput = '');
  }
  watchValue(t) {
    this.validateValue(t, this.listboxElement);
  }
  handleFilter(t) {
    this.guxfilter.emit(t);
  }
  getSelectedValues() {
    var t;
    return Promise.resolve((null === (t = this.value) || void 0 === t ? void 0 : t.split(',')) || []);
  }
  onKeydown(t) {
    switch (t.key) {
      case 'Escape':
        return this.hasTextInput() && document.activeElement === this.listboxElement
          ? this.textInputElement.focus()
          : void this.collapseListbox('focusFieldButton');
      case 'Tab':
        return this.shiftTabFromFilterListbox(t)
          ? (t.preventDefault(), this.textInputElement.focus())
          : this.shiftTabFromExpandedFilterInput(t)
          ? (t.preventDefault(), this.collapseListbox('focusFieldButton'))
          : void this.collapseListbox('noFocusChange');
      case 'ArrowDown':
        return void (this.activeElementNotListbox() && (t.preventDefault(), (this.expanded = !0)));
      case 'Enter':
        this.canCreateNewOption() && this.isActiveElement() && this.emitCreateOption();
    }
  }
  onInternallistboxoptionsupdated(t) {
    t.stopPropagation(), i(this.root);
  }
  onClearselected(t) {
    t.stopPropagation(),
      this.updateValue(''),
      this.listboxElement && (this.listboxElement.value = void 0),
      this.validateValue(this.value, this.listboxElement),
      this.fieldButtonElement.focus();
  }
  onCreatenewoption(t) {
    t.stopPropagation(), this.emitCreateOption();
  }
  onBlur(t) {
    this.stopPropagationOfInternalFocusEvents(t);
  }
  onFocus(t) {
    this.stopPropagationOfInternalFocusEvents(t);
  }
  onFocusout(t) {
    this.stopPropagationOfInternalFocusEvents(t);
  }
  onFocusin(t) {
    this.stopPropagationOfInternalFocusEvents(t);
  }
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }
  connectedCallback() {
    var t;
    (this.listboxElement = null === (t = this.root) || void 0 === t ? void 0 : t.querySelector('gux-listbox-multi')),
      this.listboxElement &&
        (this.validateValue(this.value, this.listboxElement),
        (this.hasCreate = !!this.root.querySelector('gux-create-option')));
  }
  async componentWillLoad() {
    d(this.root),
      (this.i18n = await r(this.root, x)),
      a(this.root, () => {
        i(this.root);
      });
  }
  componentDidLoad() {
    this.applyListboxEventListeners();
  }
  componentWillRender() {
    this.listboxElement &&
      (this.validateValue(this.value, this.listboxElement),
      (this.listboxElement.loading = this.loading),
      (this.listboxElement.filterType = this.filterType),
      (this.listboxElement.textInput = this.textInput));
  }
  validateValue(t, e) {
    void 0 !== t ? (this.getOptionElementByValue(t) ? (e.value = t) : (this.value = void 0)) : e && (e.value = t);
  }
  hasTextInput() {
    return this.isFilterable() || this.hasCreate;
  }
  applyListboxEventListeners() {
    var t, e;
    null === (t = this.listboxElement) ||
      void 0 === t ||
      t.addEventListener('input', t => {
        t.stopPropagation(), this.updateValue(t.target.value);
      }),
      null === (e = this.listboxElement) ||
        void 0 === e ||
        e.addEventListener('change', t => {
          t.stopPropagation();
        });
  }
  isFilterable() {
    return this.filterable || 'custom' === this.filterType || 'starts-with' === this.filterType;
  }
  stopPropagationOfInternalFocusEvents(t) {
    if (this.root.contains(t.relatedTarget)) return t.stopImmediatePropagation();
  }
  getOptionElementByValue(t) {
    const e = Array.from(this.root.querySelectorAll('gux-option-multi')),
      i = t ? t.split(',') : void 0;
    if (i) return e.filter(t => i.includes(t.value));
  }
  fieldButtonClick() {
    this.expanded = !this.expanded;
  }
  fieldButtonInputClick() {
    this.expanded || (this.expanded = !this.expanded);
  }
  filterInput(t) {
    t.stopPropagation(), (this.textInput = this.textInputElement.value);
  }
  shiftTabFromExpandedFilterInput(t) {
    return t.shiftKey && this.hasTextInput() && this.expanded && !(document.activeElement === this.listboxElement);
  }
  shiftTabFromFilterListbox(t) {
    return t.shiftKey && this.hasTextInput() && document.activeElement === this.listboxElement;
  }
  emitCreateOption() {
    this.guxcreateoption.emit(this.textInput), (this.textInput = ''), (this.textInputElement.value = '');
  }
  canCreateNewOption() {
    return this.hasCreate && this.textInput && !this.listboxElement.hasExactMatch;
  }
  isActiveElement() {
    return document.activeElement === this.root;
  }
  activeElementNotListbox() {
    return document.activeElement !== this.listboxElement;
  }
  filterKeydown(t) {
    if ('ArrowDown' === t.key) return t.stopImmediatePropagation(), void this.listboxElement.focus();
  }
  filterKeyup(t) {
    ' ' !== t.key || t.preventDefault();
  }
  collapseListbox(t) {
    this.expanded && (this.expanded = !1), 'focusFieldButton' === t && this.fieldButtonElement.focus();
  }
  updateValue(t) {
    this.value !== t && ((this.value = t), l(this.root, 'input'), l(this.root, 'change'));
  }
  getTypeaheadText(t) {
    var e;
    const i = t.length;
    if (i > 0 && !this.loading) {
      const s = h(this.listboxElement, t);
      if (s && 'custom' !== this.filterType) {
        const t = null === (e = s.querySelector('[gux-slot-container]')) || void 0 === e ? void 0 : e.textContent;
        return null == t ? void 0 : t.substring(i);
      }
      return '';
    }
  }
  renderTargetDisplay() {
    return s(
      'div',
      { class: 'gux-placeholder' },
      this.placeholder || this.i18n('noSelection'),
      this.getSrSelectedText(),
    );
  }
  getSrSelectedText() {
    const t = this.getOptionElementByValue(this.value);
    if (null == t ? void 0 : t.length)
      return s('span', { class: 'gux-sr-only' }, this.i18n('numberSelected', { numberSelected: t.length.toString() }));
  }
  getInputAriaLabel() {
    return this.canCreateNewOption() && this.isActiveElement()
      ? this.i18n('pressEnterToCreate', { textInputValue: this.textInput })
      : this.i18n('textInputResults');
  }
  renderTag() {
    const t = this.getOptionElementByValue(this.value);
    if (null == t ? void 0 : t.length)
      return s('gux-dropdown-multi-tag', { disabled: this.disabled, 'number-selected': t.length });
  }
  renderFilterInputField() {
    if (this.expanded && this.hasTextInput())
      return s(
        'div',
        { class: 'gux-field gux-input-field' },
        s(
          'div',
          { class: 'gux-field-content' },
          s(
            'div',
            { class: 'gux-filter' },
            s(
              'div',
              { class: 'gux-filter-display' },
              s('span', { class: 'gux-filter-text' }, this.textInput),
              s('span', { class: 'gux-filter-suggestion' }, this.getTypeaheadText(this.textInput)),
            ),
            s(
              'div',
              { class: 'input-and-dropdown-button' },
              s('input', {
                onClick: this.fieldButtonInputClick.bind(this),
                placeholder: this.placeholder || this.i18n('noSelection'),
                class: 'gux-filter-input',
                type: 'text',
                'aria-label': this.getInputAriaLabel(),
                ref: t => (this.textInputElement = t),
                onInput: this.filterInput.bind(this),
                onKeyDown: this.filterKeydown.bind(this),
                onKeyUp: this.filterKeyup.bind(this),
              }),
            ),
          ),
        ),
      );
  }
  renderPopup() {
    return s('div', { slot: 'popup', class: 'gux-listbox-container' }, s('slot', null));
  }
  renderTarget() {
    return s(
      'div',
      {
        class: {
          'gux-target-container': !0,
          'gux-target-container-expanded': this.expanded && this.hasTextInput(),
          'gux-target-container-collapsed': !(this.expanded && this.hasTextInput()),
          'gux-error': this.hasError,
        },
        slot: 'target',
      },
      this.renderFilterInputField(),
      s(
        'button',
        {
          type: 'button',
          class: 'gux-field gux-field-button',
          disabled: this.disabled,
          onClick: this.fieldButtonClick.bind(this),
          ref: t => (this.fieldButtonElement = t),
          'aria-haspopup': 'listbox',
          'aria-expanded': this.expanded.toString(),
        },
        this.renderTargetContent(),
        this.renderTag(),
        this.renderRadialLoading(),
        s('gux-icon', {
          class: { 'gux-expand-icon': !0 },
          'screenreader-text': this.i18n('dropdown'),
          iconName: 'chevron-small-down',
        }),
      ),
    );
  }
  renderTargetContent() {
    if (!this.expanded || !this.hasTextInput())
      return s('div', { class: 'gux-field-content' }, this.renderTargetDisplay());
  }
  renderRadialLoading() {
    if (this.loading && !this.expanded) return s('gux-radial-loading', { context: 'input' });
  }
  render() {
    return [
      s(
        'div',
        { class: 'gux-dropdown-container' },
        s(
          'gux-popup-beta',
          { expanded: this.expanded && (!this.loading || this.isFilterable()), disabled: this.disabled },
          this.renderTarget(),
          this.renderPopup(),
        ),
      ),
    ];
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return n(this);
  }
  static get watchers() {
    return { expanded: ['focusSelectedItemAfterRender'], value: ['watchValue'], textInput: ['handleFilter'] };
  }
};
g([c({ childList: !0, subtree: !0 })], p.prototype, 'onMutation', null),
  g([o({ triggerEvents: 'mousedown' })], p.prototype, 'onClickOutside', null),
  (p.style =
    ':host{color:#2e394c}.gux-dropdown-container{position:relative}.gux-error.gux-target-container-collapsed .gux-field-button,.gux-error.gux-target-container-expanded{border-color:#ea0b0b}.gux-field,.gux-target-container-expanded{all:unset;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:6px 0 6px 6px;font-family:inherit;font-size:12px;line-height:1.6667;cursor:pointer;background-color:#f6f7f9}.gux-field.gux-input-field{height:30px;cursor:text}.gux-field .gux-field-content{position:relative;display:flex;flex:1 1 0;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;min-width:0;height:100%}.gux-field .gux-field-content .gux-filter,.gux-field .gux-field-content .gux-selected-option,.gux-field .gux-field-content .gux-placeholder{flex:1 1 auto;align-self:auto;order:0;padding-left:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gux-field .gux-field-content .gux-filter .gux-sr-only:not(:focus):not(:active),.gux-field .gux-field-content .gux-selected-option .gux-sr-only:not(:focus):not(:active),.gux-field .gux-field-content .gux-placeholder .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-field .gux-field-content .gux-filter{position:relative;height:100%;padding-left:0}.gux-field .gux-field-content .gux-filter .gux-filter-input{all:unset;width:100%;color:transparent;caret-color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display{white-space:pre}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-text{color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-suggestion{color:#596373}.gux-field .gux-field-content .gux-filter .gux-filter-input,.gux-field .gux-field-content .gux-filter .gux-filter-display{position:absolute}.gux-field .gux-field-content .gux-placeholder{color:#596373}.gux-field .gux-expand-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;padding:0 8px;color:#596373}.gux-target-container-expanded{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-expanded:focus-visible,.gux-target-container-expanded:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target-container-expanded .gux-filter-input{background-color:inherit;border:none}.gux-target-container-expanded .gux-filter-input:focus{border:none;outline:none}.gux-target-container-expanded .gux-field-button{width:auto;height:30px;padding:0 0 0 8px;margin:0;background:inherit;border:none;outline:none;box-shadow:none}.gux-target-container-expanded .gux-field-button:focus{outline:none}.gux-target-container-collapsed .gux-field-button{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-collapsed .gux-field-button:focus-visible,.gux-target-container-collapsed .gux-field-button:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-listbox-container{box-sizing:border-box;margin:0;color:#2e394c}.gux-error-message-container{display:none;margin:4px 0}.gux-error-message-container.gux-show{display:flex}');
export { p as gux_dropdown_multi_beta };

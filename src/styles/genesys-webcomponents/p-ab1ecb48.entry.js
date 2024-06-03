import { r as t, c as i, f as e, h as s, g as o, H as n } from './p-9031eb6a.js';
import { O as r } from './p-23975bfb.js';
import { b as a } from './p-54ad2682.js';
import { s as l } from './p-d176c2ae.js';
import { o as d, c as h } from './p-3f5341ea.js';
import { b as u } from './p-091f51f6.js';
import { t as c } from './p-6a46bf1b.js';
import { O as x } from './p-f222d4b1.js';
import {
  k as g,
  g as p,
  s as f,
  c as b,
  a as v,
  b as m,
  h as w,
  d as y,
  e as F,
  f as j,
  i as k,
  j as L,
  m as E,
  o as C,
} from './p-55cf6d81.js';
import { w as O } from './p-76ff3e75.js';
import { r as T } from './p-cbcbd1bb.js';
import './p-8a133b9b.js';
const A = { filterResults: 'Type to filter dropdown results', noSelection: 'Select...', dropdown: 'Dropdown' };
var I = function (t, i, e, s) {
  var o,
    n = arguments.length,
    r = n < 3 ? i : null === s ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, i, e, s);
  else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(i, e, r) : o(i, e)) || r);
  return n > 3 && r && Object.defineProperty(i, e, r), r;
};
const S = class {
  constructor(e) {
    t(this, e),
      (this.guxexpanded = i(this, 'guxexpanded', 7)),
      (this.guxcollapsed = i(this, 'guxcollapsed', 7)),
      (this.guxfilter = i(this, 'guxfilter', 7)),
      (this.value = void 0),
      (this.disabled = !1),
      (this.required = !1),
      (this.loading = !1),
      (this.placeholder = void 0),
      (this.filterable = !1),
      (this.filterType = 'none'),
      (this.hasError = !1),
      (this.expanded = !1),
      (this.filter = '');
  }
  watchExpanded(t) {
    t || (this.filter = '');
  }
  watchValue(t) {
    this.validateValue(t, this.listboxElement);
  }
  handleFilter(t) {
    this.guxfilter.emit(t);
  }
  onKeydown(t) {
    switch (t.key) {
      case 'Escape':
        return this.isFilterable() && document.activeElement === this.listboxElement
          ? this.filterElement.focus()
          : void this.collapseListbox('focusFieldButton');
      case 'Tab':
        return this.shiftTabFromFilterListbox(t)
          ? (t.preventDefault(), this.filterElement.focus())
          : this.shiftTabFromExpandedFilterInput(t)
          ? (t.preventDefault(), this.collapseListbox('focusFieldButton'))
          : void this.collapseListbox('noFocusChange');
      case 'ArrowDown':
        return void (this.activeElementNotListbox() && (t.preventDefault(), (this.expanded = !0)));
    }
  }
  onInternallistboxoptionsupdated(t) {
    t.stopPropagation(), e(this.root);
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
  onMutation() {
    var t;
    this.listboxElement ||
      ((this.listboxElement = null === (t = this.root) || void 0 === t ? void 0 : t.querySelector('gux-listbox')),
      this.applyListboxEventListeners());
  }
  onInternalExpanded(t) {
    t.stopPropagation(),
      this.guxexpanded.emit(),
      this.listboxElement &&
        u(() => {
          this.listboxElement.focus(), this.isFilterable() && this.filterElement && this.filterElement.focus();
        });
  }
  onInternalCollapsed(t) {
    t.stopPropagation(), this.guxcollapsed.emit();
  }
  connectedCallback() {
    var t;
    (this.listboxElement = null === (t = this.root) || void 0 === t ? void 0 : t.querySelector('gux-listbox')),
      this.listboxElement && this.validateValue(this.value, this.listboxElement);
  }
  async componentWillLoad() {
    c(this.root),
      (this.i18n = await a(this.root, A)),
      d(this.root, () => {
        e(this.root);
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
      (this.listboxElement.filter = this.filter));
  }
  showTooltip() {
    var t;
    null === (t = this.truncateElement) || void 0 === t || t.setShowTooltip();
  }
  hideTooltip() {
    var t;
    null === (t = this.truncateElement) || void 0 === t || t.setHideTooltip();
  }
  validateValue(t, i) {
    void 0 !== t ? this.getOptionElementByValue(t) && (i.value = t) : i && (i.value = t);
  }
  applyListboxEventListeners() {
    var t, i;
    null === (t = this.listboxElement) ||
      void 0 === t ||
      t.addEventListener('input', t => {
        t.stopPropagation(), this.updateValue(t.target.value);
      }),
      null === (i = this.listboxElement) ||
        void 0 === i ||
        i.addEventListener('change', t => {
          t.stopPropagation();
        });
  }
  stopPropagationOfInternalFocusEvents(t) {
    if (this.root.contains(t.relatedTarget)) return t.stopImmediatePropagation();
  }
  isFilterable() {
    return this.filterable || 'starts-with' === this.filterType || 'custom' === this.filterType;
  }
  get optionElements() {
    return g(this.listboxElement);
  }
  getOptionElementByValue(t) {
    return this.optionElements.find(i => i.value === t);
  }
  fieldButtonClick() {
    this.expanded = !this.expanded;
  }
  filterInput(t) {
    t.stopPropagation(), (this.filter = this.filterElement.value);
  }
  shiftTabFromExpandedFilterInput(t) {
    return t.shiftKey && this.isFilterable() && this.expanded && !(document.activeElement === this.listboxElement);
  }
  shiftTabFromFilterListbox(t) {
    return t.shiftKey && this.isFilterable() && document.activeElement === this.listboxElement;
  }
  activeElementNotListbox() {
    return document.activeElement !== this.listboxElement;
  }
  filterKeydown(t) {
    switch (t.key) {
      case 'ArrowDown':
        return t.stopImmediatePropagation(), void this.listboxElement.focus();
      case 'Enter':
        return this.listboxElement.guxSelectActive(), void t.preventDefault();
    }
  }
  filterKeyup(t) {
    ' ' !== t.key || t.preventDefault();
  }
  collapseListbox(t) {
    this.expanded && (this.expanded = !1), 'focusFieldButton' === t && this.fieldButtonElement.focus();
  }
  updateValue(t) {
    this.value !== t && ((this.value = t), l(this.root, 'input'), l(this.root, 'change')),
      this.collapseListbox('focusFieldButton');
  }
  getTypeaheadText(t) {
    const i = t.length;
    if (i > 0 && !this.loading) {
      const e = p(this.listboxElement, t);
      if (e && 'custom' !== this.filterType) return e.textContent.trim().substring(i);
    }
    return '';
  }
  renderTargetDisplay() {
    const t = this.getOptionElementByValue(this.value);
    return t
      ? s('div', { class: 'gux-selected-option' }, this.renderSelectedItem(t))
      : s('div', { class: 'gux-placeholder' }, this.placeholder || this.i18n('noSelection'));
  }
  renderSelectedItem(t) {
    const i = t.tagName.toLowerCase();
    switch (i) {
      case 'gux-option':
        return s('gux-truncate-beta', { ref: t => (this.truncateElement = t) }, t.textContent);
      case 'gux-option-icon':
        return this.renderIconOption(t);
      default:
        return i;
    }
  }
  renderIconOption(t) {
    let i = null;
    return (
      null !== t.iconColor && (i = { color: t.iconColor }),
      s(
        'span',
        { class: 'gux-selected-icon' },
        s('gux-icon', { 'icon-name': t.iconName, style: i, decorative: !0 }),
        s('gux-truncate-beta', { ref: t => (this.truncateElement = t) }, t.textContent),
      )
    );
  }
  renderFilterInputField() {
    if (this.expanded && this.isFilterable())
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
              s('span', { class: 'gux-filter-text' }, this.filter),
              s('span', { class: 'gux-filter-suggestion' }, this.getTypeaheadText(this.filter)),
            ),
            s(
              'div',
              { class: 'input-and-dropdown-button' },
              s('input', {
                onClick: this.fieldButtonClick.bind(this),
                class: 'gux-filter-input',
                type: 'text',
                'aria-label': this.i18n('filterResults'),
                ref: t => (this.filterElement = t),
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
          'gux-target-container-expanded': this.expanded && this.isFilterable(),
          'gux-target-container-collapsed': !(this.expanded && this.isFilterable()),
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
          disabled: h(this.root),
          onClick: this.fieldButtonClick.bind(this),
          onFocusin: this.showTooltip.bind(this),
          onFocusout: this.hideTooltip.bind(this),
          ref: t => (this.fieldButtonElement = t),
          'aria-haspopup': 'listbox',
          'aria-expanded': this.expanded.toString(),
        },
        this.renderTargetContent(),
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
    if (!this.expanded || !this.isFilterable())
      return s('div', { class: 'gux-field-content' }, this.renderTargetDisplay());
  }
  renderRadialLoading() {
    if (this.loading && !this.expanded) return s('gux-radial-loading', { context: 'input' });
  }
  render() {
    return s(
      'gux-popup-beta',
      { expanded: this.expanded && (!this.loading || this.isFilterable()), disabled: this.disabled },
      this.renderTarget(),
      this.renderPopup(),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return o(this);
  }
  static get watchers() {
    return { expanded: ['watchExpanded'], value: ['watchValue'], filter: ['handleFilter'] };
  }
};
I([r({ triggerEvents: 'mousedown' })], S.prototype, 'onClickOutside', null),
  I([x({ childList: !0, subtree: !0 })], S.prototype, 'onMutation', null),
  (S.style =
    ':host{color:#2e394c}.gux-field,.gux-target-container-expanded{all:unset;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:6px 8px;font-family:inherit;font-size:12px;line-height:1.6667;cursor:pointer;background-color:#f6f7f9}.gux-error.gux-target-container-collapsed .gux-field-button,.gux-error.gux-target-container-expanded{border-color:#ea0b0b}.gux-field.gux-input-field{height:30px}.gux-field .gux-field-content{--gux-zindex-tooltip:3;display:flex;flex:1 1 0;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;min-width:0;height:100%}.gux-field .gux-field-content .gux-filter,.gux-field .gux-field-content .gux-selected-option,.gux-field .gux-field-content .gux-placeholder{flex:1 1 auto;align-self:auto;order:0;padding:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gux-field .gux-field-content .gux-filter{position:relative;height:100%}.gux-field .gux-field-content .gux-filter .gux-filter-input{all:unset;width:100%;color:transparent;caret-color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display{white-space:pre}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-text{color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-suggestion{color:#596373}.gux-field .gux-field-content .gux-filter .gux-filter-input,.gux-field .gux-field-content .gux-filter .gux-filter-display{position:absolute}.gux-field .gux-field-content .gux-placeholder{color:#596373}.gux-field .gux-expand-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;padding-left:8px;color:#596373}.gux-target-container-expanded{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-expanded:focus-visible,.gux-target-container-expanded:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target-container-expanded .gux-filter-input{background-color:inherit;border:none}.gux-target-container-expanded .gux-filter-input:focus{border:none;outline:none}.gux-target-container-expanded .gux-field-button{width:auto;height:30px;padding:0 0 0 8px;margin:0;background:inherit;border:none;outline:none;box-shadow:none}.gux-target-container-expanded .gux-field-button:focus{outline:none}.gux-target-container-collapsed .gux-field-button{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-collapsed .gux-field-button:focus-visible,.gux-target-container-collapsed .gux-field-button:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-listbox-container{box-sizing:border-box;margin:0;color:#2e394c}.gux-selected-icon{display:flex;align-items:center}.gux-selected-icon gux-icon{width:16px;height:16px;padding-right:8px}');
const B = ['gux-option', 'gux-option-icon'].join(','),
  R = { noMatches: 'No matches', loading: 'Loading...' },
  z = class {
    constructor(e) {
      t(this, e),
        (this.internallistboxoptionsupdated = i(this, 'internallistboxoptionsupdated', 7)),
        (this.value = void 0),
        (this.loading = !1),
        (this.filter = ''),
        (this.filterType = 'none'),
        (this.emptyMessage = void 0),
        (this.selectedValues = []),
        (this.listboxOptions = []),
        (this.allListboxOptionsFiltered = void 0);
    }
    onFocus() {
      f(this.root);
    }
    onBlur() {
      b(this.root);
    }
    onKeydown(t) {
      switch (t.key) {
        case 'Enter':
          return t.preventDefault(), void k(this.root, t => this.updateValue(t));
        case 'ArrowDown':
          return t.preventDefault(), void (F(this.root) ? (t.stopPropagation(), j(this.root)) : m(this.root));
        case 'ArrowUp':
          return t.preventDefault(), void (w(this.root) ? (t.stopPropagation(), y(this.root)) : v(this.root));
        case 'Home':
          return t.preventDefault(), void m(this.root);
        case 'End':
          return t.preventDefault(), void v(this.root);
        case ' ':
          return void t.preventDefault();
      }
      1 !== t.key.length || L(this.root, t.key);
    }
    onKeyup(t) {
      ' ' !== t.key || k(this.root, t => this.updateValue(t));
    }
    onMousemove() {
      b(this.root);
    }
    onClick(t) {
      O(B, t, t => {
        C(t, t => this.updateValue(t));
      });
    }
    async guxSelectActive() {
      k(this.root, t => this.updateValue(t));
    }
    setListboxOptions() {
      this.value && (this.selectedValues = this.value.split(',')),
        (this.listboxOptions = Array.from(this.root.children)),
        this.internallistboxoptionsupdated.emit();
    }
    updateValue(t) {
      this.value !== t && (this.value = t), l(this.root, 'input'), l(this.root, 'change');
    }
    async componentWillLoad() {
      c(this.root), (this.i18n = await a(this.root, R)), this.setListboxOptions();
    }
    componentWillRender() {
      this.listboxOptions.forEach(t => {
        (t.selected = t.value === this.value), 'custom' !== this.filterType && (t.filtered = !E(t, this.filter));
      }),
        (this.allListboxOptionsFiltered = 0 === this.listboxOptions.filter(t => !t.filtered).length),
        !this.allListboxOptionsFiltered && this.filter ? m(this.root) : b(this.root);
    }
    renderHiddenSlot() {
      return s('div', { hidden: !0 }, s('slot', { onSlotchange: () => this.setListboxOptions() }));
    }
    renderLoading() {
      return [
        s(
          'div',
          { class: 'gux-message-container' },
          s('gux-radial-loading', { context: 'modal' }),
          s('span', null, this.i18n('loading')),
        ),
        this.renderHiddenSlot(),
      ];
    }
    renderAllListboxOptionsFiltered() {
      return [
        s(
          'div',
          { class: 'gux-message-container' },
          s('div', { class: 'gux-no-matches' }, this.emptyMessage || this.i18n('noMatches')),
        ),
        this.renderHiddenSlot(),
      ];
    }
    render() {
      return this.loading
        ? this.renderLoading()
        : this.allListboxOptionsFiltered
        ? this.renderAllListboxOptionsFiltered()
        : s(n, { role: 'listbox', tabindex: 0 }, s('slot', { onSlotchange: () => this.setListboxOptions() }));
    }
    get root() {
      return o(this);
    }
  };
z.style =
  ':host{box-sizing:border-box;display:block;max-height:20rem;padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;outline:none}:host(:focus){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-message-container{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}.gux-message-container .gux-no-matches{box-sizing:border-box;height:32px;padding:8px 16px;color:#2e394c}';
const D = class {
  constructor(i) {
    t(this, i),
      (this.value = void 0),
      (this.active = !1),
      (this.selected = !1),
      (this.disabled = !1),
      (this.filtered = !1),
      (this.hovered = !1);
  }
  onmouseenter() {
    this.hovered = !0;
  }
  onMouseleave() {
    this.hovered = !1;
  }
  handleActive(t) {
    var i, e;
    t
      ? null === (i = this.truncateElement) || void 0 === i || i.setShowTooltip()
      : null === (e = this.truncateElement) || void 0 === e || e.setHideTooltip();
  }
  componentWillLoad() {
    this.root.id = this.root.id || T('gux-option');
  }
  getAriaSelected() {
    return !this.disabled && (this.selected ? 'true' : 'false');
  }
  render() {
    return s(
      n,
      {
        role: 'option',
        class: {
          'gux-active': this.active,
          'gux-disabled': this.disabled,
          'gux-filtered': this.filtered,
          'gux-hovered': this.hovered,
          'gux-selected': this.selected,
        },
        'aria-selected': this.getAriaSelected(),
        'aria-disabled': this.disabled.toString(),
      },
      s('gux-truncate-beta', { ref: t => (this.truncateElement = t) }, s('slot', null)),
    );
  }
  get root() {
    return o(this);
  }
  static get watchers() {
    return { active: ['handleActive'] };
  }
};
D.style =
  'gux-option{box-sizing:border-box;display:flex;height:32px;padding:6px 8px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-option.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option.gux-selected{background:#deeaff}gux-option.gux-active,gux-option.gux-hovered:not(:disabled){color:#fdfdfd;background:#2a60c8}gux-option.gux-filtered{display:none}gux-option .gux-slot-container{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}';
export { S as gux_dropdown, z as gux_listbox, D as gux_option };

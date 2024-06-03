import { r as t, c as s, h as i, H as e, g as o } from './p-9031eb6a.js';
import {
  s as n,
  c as a,
  a as h,
  b as r,
  h as d,
  d as l,
  e as c,
  f as u,
  i as p,
  j as g,
  o as x,
} from './p-55cf6d81.js';
import { b as m } from './p-54ad2682.js';
import { w as f } from './p-76ff3e75.js';
import { s as b } from './p-d176c2ae.js';
import { t as v } from './p-6a46bf1b.js';
import { b as w } from './p-091f51f6.js';
import './p-8a133b9b.js';
const O = { add: 'Add {name}', noMatches: 'No matches', loading: 'Loading...' },
  j = class {
    constructor(i) {
      t(this, i),
        (this.internallistboxoptionsupdated = s(this, 'internallistboxoptionsupdated', 7)),
        (this.value = void 0),
        (this.loading = !1),
        (this.filter = ''),
        (this.textInput = ''),
        (this.filterType = 'none'),
        (this.emptyMessage = void 0),
        (this.listboxOptions = []),
        (this.allListboxOptionsFiltered = void 0),
        (this.hasExactMatch = !1);
    }
    onFocus() {
      n(this.root);
    }
    onBlur() {
      a(this.root);
    }
    selectNewCustomOption(t) {
      this.updateValue(t.detail);
    }
    onKeydown(t) {
      var s;
      switch (t.key) {
        case 'Enter':
          return (
            t.preventDefault(),
            void ((null === (s = this.optionCreateElement) || void 0 === s ? void 0 : s.active)
              ? (this.optionCreateElement.guxEmitInternalCreateNewOption(),
                w(() => {
                  n(this.root);
                }))
              : p(this.root, t => this.updateValue(t)))
          );
        case 'ArrowDown':
          return t.preventDefault(), void (c(this.root) ? (t.stopPropagation(), u(this.root)) : r(this.root));
        case 'ArrowUp':
          return t.preventDefault(), void (d(this.root) ? (t.stopPropagation(), l(this.root)) : h(this.root));
        case 'Home':
          return t.preventDefault(), void r(this.root);
        case 'End':
          return t.preventDefault(), void h(this.root);
        case ' ':
          return void t.preventDefault();
      }
      1 !== t.key.length || g(this.root, t.key);
    }
    onKeyup(t) {
      var s;
      ' ' !== t.key ||
        ((null === (s = this.optionCreateElement) || void 0 === s ? void 0 : s.active)
          ? (this.optionCreateElement.guxEmitInternalCreateNewOption(),
            w(() => {
              n(this.root);
            }))
          : p(this.root, t => this.updateValue(t)));
    }
    onMousemove() {
      a(this.root);
    }
    onClick(t) {
      f('gux-option-multi', t, t => {
        x(t, t => this.updateValue(t));
      });
    }
    async guxSelectActive() {
      p(this.root, t => this.updateValue(t));
    }
    getHasExactMatch() {
      let t = !1;
      return (
        (this.hasExactMatch = !1),
        this.listboxOptions.forEach(s => {
          var i, e, o;
          (null ===
            (o =
              null ===
                (e = null === (i = s.querySelector('[gux-slot-container]')) || void 0 === i ? void 0 : i.textContent) ||
              void 0 === e
                ? void 0
                : e.toLowerCase()) || void 0 === o
            ? void 0
            : o.trim()) == this.textInput.toLowerCase().trim() && ((t = !0), (this.hasExactMatch = !0));
        }),
        t
      );
    }
    updateOptionMultiCreateValue() {
      this.optionCreateElement &&
        ((this.optionCreateElement.value = this.textInput),
        (this.optionCreateElement.filtered = !this.textInput || this.getHasExactMatch()));
    }
    getSelectedValues() {
      return this.value ? this.value.split(',') : [];
    }
    updateOnSlotChange() {
      this.setListboxOptions(), this.updateListboxOptions(), n(this.root);
    }
    getOptionCreateElement() {
      this.optionCreateElement = this.root.querySelector('gux-create-option');
    }
    setListboxOptions() {
      (this.listboxOptions = Array.from(this.root.children).filter(t => 'GUX-OPTION-MULTI' === t.tagName)),
        this.internallistboxoptionsupdated.emit();
    }
    updateListboxOptions() {
      this.listboxOptions.forEach(t => {
        (t.selected = this.getSelectedValues().includes(t.value)),
          'custom' !== this.filterType &&
            (t.filtered = !t.textContent.toLowerCase().startsWith(this.textInput.toLowerCase()));
      });
    }
    updateValue(t) {
      if (this.getSelectedValues().includes(t))
        this.value = this.getSelectedValues()
          .filter(s => s !== t)
          .join(',');
      else {
        const s = [...this.getSelectedValues(), t];
        this.value = s.join(',');
      }
      b(this.root, 'input'), b(this.root, 'change');
    }
    async componentWillLoad() {
      v(this.root), (this.i18n = await m(this.root, O)), this.setListboxOptions(), this.getOptionCreateElement();
    }
    componentWillRender() {
      this.setListboxOptions(),
        this.updateListboxOptions(),
        (this.allListboxOptionsFiltered = 0 === this.listboxOptions.filter(t => !t.filtered).length);
    }
    renderHiddenSlot() {
      return i('div', { hidden: !0 }, i('slot', { onSlotchange: () => this.setListboxOptions() }));
    }
    renderLoading() {
      return [
        i(
          'div',
          { class: 'gux-message-container' },
          i('gux-radial-loading', { context: 'modal' }),
          i('span', null, this.i18n('loading')),
        ),
        this.renderHiddenSlot(),
      ];
    }
    renderAllListboxOptionsFiltered() {
      if (this.allListboxOptionsFiltered)
        return [
          i(
            'div',
            { class: 'gux-message-container' },
            i('div', { class: 'gux-no-matches' }, this.emptyMessage || this.i18n('noMatches')),
          ),
          this.renderHiddenSlot(),
        ];
    }
    renderCreateOptionSlot() {
      return i('slot', { name: 'create' });
    }
    render() {
      return this.loading
        ? this.renderLoading()
        : i(
            e,
            { role: 'listbox', 'aria-multiselectable': 'true', tabindex: 0 },
            i('slot', { onSlotchange: () => this.updateOnSlotChange() }),
            this.renderAllListboxOptionsFiltered(),
            this.renderCreateOptionSlot(),
          );
    }
    get root() {
      return o(this);
    }
    static get watchers() {
      return { textInput: ['updateOptionMultiCreateValue'] };
    }
  };
j.style =
  ':host{box-sizing:border-box;display:block;max-height:20rem;padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;outline:none}:host(:focus-visible){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-message-container{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}.gux-message-container .gux-no-matches{box-sizing:border-box;height:32px;padding:8px 16px;color:#2e394c}';
export { j as gux_listbox_multi };

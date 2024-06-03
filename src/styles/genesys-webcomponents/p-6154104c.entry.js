import { r as t, h as e, g as a } from './p-9031eb6a.js';
import { m as l } from './p-5ac4e2cf.js';
import { b as g } from './p-54ad2682.js';
import { t as i } from './p-6a46bf1b.js';
import './p-8a133b9b.js';
const m = {
  recentSearch: 'Recently Searched:',
  commonSearch: 'Common Searches:',
  limited: 'Results limited, refine your search for more commands.',
  search: 'Search for commands.',
  title: 'Command Palette',
};
function c(t) {
  return t.sort((t, e) => {
    if (t.recent && !e.recent) return -1;
    if (!t.recent && e.recent) return 1;
    const a = t.text.toUpperCase(),
      l = e.text.toUpperCase();
    return a < l ? -1 : a > l ? 1 : 0;
  });
}
const u = class {
  constructor(e) {
    t(this, e), (this.filterValue = ''), (this.visible = !1);
  }
  async componentWillLoad() {
    i(this.root), (this.i18n = await g(this.root, m));
  }
  render() {
    return e(
      'div',
      {
        class: 'gux-command-palette ' + (this.visible ? '' : 'gux-hidden'),
        role: 'dialog',
        onKeyDown: t => this.onKeyDown(t),
        'aria-label': this.i18n('title'),
      },
      e(
        'label',
        { htmlFor: 'gux-command-palette-search', class: 'gux-command-palette-search-label' },
        this.i18n('search'),
      ),
      e(
        'gux-input-search',
        null,
        e('input', {
          id: 'gux-command-palette-search',
          type: 'search',
          onInput: t => {
            this.handleInput(t);
          },
          value: this.filterValue,
          ref: t => (this.inputElement = t),
        }),
      ),
      this.visible && this.renderLists(),
    );
  }
  renderLists() {
    const t = Array.from(this.root.children).slice(0, -1),
      a = t.filter(t => t.recent),
      l = t.filter(t => t.common);
    let g,
      i = this.filterItems(t);
    if (
      (l.length && (g = this.createList(l, this.filterValue, this.i18n('commonSearch'))), this.filterValue && i.length)
    ) {
      const t = i.length > 50;
      t && (i = i.slice(0, 50));
      const a = [e('gux-list-legacy', { tabindex: '-1', highlight: this.filterValue }, i)];
      return (
        t && a.unshift(e('div', { class: 'gux-limit' }, this.i18n('limited'))), 1 !== i.length && l.length ? [a, g] : a
      );
    }
    const m = [];
    return (
      a.length && !this.filterValue && m.push(this.createList(a, this.filterValue, this.i18n('recentSearch'))),
      g && m.push(g),
      m.length ? m : e('gux-list-legacy', { tabindex: '-1' }, this.transformCommands(c(t)))
    );
  }
  async open() {
    (this.visible = !0),
      setTimeout(() => {
        this.inputElement.focus();
      }, 300);
  }
  async close() {
    (this.filterValue = ''), (this.visible = !1);
  }
  handleInput(t) {
    this.filterValue = t.target.value;
  }
  filterItems(t) {
    return this.transformCommands(c(t.filter(t => l(this.filterValue, `${t.text} + ${t.details}`))), '');
  }
  createShortcutItem(t) {
    return e(
      'gux-list-item-legacy',
      { value: t.text, onPress: this.handlePress(t), class: t.details ? 'gux-has-details' : '' },
      e(
        'div',
        null,
        e('gux-text-highlight', { text: t.text, strategy: 'fuzzy' }),
        e('span', { class: 'gux-shortcut' }, t.shortcut),
      ),
      t.details && e('gux-text-highlight', { class: 'gux-details', text: t.details, strategy: 'fuzzy' }),
    );
  }
  createStandardItem(t) {
    return e(
      'gux-list-item-legacy',
      { value: t.text, onPress: this.handlePress(t), class: t.details ? 'gux-has-details' : '' },
      e('gux-text-highlight', { text: t.text, strategy: 'fuzzy' }),
      t.details && e('gux-text-highlight', { class: 'gux-details', text: t.details, strategy: 'fuzzy' }),
    );
  }
  transformCommands(t, a) {
    const l = [];
    return (
      a && l.push(e('strong', null, a)),
      t.forEach(t => {
        l.push(t.shortcut ? this.createShortcutItem(t) : this.createStandardItem(t));
      }),
      l
    );
  }
  handlePress(t) {
    return () => {
      this.close(),
        setTimeout(() => {
          t.invokePress();
        });
    };
  }
  createList(t, a, l) {
    return e(
      'gux-list-legacy',
      { class: 'gux-command-palette-list', highlight: a, tabindex: '-1' },
      this.transformCommands(c(t), l),
    );
  }
  onKeyDown(t) {
    switch (t.key) {
      case 'ArrowUp':
        t.preventDefault(), this.navigateUp();
        break;
      case 'ArrowDown':
        t.preventDefault(), this.navigateDown();
    }
  }
  elementIsSearch(t) {
    return null !== t.closest('gux-input-search');
  }
  getParentGuxList(t) {
    return t.closest('gux-list-legacy');
  }
  setFocusOnElement(t) {
    t && t.setFocusOnLastItem ? t.setFocusOnLastItem() : this.inputElement.focus();
  }
  navigateUp() {
    const t = this.root.querySelector(':focus');
    if (this.elementIsSearch(t)) return;
    const e = this.getParentGuxList(t);
    e &&
      e.isFirstItemSelected().then(t => {
        t && this.setFocusOnElement(e.previousElementSibling);
      });
  }
  navigateDown() {
    const t = this.root.querySelector(':focus');
    if (this.elementIsSearch(t)) return void this.root.querySelector('gux-list-legacy').setFocusOnFirstItem();
    const e = this.getParentGuxList(t);
    e &&
      e.isLastItemSelected().then(t => {
        t && this.setFocusOnElement(e.nextElementSibling);
      });
  }
  get root() {
    return a(this);
  }
};
u.style =
  "gux-command-palette-legacy .gux-command-palette{position:absolute;right:0;left:0;max-width:750px;padding:12px;margin:0 auto;border-color:1px solid #e2e6ee;box-shadow:0 0 2px 0 rgba(32, 41, 55, 0.24);}gux-command-palette-legacy .gux-command-palette .gux-command-palette-search-label{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}gux-command-palette-legacy .gux-command-palette.gux-hidden{top:0;display:none}gux-command-palette-legacy .gux-command-palette:not(.gux-hidden){top:40px;animation-name:fadeIn;animation-duration:300ms;animation-timing-function:ease-in;animation-iteration-count:1}@keyframes fadeIn{0%{top:0;opacity:0}100%{top:40px;opacity:1}}gux-command-palette-legacy .gux-command-palette .gux-limit{margin-bottom:8px}gux-command-palette-legacy .gux-command-palette gux-list-legacy{display:block;margin-top:4px}gux-command-palette-legacy .gux-command-palette gux-list-legacy>strong{height:32px;padding:0 16px;line-height:32px}gux-command-palette-legacy .gux-command-palette gux-text-field,gux-command-palette-legacy .gux-command-palette gux-list-legacy>div[role='list']{margin-bottom:12px}gux-command-palette-legacy .gux-command-palette gux-list-legacy+gux-list-legacy{margin-bottom:0}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy.gux-has-details .gux-list-item{line-height:16px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item{display:block;line-height:32px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item gux-text-highlight,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-shortcut{display:block}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item div{display:flex;padding:0;border:none;box-shadow:none}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item div gux-text-highlight{flex:1 1 auto}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item div .gux-shortcut{flex:0 1 auto}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item gux-text-highlight:last-child{margin-bottom:8px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{margin-left:4px;font-size:11px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:last-of-type .gux-details,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:last-of-type div:last-child{margin-bottom:0}.gux-command-palette-light-theme .gux-command-palette{color:#2e394c;background:#fdfdfd}.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item div,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item .gux-details,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}.gux-light-theme gux-command-palette-legacy .gux-command-palette{color:#2e394c;background:#fdfdfd}.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item div,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item .gux-details,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}gux-command-palette-legacy.gux-light-theme .gux-command-palette{color:#2e394c;background:#fdfdfd}gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item div,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item .gux-details,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}gux-command-palette-legacy .gux-command-palette{color:#2e394c;background:#fdfdfd}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item div,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus-visible .gux-list-item .gux-details,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}";
export { u as gux_command_palette_legacy };

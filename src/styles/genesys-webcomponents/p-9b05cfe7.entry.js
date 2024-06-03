import { r as t, c as s, h as i, H as e, g as o } from './p-9031eb6a.js';
import { t as h } from './p-6a46bf1b.js';
const r = class {
  constructor(i) {
    t(this, i),
      (this.press = s(this, 'press', 7)),
      (this.text = void 0),
      (this.value = void 0),
      (this.strategy = void 0);
  }
  handleClick() {
    this.onItemClicked();
  }
  handleKeyDown(t) {
    ('Enter' !== t.key && ' ' !== t.key) || this.onItemClicked();
  }
  render() {
    return i(
      e,
      { role: 'listitem' },
      i(
        'span',
        { class: 'gux-list-item' },
        this.text && i('gux-text-highlight', { class: 'gux-text', text: this.text, strategy: this.strategy }),
        i('slot', null),
      ),
    );
  }
  onItemClicked() {
    this.emitPress();
  }
  emitPress() {
    this.press.emit(this.value);
  }
};
r.style =
  ':host:focus-visible .gux-list-item,:host:active .gux-list-item,:host:hover:not([disabled]) .gux-list-item{color:#fdfdfd;background:#2a60c8}:host(:focus-visible) .gux-list-item,:host(:active) .gux-list-item,:host(:hover:not([disabled])) .gux-list-item{color:#fdfdfd;background:#2a60c8}:host([disabled]) .gux-list-item{pointer-events:none;cursor:default;opacity:0.5}.gux-list-item{display:flex;height:max-content;padding:0 16px;line-height:32px;word-wrap:break-word;cursor:pointer}.gux-list-item .gux-text{width:100%}';
const a = ['gux-list-item-legacy:not([disabled])', 'gux-action-item:not([disabled])'].join(','),
  n = class {
    constructor(i) {
      t(this, i),
        (this.changed = s(this, 'changed', 7)),
        (this.observer = new MutationObserver(() => {
          this.performHighlight(this.highlight);
        })),
        (this.value = void 0),
        (this.highlight = void 0),
        (this.selectedIndex = -1);
    }
    emitChanged(t) {
      this.changed.emit(t);
    }
    itemSelected(t) {
      t.detail && (this.value = t.detail);
    }
    valueHandler(t) {
      this.emitChanged(t);
    }
    async setFocusOnFirstItem() {
      (this.selectedIndex = 0), this.updateTabIndexes();
    }
    async setFocusOnLastItem() {
      const t = this.getFilteredList();
      (this.selectedIndex = t.length - 1), this.updateTabIndexes();
    }
    async isLastItemSelected() {
      const t = this.getFilteredList();
      return this.selectedIndex === t.length - 1;
    }
    async isFirstItemSelected() {
      return this.selectedIndex <= 0;
    }
    componentWillLoad() {
      h(this.root);
    }
    componentDidLoad() {
      this.performHighlight(this.highlight), this.observer.observe(this.root, { childList: !0, subtree: !0 });
    }
    disconnectedCallback() {
      this.observer && this.observer.disconnect();
    }
    render() {
      return (
        this.performHighlight(this.highlight),
        this.updateTabIndexes(),
        i(
          'div',
          { class: 'gux-list-items-container', role: 'list', tabindex: 0, onKeyDown: t => this.onKeyDown(t) },
          i('slot', null),
        )
      );
    }
    onKeyDown(t) {
      if (!['ArrowUp', 'ArrowDown', 'End', 'Home'].includes(t.key)) return;
      const s = this.getFilteredList();
      let i = -1;
      switch (t.key) {
        case 'ArrowUp':
          0 !== this.selectedIndex
            ? (t.preventDefault(), (i = this.selectedIndex - 1), t.stopPropagation())
            : this.isCommandPaletteList() || (t.preventDefault(), (i = s.length - 1));
          break;
        case 'Home':
          this.selectedIndex && (i = 0);
          break;
        case 'ArrowDown':
          this.selectedIndex !== s.length - 1
            ? (t.preventDefault(), (i = this.selectedIndex + 1), t.stopPropagation())
            : this.isCommandPaletteList() || (t.preventDefault(), (i = 0), t.stopPropagation());
          break;
        case 'End':
          this.selectedIndex !== s.length - 1 && (i = s.length - 1);
      }
      -1 !== i && (this.selectedIndex = i);
    }
    isCommandPaletteList() {
      return Boolean(this.root.closest('gux-command-palette-legacy'));
    }
    updateTabIndexes() {
      const t = this.getFilteredList();
      t &&
        -1 !== this.selectedIndex &&
        t.forEach((t, s) => {
          s !== this.selectedIndex
            ? t.setAttribute('tabindex', '-1')
            : (t.setAttribute('tabindex', '0'),
              t.focus(),
              setTimeout(() => {
                this.value = t.value;
              }));
        });
    }
    performHighlight(t) {
      const s = this.root.querySelectorAll('gux-text-highlight');
      s &&
        s.forEach(s => {
          s.highlight = t;
        });
    }
    getFilteredList() {
      const t = this.root.querySelector('slot');
      return t ? t.assignedElements().filter(t => t.matches(a)) : Array.from(this.root.querySelectorAll(a));
    }
    get root() {
      return o(this);
    }
    static get watchers() {
      return { value: ['valueHandler'] };
    }
  };
n.style =
  '.gux-list-items-container{padding:8px 0;margin:0;list-style:none;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}';
export { r as gux_list_item_legacy, n as gux_list_legacy };

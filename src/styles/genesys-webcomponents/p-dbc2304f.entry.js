import { r as t, h as s, g as e, c as i } from './p-9031eb6a.js';
import { t as n } from './p-6a46bf1b.js';
import { c as a } from './p-e459974a.js';
const o = 'gux-action-item:not([disabled])',
  r = class {
    constructor(s) {
      t(this, s), (this.selectedIndex = -1);
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
      n(this.root);
    }
    render() {
      return (
        this.updateTabIndexes(), s('div', { class: 'gux-action-list-items-container', role: 'list' }, s('slot', null))
      );
    }
    onKeyDown(t) {
      const s = this.getFilteredList();
      let e = -1;
      switch (t.key) {
        case 'ArrowUp':
          0 !== this.selectedIndex
            ? (t.preventDefault(), (e = this.selectedIndex - 1), t.stopPropagation())
            : this.root.classList.contains('gux-command-palette-list') || (t.preventDefault(), (e = s.length - 1));
          break;
        case 'Home':
          this.selectedIndex && (e = 0);
          break;
        case 'ArrowDown':
          this.selectedIndex !== s.length - 1
            ? (t.preventDefault(), (e = this.selectedIndex + 1), t.stopPropagation())
            : this.root.classList.contains('gux-command-palette-list') ||
              (t.preventDefault(), (e = 0), t.stopPropagation());
          break;
        case 'End':
          this.selectedIndex !== s.length - 1 && (e = s.length - 1);
      }
      -1 !== e && (this.selectedIndex = e);
    }
    updateTabIndexes() {
      const t = this.getFilteredList();
      t &&
        -1 !== this.selectedIndex &&
        t.forEach((t, s) => {
          s !== this.selectedIndex
            ? t.shadowRoot.querySelector('button').setAttribute('tabindex', '-1')
            : (t.shadowRoot.querySelector('button').setAttribute('tabindex', '0'),
              t.shadowRoot.querySelector('button').focus());
        });
    }
    getFilteredList() {
      const t = this.root.querySelector('slot');
      return t ? t.assignedElements().filter(t => t.matches(o)) : Array.from(this.root.querySelectorAll(o));
    }
    get root() {
      return e(this);
    }
  };
r.style =
  '.gux-action-list-items-container{padding:8px 0;margin:0;list-style:none;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}';
const c = class {
  constructor(s) {
    t(this, s),
      (this.internalexpanded = i(this, 'internalexpanded', 7)),
      (this.internalcollapsed = i(this, 'internalcollapsed', 7)),
      (this.expanded = !1),
      (this.disabled = !1);
  }
  onExpandedChange(t) {
    t ? (this.popperInstance.forceUpdate(), this.internalexpanded.emit()) : this.internalcollapsed.emit();
  }
  connectedCallback() {
    this.targetElementContainer && this.popupElementContainer && this.setPopperInstance();
  }
  componentDidLoad() {
    this.setPopperInstance();
  }
  disconnectedCallback() {
    var t;
    null === (t = this.popperInstance) || void 0 === t || t.destroy();
  }
  setPopperInstance() {
    this.popperInstance = a(this.targetElementContainer, this.popupElementContainer, {
      strategy: 'fixed',
      modifiers: [
        { name: 'flip', options: { boundary: [] } },
        { name: 'offset', options: { offset: [0, 2] } },
        {
          name: 'sameWidth',
          enabled: !0,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn({ state: t }) {
            t.styles.popper.width = `${t.rects.reference.width}px`;
          },
          effect({ state: t }) {
            t.elements.popper.style.width = `${t.elements.reference.getBoundingClientRect().width}px`;
          },
        },
      ],
      placement: 'bottom-start',
    });
  }
  render() {
    return s(
      'div',
      {
        class: { 'gux-target-container': !0, 'gux-disabled': this.disabled },
        ref: t => (this.targetElementContainer = t),
      },
      s('slot', { name: 'target' }),
      s(
        'div',
        {
          class: { 'gux-popup-container': !0, 'gux-expanded': this.expanded && !this.disabled },
          ref: t => (this.popupElementContainer = t),
        },
        s('slot', { name: 'popup' }),
      ),
    );
  }
  static get watchers() {
    return { expanded: ['onExpandedChange'] };
  }
};
c.style =
  '.gux-target-container.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-popup-container{z-index:var(--gux-zindex-popup, 1);visibility:hidden}.gux-popup-container.gux-expanded{visibility:visible}';
export { r as gux_action_list_legacy, c as gux_popup };

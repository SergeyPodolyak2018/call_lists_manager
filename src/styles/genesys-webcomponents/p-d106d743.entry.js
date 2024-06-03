import { r as t, c as i, d as o, w as a, h as s, g as n } from './p-9031eb6a.js';
import { S as e } from './p-1486d7ea.js';
import { O as c } from './p-f222d4b1.js';
import { e as r } from './p-29e8b184.js';
import { a as l } from './p-091f51f6.js';
import { b as h } from './p-54ad2682.js';
import { t as d } from './p-2c3d934a.js';
import './p-8a133b9b.js';
const b = class {
  constructor(o) {
    t(this, o),
      (this.newTab = i(this, 'newTab', 7)),
      (this.sortChanged = i(this, 'sortChanged', 7)),
      (this.showNewTabButton = !0),
      (this.tabLimit = 1 / 0),
      (this.allowSort = !0),
      (this.focused = 0),
      (this.disableAddTabButton = !1),
      (this.tabTriggers = void 0),
      (this.hasScrollbar = !1),
      (this.keyboardSort = !1),
      (this.initialSortIndex = 0),
      (this.sortTarget = void 0),
      (this.ariaLiveAlert = '');
  }
  onFocusin(t) {
    this.allowSort && r('.gux-scrollable-section', t) && !this.keyboardSort && (this.ariaLiveAlert = 'toggleSort');
  }
  onFocusout(t) {
    this.root.querySelector('.gux-scrollable-section').contains(t.relatedTarget) ||
      this.tabTriggers.forEach((t, i) => {
        t.guxGetActive().then(o => {
          o
            ? (this.focused = i)
            : (t.querySelector('.gux-tab-button').setAttribute('tabindex', '-1'),
              t.querySelector('.gux-tab-options-button') &&
                t.querySelector('.gux-tab-options-button').setAttribute('tabindex', '-1'));
        });
      });
  }
  watchAllowSort(t) {
    t ? this.validateSortableInstance() : this.destroySortable();
  }
  onMutation() {
    this.setTabTriggers();
  }
  onKeydown(t) {
    switch (t.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if ((t.preventDefault(), this.keyboardSort && !r('.gux-tab-options-button', t))) {
          this.ariaLiveAlert = '';
          const t = this.root.querySelector('.gux-scrollable-section'),
            i = t.querySelectorAll('gux-tab-advanced'),
            o = Array.prototype.indexOf.call(i, this.sortTarget);
          let a;
          (a = o === i.length - 1 ? i[0] : i[o + 2]),
            t.insertBefore(this.sortTarget, a),
            (this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced')),
            this.tabTriggers.forEach((t, i) => {
              var o;
              t.tabId === (null === (o = this.sortTarget) || void 0 === o ? void 0 : o.getAttribute('tab-id')) &&
                (this.focused = i);
            }),
            this.focusTab(this.focused);
        } else
          r('.gux-tab-options-button', t) ||
            r('.gux-dropdown-option-container', t) ||
            this.handleKeyboardScroll('forward');
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if ((t.preventDefault(), this.keyboardSort && !r('.gux-tab-options-button', t))) {
          this.ariaLiveAlert = '';
          const t = this.root.querySelector('.gux-scrollable-section'),
            i = t.querySelectorAll('gux-tab-advanced'),
            o = Array.prototype.indexOf.call(i, this.sortTarget);
          t.insertBefore(this.sortTarget, i[o - 1] || null),
            (this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced')),
            this.tabTriggers.forEach((t, i) => {
              var o;
              t.tabId === (null === (o = this.sortTarget) || void 0 === o ? void 0 : o.getAttribute('tab-id')) &&
                (this.focused = i);
            }),
            this.focusTab(this.focused);
        } else
          r('.gux-tab-options-button', t) ||
            r('.gux-dropdown-option-container', t) ||
            this.handleKeyboardScroll('backward');
        break;
      case 'Escape':
        t.preventDefault(),
          this.keyboardSort &&
            this.allowSort &&
            ((this.keyboardSort = !1),
            (this.ariaLiveAlert = 'sortCancelled'),
            this.root
              .querySelector('.gux-scrollable-section')
              .insertBefore(this.sortTarget, this.tabTriggers[this.initialSortIndex] || null)),
          (this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced')),
          this.tabTriggers.forEach((t, i) => {
            var o;
            t.tabId === (null === (o = this.sortTarget) || void 0 === o ? void 0 : o.getAttribute('tab-id')) &&
              (this.focused = i);
          }),
          this.focusTab(this.initialSortIndex),
          l(() => {
            this.focusTab(this.initialSortIndex);
          });
        break;
      case 'Enter':
        this.keyboardSort &&
          (t.preventDefault(),
          (this.keyboardSort = !1),
          (this.ariaLiveAlert = 'sortComplete'),
          (this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced')),
          this.tabTriggers.forEach((t, i) => {
            var o;
            t.tabId === (null === (o = this.sortTarget) || void 0 === o ? void 0 : o.getAttribute('tab-id')) &&
              (this.focused = i);
          }),
          this.emitSortChanged());
        break;
      case 'Tab':
        this.keyboardSort && ((this.keyboardSort = !1), (this.ariaLiveAlert = 'sortCancelled'));
        break;
      case 'Home':
        t.preventDefault(), this.focusTab(0);
        break;
      case 'End':
        t.preventDefault(), this.focusTab(this.tabTriggers.length - 1);
    }
  }
  onKeyup(t) {
    ' ' === t.key &&
      r('.gux-tab', t) &&
      !r('.gux-tab-options-button', t) &&
      !r('gux-popover-list', t) &&
      this.allowSort &&
      (t.preventDefault(),
      !0 === this.keyboardSort
        ? ((this.keyboardSort = !1),
          (this.ariaLiveAlert = 'sortComplete'),
          (this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced')),
          this.tabTriggers.forEach((t, i) => {
            var o;
            t.tabId === (null === (o = this.sortTarget) || void 0 === o ? void 0 : o.getAttribute('tab-id')) &&
              (this.focused = i);
          }),
          this.focusTab(this.focused),
          this.emitSortChanged())
        : ((this.keyboardSort = !0),
          (this.sortTarget = t.target.parentNode.parentNode),
          this.tabTriggers.forEach((t, i) => {
            var o;
            t.tabId === (null === (o = this.sortTarget) || void 0 === o ? void 0 : o.getAttribute('tab-id')) &&
              (this.initialSortIndex = i);
          }),
          (this.ariaLiveAlert = 'sortModeOn')));
  }
  async guxSetActive(t) {
    this.tabTriggers.forEach((i, o) => {
      const a = i.tabId === t;
      i.guxSetActive(a), a && (this.focused = o);
    });
  }
  focusTab(t) {
    (this.focused = t),
      this.tabTriggers.forEach((t, i) => {
        t.guxGetActive().then(o => {
          this.focused === i ||
            o ||
            (t.querySelector('.gux-tab-button').setAttribute('tabindex', '-1'),
            t.querySelector('.gux-tab-options-button') &&
              t.querySelector('.gux-tab-options-button').setAttribute('tabindex', '-1'));
        });
      }),
      this.tabTriggers[this.focused].querySelector('button').setAttribute('tabindex', '0'),
      this.tabTriggers[this.focused].querySelector('.gux-tab-options-button') &&
        this.tabTriggers[this.focused].querySelector('.gux-tab-options-button').setAttribute('tabindex', '0'),
      this.tabTriggers[this.focused].guxFocus();
  }
  setTabTriggers() {
    (this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced')),
      (this.triggerIds = this.tabTriggers
        ? Array.from(this.tabTriggers)
            .map(t => `gux-${t.getAttribute('tab-id')}-tab`)
            .join(' ')
        : '');
  }
  createSortable() {
    this.sortableInstance = new e(this.root.querySelector('.gux-scrollable-section'), {
      animation: 250,
      draggable: 'gux-tab-advanced',
      filter: '.ignore-sort',
      onMove: t => !t.related.classList.contains('ignore-sort'),
      onUpdate: () => {
        this.emitSortChanged();
      },
    });
  }
  destroySortable() {
    this.sortableInstance && (this.sortableInstance.destroy(), (this.sortableInstance = null));
  }
  emitSortChanged() {
    const t = Array.from(this.root.querySelectorAll('gux-tab-advanced')).map(t => t.tabId);
    this.sortChanged.emit(t);
  }
  checkForScrollbarHideOrShow() {
    o(() => {
      const t = this.root.querySelector('.gux-scrollable-section'),
        i = t.clientWidth < t.scrollWidth;
      i !== this.hasScrollbar && (this.hasScrollbar = i);
    });
  }
  handleKeyboardScroll(t) {
    'forward' === t
      ? this.focused < this.tabTriggers.length - 1
        ? (this.hasScrollbar && this.scrollRight(), this.focusTab(this.focused + 1))
        : (this.hasScrollbar && this.scrollToStart(), this.focusTab(0))
      : 'backward' === t &&
        (this.focused > 0
          ? (this.hasScrollbar && this.scrollLeft(), this.focusTab(this.focused - 1))
          : (this.hasScrollbar && this.scrollToEnd(), this.focusTab(this.tabTriggers.length - 1)));
  }
  disconnectedCallback() {
    this.sortableInstance && this.destroySortable(),
      this.resizeObserver && this.resizeObserver.unobserve(this.root.querySelector('.gux-tab-container')),
      this.domObserver && this.domObserver.disconnect();
  }
  async componentWillLoad() {
    this.setTabTriggers(), (this.i18n = await h(this.root, d, 'gux-tabs-advanced'));
  }
  validateSortableInstance() {
    this.allowSort && !this.sortableInstance && this.createSortable();
  }
  componentDidLoad() {
    this.validateSortableInstance(),
      !this.resizeObserver &&
        window.ResizeObserver &&
        (this.resizeObserver = new ResizeObserver(() => this.checkForScrollbarHideOrShow())),
      this.resizeObserver && this.resizeObserver.observe(this.root.querySelector('.gux-scrollable-section')),
      !this.domObserver &&
        window.MutationObserver &&
        (this.domObserver = new MutationObserver(() => this.checkForScrollbarHideOrShow())),
      this.domObserver && this.domObserver.observe(this.root, { childList: !0, attributes: !1, subtree: !0 }),
      l(() => {
        this.checkForScrollbarHideOrShow();
      }, 500);
  }
  scrollLeft() {
    a(() => {
      var t;
      this.root
        .querySelector('.gux-scrollable-section')
        .scrollBy(
          -(null === (t = this.root.querySelector('gux-tab-advanced')) || void 0 === t ? void 0 : t.scrollWidth),
          0,
        );
    });
  }
  scrollRight() {
    a(() => {
      var t;
      this.root
        .querySelector('.gux-scrollable-section')
        .scrollBy(
          null === (t = this.root.querySelector('gux-tab-advanced')) || void 0 === t ? void 0 : t.scrollWidth,
          0,
        );
    });
  }
  scrollToStart() {
    const t = this.root.querySelector('.gux-scrollable-section');
    a(() => {
      null == t || t.scrollBy(-(null == t ? void 0 : t.scrollWidth), 0);
    });
  }
  scrollToEnd() {
    const t = this.root.querySelector('.gux-scrollable-section');
    a(() => {
      t.scrollBy(null == t ? void 0 : t.scrollWidth, 0);
    });
  }
  componentWillRender() {
    const t = Array.from(this.root.querySelectorAll('gux-tab-advanced'));
    this.disableAddTabButton = t.length >= this.tabLimit;
  }
  render() {
    return [
      s(
        'span',
        { class: 'gux-sr-only gux-aria-live-region', 'aria-live': 'polite' },
        this.ariaLiveAlert ? this.i18n(this.ariaLiveAlert) : '',
      ),
      s(
        'div',
        { class: 'gux-tab-container' },
        s('div', { class: 'action-button-container' }, this.renderScrollButton('scrollLeft')),
        s(
          'div',
          {
            role: 'tablist',
            class: 'gux-scrollable-section ' + (this.keyboardSort ? 'gux-tab-sorting' : ''),
            'aria-owns': this.triggerIds,
          },
          s('slot', null),
        ),
        s(
          'div',
          { class: 'action-button-container' },
          this.renderScrollButton('scrollRight'),
          this.showNewTabButton
            ? s(
                t =>
                  s(
                    'button',
                    {
                      title: this.disableAddTabButton
                        ? this.i18n('disableNewTab')
                        : this.root.querySelector('[slot="add-tab"]')
                        ? this.root.querySelector('[slot="add-tab"]').textContent.trim()
                        : this.i18n('createNewTab'),
                      class: 'add-tab-button',
                      onClick: () => t.onClick(),
                      disabled: this.disableAddTabButton,
                    },
                    s('slot', { name: 'add-tab' }, s('gux-icon', { 'icon-name': 'add', decorative: !0 })),
                  ),
                { onClick: () => this.newTab.emit() },
              )
            : null,
        ),
      ),
    ];
  }
  renderScrollButton(t) {
    return s(
      'div',
      { class: 'gux-scroll-button-container' },
      this.hasScrollbar
        ? s(
            'button',
            {
              tabindex: '-1',
              title: this.i18n(t),
              'aria-label': this.i18n(t),
              class: 'gux-scroll-button',
              onDragOver: () => this.getScrollDirection(t),
              onClick: () => this.getScrollDirection(t),
            },
            s('gux-icon', { 'icon-name': this.getChevronIconName(t), decorative: !0 }),
          )
        : null,
    );
  }
  getScrollDirection(t) {
    switch (t) {
      case 'scrollLeft':
        this.scrollLeft();
        break;
      case 'scrollRight':
        this.scrollRight();
    }
  }
  getChevronIconName(t) {
    switch (t) {
      case 'scrollLeft':
        return 'chevron-left';
      case 'scrollRight':
        return 'chevron-right';
    }
  }
  get root() {
    return n(this);
  }
  static get watchers() {
    return { allowSort: ['watchAllowSort'] };
  }
};
(function (t, i, o, a) {
  var s,
    n = arguments.length,
    e = n < 3 ? i : null === a ? (a = Object.getOwnPropertyDescriptor(i, o)) : a;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) e = Reflect.decorate(t, i, o, a);
  else for (var c = t.length - 1; c >= 0; c--) (s = t[c]) && (e = (n < 3 ? s(e) : n > 3 ? s(i, o, e) : s(i, o)) || e);
  n > 3 && e && Object.defineProperty(i, o, e);
})([c({ childList: !0, subtree: !0 })], b.prototype, 'onMutation', null),
  (b.style =
    "gux-tab-advanced-list .gux-tab-container{display:flex;align-items:flex-end;width:100%;height:50px;margin-bottom:16px;overflow-x:auto;overflow-y:hidden;background-color:#f6f7f9;border-bottom:1px solid #d7dce5;border-radius:4px 4px 0 0}gux-tab-advanced-list .gux-tab-container .action-button-container{display:flex;border-radius:4px}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button{min-width:35px;height:50px;padding:0;margin-left:2px;color:#2e394c;background-color:#e2e6ee;border:none;border-radius:4px;transition:color 0.25s}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button [slot='add-tab']{display:inline-flex;align-items:center;padding:0 12px;white-space:nowrap;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button [slot='add-tab'] gux-icon{padding-right:8px}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:disabled{opacity:0.5}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:hover{background-color:#d7dce5}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:active{background-color:#c8cfda}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:focus-visible{outline:none;box-shadow:inset 0 0 0 3px #aac9ff}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:focus-visible{border-radius:5px;outline:none;box-shadow:inset 0 0 0 3px #aac9ff}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button gux-icon{width:16px;height:16px}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container{display:flex;border-radius:4px}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button{display:flex;align-items:center;justify-content:center;width:28px;height:50px;padding:0;color:#2e394c;background-color:#e2e6ee;border:none;border-radius:4px;transition:color 0.25s}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:focus-visible{border:3px solid #aac9ff;border-radius:5px;outline:none}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button gux-icon{width:16px;height:16px}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:focus-visible{border:3px solid #aac9ff;outline:none}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:hover{background-color:#d7dce5}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:active{background-color:#c8cfda}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-tab-advanced-list .gux-tab-container .gux-scrollable-section{display:flex;align-items:flex-end;height:50px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none}gux-tab-advanced-list .gux-tab-container .gux-scrollable-section::-webkit-scrollbar{height:0}gux-tab-advanced-list .gux-sr-only{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}");
export { b as gux_tab_advanced_list };

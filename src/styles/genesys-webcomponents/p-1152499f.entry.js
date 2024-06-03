import { r as t, d as s, w as i, h as o, g as l } from './p-9031eb6a.js';
import { a as e } from './p-091f51f6.js';
import { b as r } from './p-54ad2682.js';
import { O as c } from './p-f222d4b1.js';
import './p-8a133b9b.js';
const a = { scrollLeft: 'Scroll Left', scrollRight: 'Scroll Right', scrollUp: 'Scroll Up', scrollDown: 'Scroll Down' };
const n = class {
  constructor(s) {
    t(this, s),
      (this.currentScrollIndex = 0),
      (this.focused = 0),
      (this.tabTriggers = void 0),
      (this.hasHorizontalScrollbar = !1),
      (this.hasVerticalScrollbar = !1),
      (this.isScrolledToBeginning = !1),
      (this.isScrolledToEnd = !1);
  }
  onFocusout(t) {
    this.root.contains(t.relatedTarget) ||
      this.tabTriggers.forEach((t, s) => {
        t.guxGetActive().then(i => {
          i ? (this.focused = s) : t.querySelector('button').setAttribute('tabindex', '-1');
        });
      });
  }
  onHasVerticalScrollBar() {
    this.checkDisabledScrollButtons();
  }
  onScroll() {
    this.checkDisabledScrollButtons();
  }
  onKeydown(t) {
    switch (t.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        t.preventDefault(), this.handleKeyboardScroll('forward');
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        t.preventDefault(), this.handleKeyboardScroll('backward');
        break;
      case 'Escape':
        t.preventDefault(), this.focusTab(this.focused);
        break;
      case 'Home':
        t.preventDefault(), this.focusTab(0);
        break;
      case 'End':
        t.preventDefault(), this.focusTab(this.tabTriggers.length - 1);
    }
  }
  onMutation() {
    this.setTabTriggers();
  }
  async guxSetActive(t) {
    this.tabTriggers.forEach((s, i) => {
      const o = s.tabId === t;
      s.guxSetActive(o), o && (this.focused = i);
    });
  }
  focusTab(t) {
    (this.focused = t),
      this.tabTriggers.forEach((t, s) => {
        t.guxGetActive().then(i => {
          this.focused === s || i || t.querySelector('button').setAttribute('tabindex', '-1');
        });
      }),
      this.tabTriggers[this.focused].querySelector('button').setAttribute('tabindex', '0'),
      this.tabTriggers[this.focused].guxFocus();
  }
  setTabTriggers() {
    (this.tabTriggers = this.root.querySelectorAll('gux-tab')),
      (this.triggerIds = this.tabTriggers
        ? Array.from(this.tabTriggers)
            .map(t => `gux-${t.getAttribute('tab-id')}-tab`)
            .join(' ')
        : '');
  }
  checkForScrollbarHideOrShow() {
    s(() => {
      const t = this.root.querySelector('.gux-scrollable-section'),
        s = t.clientWidth < t.scrollWidth,
        i = t.clientHeight < t.scrollHeight;
      s !== this.hasHorizontalScrollbar && (this.hasHorizontalScrollbar = s),
        i !== this.hasVerticalScrollbar && (this.hasVerticalScrollbar = i),
        this.checkDisabledScrollButtons();
    });
  }
  handleKeyboardScroll(t) {
    const s = this.root.querySelector('.gux-scrollable-section');
    'forward' === t
      ? this.focused < this.tabTriggers.length - 1
        ? (i(() => {
            this.hasHorizontalScrollbar ? this.scrollRight() : this.scrollDown();
          }),
          this.focusTab(this.focused + 1))
        : (i(() => {
            this.hasHorizontalScrollbar ? s.scrollBy(-s.scrollWidth, 0) : s.scrollBy(0, -s.scrollHeight);
          }),
          this.focusTab(0))
      : 'backward' === t &&
        (this.focused > 0
          ? (i(() => {
              this.hasHorizontalScrollbar ? this.scrollLeft() : this.scrollUp();
            }),
            this.focusTab(this.focused - 1))
          : (i(() => {
              this.hasHorizontalScrollbar ? s.scrollBy(s.scrollWidth, 0) : s.scrollBy(0, s.scrollHeight);
            }),
            this.focusTab(this.tabTriggers.length - 1)));
  }
  disconnectedCallback() {
    this.resizeObserver && this.resizeObserver.unobserve(this.root.querySelector('.gux-tab-container')),
      this.domObserver && this.domObserver.disconnect();
  }
  async componentWillLoad() {
    this.setTabTriggers(), (this.i18n = await r(this.root, a, 'gux-tabs'));
  }
  componentDidLoad() {
    !this.resizeObserver &&
      window.ResizeObserver &&
      (this.resizeObserver = new ResizeObserver(() => this.checkForScrollbarHideOrShow())),
      this.resizeObserver && this.resizeObserver.observe(this.root.querySelector('.gux-scrollable-section')),
      !this.domObserver &&
        window.MutationObserver &&
        (this.domObserver = new MutationObserver(() => this.checkForScrollbarHideOrShow())),
      this.domObserver && this.domObserver.observe(this.root, { childList: !0, attributes: !1, subtree: !0 }),
      e(() => {
        this.checkForScrollbarHideOrShow();
      }, 500);
  }
  checkDisabledScrollButtons() {
    const t = this.root.querySelector('.gux-scrollable-section');
    if (this.hasHorizontalScrollbar) {
      const s = t.scrollLeft,
        i = t.scrollWidth - t.clientWidth;
      (this.isScrolledToBeginning = 0 === s), (this.isScrolledToEnd = i - s == 0);
    } else {
      const s = t.scrollTop,
        i = t.scrollHeight - t.clientHeight;
      (this.isScrolledToBeginning = 0 === s), (this.isScrolledToEnd = i - s == 0);
    }
  }
  getTabLength() {
    var t;
    return null === (t = this.tabTriggers[this.currentScrollIndex]) || void 0 === t ? void 0 : t.scrollWidth;
  }
  scrollLeft() {
    i(() => {
      (this.currentScrollIndex = this.isScrolledToEnd ? this.tabTriggers.length - 1 : this.currentScrollIndex - 1),
        this.root.querySelector('.gux-scrollable-section').scrollBy(-this.getTabLength(), 0);
    });
  }
  scrollRight() {
    i(() => {
      this.isScrolledToBeginning && (this.currentScrollIndex = 0),
        this.root.querySelector('.gux-scrollable-section').scrollBy(this.getTabLength(), 0),
        (this.currentScrollIndex = this.currentScrollIndex + 1);
    });
  }
  scrollUp() {
    i(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(0, -this.tabTriggers[this.focused].clientHeight);
    });
  }
  scrollDown() {
    i(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(0, this.tabTriggers[this.focused].clientHeight);
    });
  }
  render() {
    return o(
      'div',
      { class: 'gux-tab-container' },
      this.renderScrollButton(this.hasHorizontalScrollbar ? 'scrollLeft' : 'scrollUp'),
      o('div', { role: 'tablist', class: 'gux-scrollable-section', 'aria-owns': this.triggerIds }, o('slot', null)),
      this.renderScrollButton(this.hasHorizontalScrollbar ? 'scrollRight' : 'scrollDown'),
    );
  }
  renderScrollButton(t) {
    return o(
      'div',
      { class: 'gux-scroll-button-container' },
      this.hasHorizontalScrollbar || this.hasVerticalScrollbar
        ? o(
            'button',
            {
              disabled: this.getButtonDisabled(t),
              tabindex: '-1',
              title: this.i18n(t),
              'aria-label': this.i18n(t),
              class: 'gux-scroll-button',
              onClick: () => this.getScrollDirection(t),
            },
            o('gux-icon', { 'icon-name': this.getChevronIconName(t), decorative: !0 }),
          )
        : null,
    );
  }
  getButtonDisabled(t) {
    switch (t) {
      case 'scrollLeft':
      case 'scrollUp':
        return this.isScrolledToBeginning;
      case 'scrollRight':
      case 'scrollDown':
        return this.isScrolledToEnd;
    }
  }
  getScrollDirection(t) {
    switch (t) {
      case 'scrollLeft':
        this.scrollLeft();
        break;
      case 'scrollRight':
        this.scrollRight();
        break;
      case 'scrollUp':
        this.scrollUp();
        break;
      case 'scrollDown':
        this.scrollDown();
    }
  }
  getChevronIconName(t) {
    switch (t) {
      case 'scrollLeft':
        return 'chevron-small-left';
      case 'scrollRight':
        return 'chevron-small-right';
      case 'scrollUp':
        return 'chevron-small-up';
      case 'scrollDown':
        return 'chevron-small-down';
    }
  }
  get root() {
    return l(this);
  }
};
(function (t, s, i, o) {
  var l,
    e = arguments.length,
    r = e < 3 ? s : null === o ? (o = Object.getOwnPropertyDescriptor(s, i)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, s, i, o);
  else for (var c = t.length - 1; c >= 0; c--) (l = t[c]) && (r = (e < 3 ? l(r) : e > 3 ? l(s, i, r) : l(s, i)) || r);
  e > 3 && r && Object.defineProperty(s, i, r);
})([c({ childList: !0, subtree: !0 })], n.prototype, 'onMutation', null),
  (n.style =
    "gux-tabs[orientation='vertical']{height:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container{display:flex;flex-direction:column;width:160px;max-width:160px;height:100%;margin-right:16px;border-right:1px solid #d7dce5}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scroll-button-container{width:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scroll-button-container button{width:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scrollable-section{flex-direction:column;height:100%;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scrollable-section::-webkit-scrollbar{width:0;height:0}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab-container{height:40px;margin-bottom:16px;border-bottom:1px solid #d7dce5}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-scrollable-section{overflow-x:auto}gux-tabs .gux-tab-container{box-sizing:content-box;display:flex;width:100%;overflow-x:hidden;overflow-y:hidden;background-color:#fff}gux-tabs .gux-scrollable-section{display:flex;flex:1 1 auto;scroll-behavior:smooth;scrollbar-width:none}gux-tabs .gux-scrollable-section::-webkit-scrollbar{height:0}gux-tabs .gux-scroll-button-container{display:flex;border-radius:4px}gux-tabs .gux-scroll-button-container .gux-scroll-button{display:flex;align-items:center;justify-content:center;width:28px;height:40px;color:#202937;cursor:pointer;background-color:#c8cfda;background-color:#e2e6ee;border:none;border-radius:4px}gux-tabs .gux-scroll-button-container .gux-scroll-button gux-icon{width:16px;height:16px}gux-tabs .gux-scroll-button-container .gux-scroll-button:hover:not(:disabled){background-color:#d7dce5}gux-tabs .gux-scroll-button-container .gux-scroll-button:active:not(:disabled){background-color:#d2d8e5}gux-tabs .gux-scroll-button-container .gux-scroll-button:disabled{cursor:default;opacity:0.5}");
export { n as gux_tab_list };

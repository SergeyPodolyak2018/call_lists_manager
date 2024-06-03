import { r as t, c as o, d as a, w as e, h as c, g as r } from './p-9031eb6a.js';
import { S as i } from './p-1486d7ea.js';
import { t as n } from './p-6a46bf1b.js';
import { b as l } from './p-54ad2682.js';
import { w as b } from './p-76ff3e75.js';
import './p-8a133b9b.js';
const s = {
    createNewTab: 'Create New Tab',
    scrollLeft: 'Scroll Left',
    scrollRight: 'Scroll Right',
    disableNewTab: 'Maximum number of tabs created has been reached',
  },
  d = class {
    constructor(a) {
      t(this, a),
        (this.newTab = o(this, 'newTab', 7)),
        (this.input = o(this, 'input', 7)),
        (this.sortChanged = o(this, 'sortChanged', 7)),
        (this.allowSort = !1),
        (this.showNewTabButton = !1),
        (this.value = ''),
        (this.tabLimit = 1 / 0),
        (this.disableAddTabButton = !1),
        (this.hasScrollbar = !1);
    }
    watchHandler(t) {
      const o = Array.from(this.root.querySelectorAll('gux-tab-legacy'));
      for (const a of o) a.active = a.tabId === t;
    }
    internaltabselectedHandler(t) {
      b('gux-tab-legacy', t, t => {
        t.active || ((this.value = t.tabId), this.input.emit());
      });
    }
    createSortable() {
      this.sortableInstance = new i(this.root, {
        animation: 250,
        draggable: 'gux-tab-legacy',
        filter: '.ignore-sort',
        onMove: t => !t.related.classList.contains('ignore-sort'),
        onUpdate: () => {
          const t = Array.from(this.root.querySelectorAll('gux-tab-legacy')).map(t => t.tabId);
          this.sortChanged.emit(t);
        },
      });
    }
    destroySortable() {
      this.sortableInstance && (this.sortableInstance.destroy(), (this.sortableInstance = null));
    }
    disconnectedCallback() {
      this.sortableInstance && this.destroySortable(),
        this.resizeObserver && this.resizeObserver.unobserve(this.root.shadowRoot.querySelector('.gux-tabs')),
        this.domObserver && this.domObserver.disconnect();
    }
    async componentWillLoad() {
      n(this.root), (this.i18n = await l(this.root, s));
    }
    componentWillRender() {
      Array.from(this.root.querySelectorAll('gux-tab-legacy')).length >= this.tabLimit &&
        (this.disableAddTabButton = !0);
    }
    checkForScrollbarHideOrShow() {
      a(() => {
        const t = this.root.shadowRoot.querySelector('.scrollable-section'),
          o = t.clientWidth !== t.scrollWidth;
        o !== this.hasScrollbar && (this.hasScrollbar = o);
      });
    }
    componentDidLoad() {
      this.allowSort && !this.sortableInstance && this.createSortable(),
        !this.resizeObserver &&
          window.ResizeObserver &&
          (this.resizeObserver = new ResizeObserver(this.checkForScrollbarHideOrShow.bind(this))),
        this.resizeObserver && this.resizeObserver.observe(this.root.shadowRoot.querySelector('.gux-tabs')),
        !this.domObserver &&
          window.MutationObserver &&
          (this.domObserver = new MutationObserver(this.checkForScrollbarHideOrShow.bind(this))),
        this.domObserver && this.domObserver.observe(this.root, { childList: !0, attributes: !1, subtree: !0 }),
        setTimeout(() => {
          this.checkForScrollbarHideOrShow();
        }, 500);
    }
    componentDidRender() {
      setTimeout(() => {
        a(() => {
          if (this.value) {
            const t = this.root.querySelector(`gux-tab-legacy[tab-id='${this.value}']`);
            t && (t.active = !0);
          }
        });
      }, 500);
    }
    scrollLeft() {
      e(() => {
        this.root.shadowRoot.querySelector('.scrollable-section').scrollBy(-100, 0);
      });
    }
    scrollRight() {
      e(() => {
        this.root.shadowRoot.querySelector('.scrollable-section').scrollBy(100, 0);
      });
    }
    render() {
      const t = t =>
        c(
          'button',
          {
            title: this.i18n(this.disableAddTabButton ? 'disableNewTab' : 'createNewTab'),
            class: 'add-tab',
            onClick: () => t.onClick(),
            disabled: this.disableAddTabButton,
          },
          c('gux-icon', { 'icon-name': 'add', decorative: !0 }),
        );
      return c(
        'div',
        { class: 'gux-tabs' },
        c(
          'div',
          { class: 'action-button-container' },
          this.hasScrollbar
            ? c(
                'button',
                { title: this.i18n('scrollLeft'), class: 'arrow-button', onClick: () => this.scrollLeft() },
                c('gux-icon', { 'icon-name': 'chevron-left', decorative: !0 }),
              )
            : null,
        ),
        c(
          'div',
          { class: 'scrollable-section' },
          c('slot', null),
          this.showNewTabButton && !this.hasScrollbar ? c(t, { onClick: () => this.newTab.emit() }) : null,
        ),
        c(
          'div',
          { class: 'action-button-container' },
          this.hasScrollbar
            ? c(
                'button',
                { title: this.i18n('scrollRight'), class: 'arrow-button', onClick: () => this.scrollRight() },
                c('gux-icon', { 'icon-name': 'chevron-right', decorative: !0 }),
              )
            : null,
          this.showNewTabButton && this.hasScrollbar ? c(t, { onClick: () => this.newTab.emit() }) : null,
        ),
      );
    }
    get root() {
      return r(this);
    }
    static get watchers() {
      return { value: ['watchHandler'] };
    }
  };
d.style =
  '.gux-tabs{display:flex;align-items:flex-end;width:100%;height:40px;overflow-x:hidden}.gux-tabs .action-button-container{display:flex;border-radius:2px}.gux-tabs .action-button-container .arrow-button{display:flex;align-items:center;justify-content:center;width:24px;height:40px;padding:0;border:none;border-style:solid;border-width:1px;border-radius:2px;transition:color 0.25s}.gux-tabs .action-button-container .arrow-button gux-icon{width:10px;height:10px}.gux-tabs .action-button-container .add-tab{display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border:none;border-style:solid;border-width:1px;border-radius:2px;transition:color 0.25s}.gux-tabs .action-button-container .add-tab:disabled{opacity:0.5}.gux-tabs .action-button-container .add-tab:disabled:hover{color:#202937}.gux-tabs .action-button-container .add-tab:disabled:active{background-color:#e2e6ee}.gux-tabs .action-button-container .add-tab gux-icon{width:16px;height:16px}.gux-tabs .scrollable-section{display:flex;flex:1 1 auto;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none}.gux-tabs .scrollable-section::-webkit-scrollbar{height:0}.gux-tabs .scrollable-section .add-tab{display:flex;align-items:center;justify-content:center;width:36px;min-width:36px;height:36px;padding:0;margin-left:4px;border:none;transition:color 0.25s}.gux-tabs .scrollable-section .add-tab gux-icon{width:16px;height:16px}.gux-tabs-light-theme{background-color:#e2e6ee}.gux-tabs-light-theme .action-button-container{background-color:#c8cfda}.gux-tabs-light-theme .action-button-container .arrow-button{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-tabs-light-theme .action-button-container .arrow-button:hover{color:#2a60c8}.gux-tabs-light-theme .action-button-container .arrow-button:active{background-color:#d2d8e5}.gux-tabs-light-theme .action-button-container .add-tab{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-tabs-light-theme .action-button-container .add-tab:hover{color:#2a60c8}.gux-tabs-light-theme .action-button-container .add-tab:active{background-color:#d2d8e5}.gux-tabs-light-theme .scrollable-section::-webkit-scrollbar-track{background:#fdfdfd}.gux-tabs-light-theme .scrollable-section::-webkit-scrollbar-thumb{background:#202937}.gux-tabs-light-theme .scrollable-section::-webkit-scrollbar-thumb:hover{background:#202937}.gux-tabs-light-theme .scrollable-section .add-tab{color:#202937;background-color:#c8cfda}.gux-tabs-light-theme .scrollable-section .add-tab:hover{color:#2a60c8}.gux-tabs-light-theme .scrollable-section .add-tab:active{background-color:#b9c2d0}.gux-light-theme .gux-tabs{background-color:#e2e6ee}.gux-light-theme .gux-tabs .action-button-container{background-color:#c8cfda}.gux-light-theme .gux-tabs .action-button-container .arrow-button{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-light-theme .gux-tabs .action-button-container .arrow-button:hover{color:#2a60c8}.gux-light-theme .gux-tabs .action-button-container .arrow-button:active{background-color:#d2d8e5}.gux-light-theme .gux-tabs .action-button-container .add-tab{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-light-theme .gux-tabs .action-button-container .add-tab:hover{color:#2a60c8}.gux-light-theme .gux-tabs .action-button-container .add-tab:active{background-color:#d2d8e5}.gux-light-theme .gux-tabs .scrollable-section::-webkit-scrollbar-track{background:#fdfdfd}.gux-light-theme .gux-tabs .scrollable-section::-webkit-scrollbar-thumb{background:#202937}.gux-light-theme .gux-tabs .scrollable-section::-webkit-scrollbar-thumb:hover{background:#202937}.gux-light-theme .gux-tabs .scrollable-section .add-tab{color:#202937;background-color:#c8cfda}.gux-light-theme .gux-tabs .scrollable-section .add-tab:hover{color:#2a60c8}.gux-light-theme .gux-tabs .scrollable-section .add-tab:active{background-color:#b9c2d0}.gux-tabs.gux-light-theme{background-color:#e2e6ee}.gux-tabs.gux-light-theme .action-button-container{background-color:#c8cfda}.gux-tabs.gux-light-theme .action-button-container .arrow-button{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-tabs.gux-light-theme .action-button-container .arrow-button:hover{color:#2a60c8}.gux-tabs.gux-light-theme .action-button-container .arrow-button:active{background-color:#d2d8e5}.gux-tabs.gux-light-theme .action-button-container .add-tab{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-tabs.gux-light-theme .action-button-container .add-tab:hover{color:#2a60c8}.gux-tabs.gux-light-theme .action-button-container .add-tab:active{background-color:#d2d8e5}.gux-tabs.gux-light-theme .scrollable-section::-webkit-scrollbar-track{background:#fdfdfd}.gux-tabs.gux-light-theme .scrollable-section::-webkit-scrollbar-thumb{background:#202937}.gux-tabs.gux-light-theme .scrollable-section::-webkit-scrollbar-thumb:hover{background:#202937}.gux-tabs.gux-light-theme .scrollable-section .add-tab{color:#202937;background-color:#c8cfda}.gux-tabs.gux-light-theme .scrollable-section .add-tab:hover{color:#2a60c8}.gux-tabs.gux-light-theme .scrollable-section .add-tab:active{background-color:#b9c2d0}.gux-tabs{background-color:#e2e6ee}.gux-tabs .action-button-container{background-color:#c8cfda}.gux-tabs .action-button-container .arrow-button{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-tabs .action-button-container .arrow-button:hover{color:#2a60c8}.gux-tabs .action-button-container .arrow-button:active{background-color:#d2d8e5}.gux-tabs .action-button-container .add-tab{color:#202937;background-color:#e2e6ee;border-color:#c8cfda}.gux-tabs .action-button-container .add-tab:hover{color:#2a60c8}.gux-tabs .action-button-container .add-tab:active{background-color:#d2d8e5}.gux-tabs .scrollable-section::-webkit-scrollbar-track{background:#fdfdfd}.gux-tabs .scrollable-section::-webkit-scrollbar-thumb{background:#202937}.gux-tabs .scrollable-section::-webkit-scrollbar-thumb:hover{background:#202937}.gux-tabs .scrollable-section .add-tab{color:#202937;background-color:#c8cfda}.gux-tabs .scrollable-section .add-tab:hover{color:#2a60c8}.gux-tabs .scrollable-section .add-tab:active{background-color:#b9c2d0}';
export { d as gux_tabs_legacy };

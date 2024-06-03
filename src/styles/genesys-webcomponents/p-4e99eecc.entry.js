import { r as t, c as i, d as a, h as n, g as e } from './p-9031eb6a.js';
import { a as s } from './p-091f51f6.js';
import { t as o } from './p-6a46bf1b.js';
const r = class {
  constructor(a) {
    t(this, a),
      (this.guxpaginationchange = i(this, 'guxpaginationchange', 7)),
      (this.reinstateLayoutBreakpoint = 0),
      (this.layout = 'advanced'),
      (this.currentPage = 1),
      (this.totalItems = 0),
      (this.itemsPerPage = 25),
      (this.totalPages = void 0),
      (this.displayedLayout = void 0);
  }
  setPage(t) {
    if (t <= 0) return void this.setPage(1);
    const i = this.calculateTotalPages(this.totalItems, this.itemsPerPage);
    t > i
      ? this.setPage(i)
      : ((this.currentPage = t),
        this.guxpaginationchange.emit({ currentPage: this.currentPage, itemsPerPage: this.itemsPerPage }));
  }
  handleInternalitemsperpagechange(t) {
    (this.itemsPerPage = t.detail), this.setPage(1);
  }
  handleInternalcurrentpagechange(t) {
    this.setPage(t.detail);
  }
  calculateTotalPages(t, i) {
    return Math.max(1, Math.ceil(t / i));
  }
  calculateCurrentPage(t, i) {
    return Math.max(t > 0 ? 1 : 0, Math.min(i, t));
  }
  checkPaginationContainerWidthForLayout() {
    a(() => {
      const t = this.root.shadowRoot.querySelector('.gux-pagination-container'),
        i = this.root.shadowRoot.querySelector('.gux-pagination-spacer'),
        a = t.clientWidth;
      i.clientWidth < 24 && 'simple' !== this.displayedLayout
        ? ((this.reinstateLayoutBreakpoint = a), (this.displayedLayout = 'simple'))
        : a > this.reinstateLayoutBreakpoint &&
          ((this.reinstateLayoutBreakpoint = 0), (this.displayedLayout = this.layout));
    });
  }
  componentWillLoad() {
    o(this.root, { variant: this.layout });
  }
  componentWillRender() {
    (this.totalPages = this.calculateTotalPages(this.totalItems, this.itemsPerPage)),
      (this.currentPage = this.calculateCurrentPage(this.totalPages, this.currentPage));
  }
  disconnectedCallback() {
    this.resizeObserver &&
      this.resizeObserver.unobserve(this.root.shadowRoot.querySelector('.gux-pagination-container'));
  }
  componentDidLoad() {
    !this.resizeObserver &&
      window.ResizeObserver &&
      (this.resizeObserver = new ResizeObserver(() => this.checkPaginationContainerWidthForLayout())),
      this.resizeObserver &&
        this.resizeObserver.observe(this.root.shadowRoot.querySelector('.gux-pagination-container')),
      s(() => {
        this.checkPaginationContainerWidthForLayout();
      }, 500);
  }
  render() {
    return n(
      'div',
      { class: 'gux-pagination-container' },
      n(
        'div',
        { class: 'gux-pagination-info' },
        n('gux-pagination-item-counts-beta', {
          'total-items': this.totalItems,
          'current-page': this.currentPage,
          'items-per-page': this.itemsPerPage,
        }),
        'advanced' === this.displayedLayout &&
          n('gux-pagination-items-per-page-beta', {
            'items-per-page': this.itemsPerPage,
            onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this),
          }),
      ),
      n('div', { class: 'gux-pagination-spacer' }),
      n(
        'div',
        { class: 'gux-pagination-change' },
        n('gux-pagination-buttons-beta', {
          layout: this.displayedLayout,
          'current-page': this.currentPage,
          'total-pages': this.totalPages,
          onInternalcurrentpagechange: this.handleInternalcurrentpagechange.bind(this),
        }),
      ),
    );
  }
  get root() {
    return e(this);
  }
};
r.style =
  ':host{display:block;border-top:1px solid #e2e6ee}.gux-pagination-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:space-between;height:40px;margin:12px 12px 0 12px}.gux-pagination-container .gux-pagination-info{display:flex;flex:0 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:flex-start;order:0}.gux-pagination-container .gux-pagination-info>*{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-spacer{flex:1 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change:first-child{margin-left:0}';
export { r as gux_pagination_beta };

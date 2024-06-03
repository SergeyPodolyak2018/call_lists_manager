import { r as t, c as i, h as n, g as a } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
const s = class {
  constructor(n) {
    t(this, n),
      (this.guxpaginationchange = i(this, 'guxpaginationchange', 7)),
      (this.currentPage = 1),
      (this.totalItems = 0),
      (this.itemsPerPage = 25),
      (this.layout = 'full'),
      (this.totalPages = void 0);
  }
  setPage(t) {
    if (t <= 0) return void this.setPage(1);
    const i = this.calculateTotalPages();
    t > i
      ? this.setPage(i)
      : ((this.currentPage = t),
        this.guxpaginationchange.emit({ currentPage: this.currentPage, itemsPerPage: this.itemsPerPage }));
  }
  calculateTotalPages() {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }
  calculateCurrentPage() {
    return Math.max(this.totalPages > 0 ? 1 : 0, Math.min(this.currentPage, this.totalPages));
  }
  handleInternalitemsperpagechange(t) {
    (this.itemsPerPage = t.detail), this.setPage(1);
  }
  handleInternalcurrentpagechange(t) {
    this.setPage(t.detail);
  }
  getPaginationInfoElement(t) {
    if ('expanded' === t) return null;
    const i = [
      n('gux-pagination-item-counts', {
        'total-items': this.totalItems,
        'current-page': this.currentPage,
        'items-per-page': this.itemsPerPage,
      }),
    ];
    return (
      'full' === t &&
        i.push(
          n('gux-pagination-items-per-page', {
            'items-per-page': this.itemsPerPage,
            onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this),
          }),
        ),
      n('div', { class: 'gux-pagination-info' }, i)
    );
  }
  componentWillLoad() {
    e(this.root, { variant: this.layout });
  }
  componentWillRender() {
    (this.totalPages = this.calculateTotalPages()), (this.currentPage = this.calculateCurrentPage());
  }
  render() {
    return n(
      'div',
      { class: 'gux-pagination-container' },
      this.getPaginationInfoElement(this.layout),
      n(
        'div',
        { class: 'gux-pagination-change' },
        n('gux-pagination-buttons', {
          layout: this.layout,
          'current-page': this.currentPage,
          'total-pages': this.totalPages,
          onInternalcurrentpagechange: this.handleInternalcurrentpagechange.bind(this),
        }),
      ),
    );
  }
  get root() {
    return a(this);
  }
};
s.style =
  ':host{display:block;border-top:1px solid #e2e6ee}.gux-pagination-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:space-between;height:32px;margin-top:12px}.gux-pagination-container .gux-pagination-info{display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:flex-start;order:0}.gux-pagination-container .gux-pagination-info>*{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change{flex:1 1 auto;align-self:auto;order:0;margin-left:16px}.gux-pagination-container .gux-pagination-change:first-child{margin-left:0}';
export { s as gux_pagination };

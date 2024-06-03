import { r as t, c as n, h as i, g as a } from './p-9031eb6a.js';
import { b as o } from './p-54ad2682.js';
import { t as e } from './p-89af02eb.js';
import { b as s } from './p-091f51f6.js';
import './p-8a133b9b.js';
class r {
  static displayAllPageButtons(t, n, i) {
    switch (i) {
      case 'advanced':
        return (function (t, n) {
          if (n <= 7)
            return [...Array(n).keys()].map(n => {
              const i = n + 1;
              return { pageNumber: i, display: String(i), current: i === t };
            });
          if (t <= 3)
            return [
              ...[...Array(5).keys()].map(n => {
                const i = n + 1;
                return { pageNumber: i, display: String(i), current: i === t };
              }),
              { pageNumber: 6, display: '...', current: !1 },
              { pageNumber: n, display: String(n), current: !1 },
            ];
          if (t > n - 3) {
            const i = [...Array(5).keys()].map(i => {
              const a = i + n - 4;
              return { pageNumber: a, display: String(a), current: a === t };
            });
            return [
              { pageNumber: 1, display: '1', current: !1 },
              { pageNumber: n - 6, display: '...', current: !1 },
              ...i,
            ];
          }
          const i = [...Array(3).keys()].map(n => {
            const i = n + t - 1;
            return { pageNumber: i, display: String(i), current: i === t };
          });
          return [
            { pageNumber: 1, display: '1', current: !1 },
            { pageNumber: t - 3, display: '...', current: !1 },
            ...i,
            { pageNumber: t + 3, display: '...', current: !1 },
            { pageNumber: n, display: String(n), current: !1 },
          ];
        })(t, n);
      case 'simple':
        return (function (t, n) {
          return n <= 3
            ? [...Array(n).keys()].map(n => {
                const i = n + 1;
                return { pageNumber: i, display: String(i), current: i === t };
              })
            : n >= 4
            ? [
                ...[...Array(1).keys()].map(i => {
                  const a = i + t;
                  return { pageNumber: a, display: String(a), current: a !== n };
                }),
                { pageNumber: t, display: '...', current: !1 },
                { pageNumber: n, display: String(n), current: n == t },
              ]
            : void 0;
        })(t, n);
    }
  }
}
const u = class {
  constructor(i) {
    t(this, i),
      (this.internalcurrentpagechange = n(this, 'internalcurrentpagechange', 3)),
      (this.currentPage = void 0),
      (this.totalPages = void 0),
      (this.layout = 'advanced');
  }
  goToPageHandler(t) {
    (this.currentPage = t.detail),
      this.handlePageChange(this.currentPage),
      s(() => {
        this.currentElement.focus();
      });
  }
  get onFirstPage() {
    return this.currentPage <= 1;
  }
  get onLastPage() {
    return this.currentPage >= this.totalPages;
  }
  handleClickFirst() {
    this.internalcurrentpagechange.emit(1);
  }
  handleClickPrevious() {
    this.internalcurrentpagechange.emit(this.currentPage - 1);
  }
  handleClickNext() {
    this.internalcurrentpagechange.emit(this.currentPage + 1);
  }
  handleClickLast() {
    this.internalcurrentpagechange.emit(this.totalPages);
  }
  handlePageChange(t) {
    this.internalcurrentpagechange.emit(t);
  }
  getPageListEnteries(t, n, a) {
    return r
      .displayAllPageButtons(t, n, a)
      .reduce(
        (t, n) =>
          t.concat(
            n.current
              ? i(
                  'button',
                  { ref: t => (this.currentElement = t), class: 'gux-pagination-buttons-list-current' },
                  n.display,
                )
              : '...' == n.display
              ? i('gux-pagination-ellipsis-button', { totalPages: this.totalPages })
              : i(
                  'button',
                  { class: 'gux-pagination-buttons-list-target', onClick: () => this.handlePageChange(n.pageNumber) },
                  n.display,
                ),
          ),
        [],
      );
  }
  getPageNavigation() {
    return i(
      'div',
      { class: 'gux-pagination-buttons-list-container' },
      this.getPageListEnteries(this.currentPage, this.totalPages, this.layout),
    );
  }
  async componentWillLoad() {
    this.i18n = await o(this.root, e);
  }
  render() {
    return i(
      'div',
      { class: `gux-pagination-buttons-container gux-${this.layout}` },
      i(
        'div',
        { class: 'gux-pagination-buttons-group' },
        i(
          'gux-button-slot-beta',
          { accent: 'ghost' },
          i(
            'button',
            { title: this.i18n('first'), disabled: this.onFirstPage, onClick: this.handleClickFirst.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-double-left' }),
          ),
        ),
        i(
          'gux-button-slot-beta',
          { accent: 'ghost' },
          i(
            'button',
            { title: this.i18n('previous'), disabled: this.onFirstPage, onClick: this.handleClickPrevious.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-left' }),
          ),
        ),
      ),
      this.getPageNavigation(),
      i(
        'div',
        { class: 'gux-pagination-buttons-group' },
        i(
          'gux-button-slot-beta',
          { accent: 'ghost' },
          i(
            'button',
            { title: this.i18n('next'), disabled: this.onLastPage, onClick: this.handleClickNext.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-right' }),
          ),
        ),
        i(
          'gux-button-slot-beta',
          { accent: 'ghost' },
          i(
            'button',
            { title: this.i18n('last'), disabled: this.onLastPage, onClick: this.handleClickLast.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-double-right' }),
          ),
        ),
      ),
    );
  }
  get root() {
    return a(this);
  }
};
u.style =
  'gux-pagination-buttons-beta{color:#2e394c}gux-pagination-buttons-beta .gux-pagination-buttons-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-end}gux-pagination-buttons-beta .gux-pagination-buttons-container>div{flex:0 1 auto;align-self:auto;order:0}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-group{white-space:nowrap}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-group gux-button-slot-beta:not(:first-of-type){margin-right:8px;margin-left:8px}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;margin:0 16px}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container .gux-pagination-buttons-input{width:60px;margin:0 8px}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container .gux-pagination-buttons-input input{width:inherit;text-align:center}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container{display:flex;flex-direction:row;flex-shrink:0;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-current,gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target{min-width:28px;min-height:24px;padding:2px 4px;margin:0;background:inherit;border:none}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-current:focus-visible,gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target:focus-visible{border:3px solid #aac9ff;border-radius:4px;outline:none}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-current{background-color:#eff1f5;border-radius:4px;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target{font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;color:#6b7585;cursor:pointer}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target:hover{background-color:#d7dce5;border-radius:4px;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}';
const g = { itemCountDisplay: '{firstItem, number} - {lastItem, number}', totalItems: ' of {totalItems, number}' },
  p = class {
    constructor(n) {
      t(this, n), (this.totalItems = 0), (this.currentPage = 0), (this.itemsPerPage = 25);
    }
    get firstItem() {
      return this.totalItems < 1 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    }
    get lastItem() {
      return this.totalItems < 1 ? 0 : Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    }
    async componentWillLoad() {
      this.i18n = await o(this.root, g);
    }
    getPaginationItemCountsRange() {
      if (this.totalItems) return i('span', null, this.i18n('totalItems', { totalItems: this.totalItems }));
    }
    render() {
      return i(
        'div',
        { class: 'gux-pagination-item-counts-container' },
        i(
          'span',
          { class: 'gux-pagination-item-counts-range' },
          this.i18n('itemCountDisplay', { firstItem: this.firstItem, lastItem: this.lastItem }),
        ),
        this.getPaginationItemCountsRange(),
      );
    }
    get root() {
      return a(this);
    }
  };
p.style =
  'gux-pagination-item-counts-beta{color:#2e394c}gux-pagination-item-counts-beta .gux-pagination-item-counts-container{margin-right:16px;white-space:nowrap}gux-pagination-item-counts-beta .gux-pagination-item-counts-container .gux-pagination-item-counts-range{font-weight:bold}';
export { u as gux_pagination_buttons_beta, p as gux_pagination_item_counts_beta };

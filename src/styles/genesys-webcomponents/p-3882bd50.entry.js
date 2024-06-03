import { r as t, c as n, h as i, g as a } from './p-9031eb6a.js';
import { b as e } from './p-54ad2682.js';
import './p-8a133b9b.js';
const o = {
  page: 'Page',
  totalPages: ' of {totalPages, number}',
  first: 'First',
  previous: 'Previous',
  next: 'Next',
  last: 'Last',
  pageInputLabel: 'Page {currentPage, number} of {totalPages, number}',
};
class s {
  static getPageList(t, n) {
    if (n <= 10)
      return [...Array(n).keys()].map(n => {
        const i = n + 1;
        return { pageNumber: i, display: String(i), current: i === t };
      });
    if (t <= 5)
      return [
        ...[...Array(6).keys()].map(n => {
          const i = n + 1;
          return { pageNumber: i, display: String(i), current: i === t };
        }),
        { pageNumber: 7, display: '...', current: !1 },
        { pageNumber: n, display: String(n), current: !1 },
      ];
    if (t > n - 5) {
      const i = [...Array(6).keys()].map(i => {
        const a = i + n - 5;
        return { pageNumber: a, display: String(a), current: a === t };
      });
      return [{ pageNumber: 1, display: '1', current: !1 }, { pageNumber: n - 6, display: '...', current: !1 }, ...i];
    }
    const i = [...Array(5).keys()].map(n => {
      const i = n + t - 2;
      return { pageNumber: i, display: String(i), current: i === t };
    });
    return [
      { pageNumber: 1, display: '1', current: !1 },
      { pageNumber: t - 3, display: '...', current: !1 },
      ...i,
      { pageNumber: t + 3, display: '...', current: !1 },
      { pageNumber: n, display: String(n), current: !1 },
    ];
  }
}
const r = class {
  constructor(i) {
    t(this, i),
      (this.internalcurrentpagechange = n(this, 'internalcurrentpagechange', 3)),
      (this.currentPage = void 0),
      (this.totalPages = void 0),
      (this.layout = 'full');
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
  handleClickPage(t) {
    this.internalcurrentpagechange.emit(t);
  }
  setPageFromInput(t) {
    const n = parseInt(t, 10);
    !n || isNaN(n) ? (this.textFieldRef.value = String(this.currentPage)) : this.internalcurrentpagechange.emit(n);
  }
  getPageListEnteries(t, n) {
    return s.getPageList(t, n).reduce(
      (t, n) =>
        t.concat(
          i(
            'button',
            n.current
              ? { class: 'gux-pagination-buttons-list-button gux-current' }
              : {
                  class: 'gux-pagination-buttons-list-button gux-target',
                  onClick: () => this.handleClickPage(n.pageNumber),
                },
            n.display,
          ),
        ),
      [],
    );
  }
  getSmallPagePicker() {
    return i('div', { class: 'gux-pagination-buttons-spacer' });
  }
  getExpandedPagePicker() {
    return i(
      'div',
      { class: 'gux-pagination-buttons-list-container' },
      this.getPageListEnteries(this.currentPage, this.totalPages),
    );
  }
  getFullPagePicker() {
    return i(
      'div',
      { class: 'gux-pagination-buttons-input-container' },
      i('div', null, this.i18n('page')),
      i(
        'div',
        { class: 'gux-pagination-buttons-input' },
        i(
          'gux-form-field-text-like',
          { 'label-position': 'screenreader' },
          i(
            'label',
            { slot: 'label' },
            this.i18n('pageInputLabel', { currentPage: this.currentPage, totalPages: this.totalPages }),
          ),
          i('input', {
            type: 'text',
            slot: 'input',
            value: String(this.currentPage),
            ref: t => (this.textFieldRef = t),
            onChange: () => this.setPageFromInput(this.textFieldRef.value),
          }),
        ),
      ),
      i('div', null, this.i18n('totalPages', { totalPages: this.totalPages })),
    );
  }
  getPagePicker(t) {
    return 'small' === t
      ? this.getSmallPagePicker()
      : 'expanded' === t
      ? this.getExpandedPagePicker()
      : this.getFullPagePicker();
  }
  async componentWillLoad() {
    this.i18n = await e(this.root, o);
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
          { accent: 'secondary' },
          i(
            'button',
            { title: this.i18n('first'), disabled: this.onFirstPage, onClick: this.handleClickFirst.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-double-left' }),
          ),
        ),
        i(
          'gux-button-slot-beta',
          { accent: 'secondary' },
          i(
            'button',
            { title: this.i18n('previous'), disabled: this.onFirstPage, onClick: this.handleClickPrevious.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-left' }),
          ),
        ),
      ),
      this.getPagePicker(this.layout),
      i(
        'div',
        { class: 'gux-pagination-buttons-group' },
        i(
          'gux-button-slot-beta',
          { accent: 'secondary' },
          i(
            'button',
            { title: this.i18n('next'), disabled: this.onLastPage, onClick: this.handleClickNext.bind(this) },
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-right' }),
          ),
        ),
        i(
          'gux-button-slot-beta',
          { accent: 'secondary' },
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
r.style =
  'gux-pagination-buttons{color:#2e394c}gux-pagination-buttons .gux-pagination-buttons-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-end}gux-pagination-buttons .gux-pagination-buttons-container.gux-expanded{justify-content:center}gux-pagination-buttons .gux-pagination-buttons-container>div{flex:0 1 auto;align-self:auto;order:0}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-group{white-space:nowrap}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-group gux-button-slot-beta:not(:first-of-type){margin-left:4px}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-input-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;margin:0 16px}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-input-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-input-container .gux-pagination-buttons-input{width:60px;margin:0 8px}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-input-container .gux-pagination-buttons-input input{width:inherit;text-align:center}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-list-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;margin:0 16px}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-button{height:32px;padding:0 4px;margin:0 4px;background:inherit;border:none;border-radius:2px}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-button:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-button.gux-current{font-weight:600}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-button.gux-target{color:#2a60c8;cursor:pointer}gux-pagination-buttons .gux-pagination-buttons-container .gux-pagination-buttons-spacer{width:12px}';
const g = { itemCountDisplay: '{firstItem, number} - {lastItem, number}', totalItems: ' of {totalItems, number}' },
  u = class {
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
      this.i18n = await e(this.root, g);
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
        i('span', null, this.i18n('totalItems', { totalItems: this.totalItems })),
      );
    }
    get root() {
      return a(this);
    }
  };
u.style =
  'gux-pagination-item-counts{color:#2e394c}gux-pagination-item-counts .gux-pagination-item-counts-container{white-space:nowrap}gux-pagination-item-counts .gux-pagination-item-counts-container .gux-pagination-item-counts-range{font-weight:bold}';
const p = {
    perPage: 'per page',
    itemsPerPage: 'Items per page',
    rangeSelected: 'Items per page dropdown, {range} selected',
  },
  c = class {
    constructor(i) {
      t(this, i),
        (this.internalitemsperpagechange = n(this, 'internalitemsperpagechange', 3)),
        (this.itemsPerPage = 25);
    }
    handleChange(t) {
      t.stopPropagation();
      const n = parseInt(this.dropdownElement.value, 10);
      this.internalitemsperpagechange.emit(n);
    }
    async componentWillLoad() {
      this.i18n = await e(this.root, p);
    }
    getDropdown() {
      return i(
        'gux-dropdown',
        {
          ref: t => (this.dropdownElement = t),
          value: `${this.itemsPerPage}`,
          'aria-label': this.i18n('rangeSelected', { range: this.itemsPerPage }),
        },
        i(
          'gux-listbox',
          { 'aria-label': this.i18n('itemsPerPage') },
          i('gux-option', { value: '25' }, '25'),
          i('gux-option', { value: '50' }, '50'),
          i('gux-option', { value: '75' }, '75'),
          i('gux-option', { value: '100' }, '100'),
        ),
      );
    }
    render() {
      return i(
        'div',
        { class: 'gux-pagination-items-per-page-container' },
        i('div', { class: 'gux-pagination-items-per-page-picker' }, this.getDropdown()),
        i('div', null, this.i18n('perPage')),
      );
    }
    get root() {
      return a(this);
    }
  };
c.style =
  'gux-pagination-items-per-page{color:#2e394c}gux-pagination-items-per-page .gux-pagination-items-per-page-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}gux-pagination-items-per-page .gux-pagination-items-per-page-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-items-per-page .gux-pagination-items-per-page-container .gux-pagination-items-per-page-picker{margin:0 8px 0 16px}gux-pagination-items-per-page .gux-pagination-items-per-page-container .gux-pagination-items-per-page-picker gux-dropdown{display:inline-block;width:64px}';
export { r as gux_pagination_buttons, u as gux_pagination_item_counts, c as gux_pagination_items_per_page };

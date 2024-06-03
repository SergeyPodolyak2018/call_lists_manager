import { r as e, c as a, h as i, g as t } from './p-9031eb6a.js';
import { b as n } from './p-54ad2682.js';
import './p-8a133b9b.js';
const p = {
    perPage: 'per page',
    itemsPerPage: 'Items per page',
    rangeSelected: 'Items per page dropdown, {range} selected',
  },
  r = class {
    constructor(i) {
      e(this, i),
        (this.internalitemsperpagechange = a(this, 'internalitemsperpagechange', 3)),
        (this.itemsPerPage = 25);
    }
    handleChange(e) {
      e.stopPropagation();
      const a = parseInt(this.dropdownElement.value, 10);
      this.internalitemsperpagechange.emit(a);
    }
    async componentWillLoad() {
      this.i18n = await n(this.root, p);
    }
    getDropdown() {
      return i(
        'gux-dropdown',
        {
          ref: e => (this.dropdownElement = e),
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
      return t(this);
    }
  };
r.style =
  'gux-pagination-items-per-page-beta{color:#2e394c}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container .gux-pagination-items-per-page-picker{margin-right:8px}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container .gux-pagination-items-per-page-picker gux-dropdown{display:inline-block;width:64px}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container gux-dropdown div.gux-dropdown .gux-options.gux-opened{bottom:100%;display:flex;flex-direction:column-reverse}';
export { r as gux_pagination_items_per_page_beta };

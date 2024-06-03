import { r as t, c as s, h as e, g as i } from './p-9031eb6a.js';
import { b as o } from './p-54ad2682.js';
import { t as n } from './p-6a46bf1b.js';
import { g as r } from './p-8a133b9b.js';
import { o as a } from './p-93904222.js';
import { t as c } from './p-e310debb.js';
const h = class {
  constructor(e) {
    t(this, e),
      (this.guxsortchanged = s(this, 'guxsortchanged', 7)),
      (this.includeUnsorted = !1),
      (this.headerContent = void 0),
      (this.active = !1),
      (this.sort = 'none'),
      (this.isLeftAlignIcon = !1);
  }
  async componentWillLoad() {
    n(this.root),
      (this.i18n = await o(this.root, c, 'gux-table')),
      (this.tableHeader = r('th', this.root)),
      (this.thObserver = a(
        this.tableHeader,
        () => {
          this.setState();
        },
        { attributes: !0, childList: !1, subtree: !1 },
      )),
      this.setState();
  }
  disconnectedCallback() {
    this.thObserver && this.thObserver.disconnect();
  }
  onClick() {
    this.guxsortchanged.emit({
      columnName: this.tableHeader.dataset.columnName,
      sortDirection: this.getNextSort(this.sort),
    });
  }
  setState() {
    (this.headerContent = this.tableHeader.textContent),
      (this.isLeftAlignIcon =
        this.tableHeader.hasAttribute('data-cell-numeric') || this.tableHeader.hasAttribute('data-cell-action'));
    const t = this.tableHeader.getAttribute('aria-sort');
    switch (t) {
      case 'ascending':
      case 'descending':
        (this.active = !0), (this.sort = t);
        break;
      default:
        (this.active = !1), (this.sort = 'none');
    }
  }
  getIconName(t) {
    return 'descending' === t ? 'arrow-solid-up' : 'arrow-solid-down';
  }
  getNextSort(t) {
    switch (t) {
      case 'none':
        return 'ascending';
      case 'ascending':
        return 'descending';
      default:
        return this.includeUnsorted ? 'none' : 'ascending';
    }
  }
  getSRText(t) {
    switch (t) {
      case 'ascending':
        return this.i18n('ascendingColumnSort', { headerContent: this.headerContent });
      case 'descending':
        return this.i18n(this.includeUnsorted ? 'descendingColumnSortIncludeUnsorted' : 'descendingColumnSort', {
          headerContent: this.headerContent,
        });
      default:
        return this.i18n('noColumnSort', { headerContent: this.headerContent });
    }
  }
  render() {
    return e(
      'div',
      { class: 'gux-container' },
      e(
        'button',
        { class: { 'gux-sort-button': !0, 'gux-active': this.active }, type: 'button', onClick: () => this.onClick() },
        e('span', { class: 'gux-sr-only' }, this.getSRText(this.sort)),
        e('gux-icon', {
          class: { 'gux-sort-icon': !0, 'gux-left': this.isLeftAlignIcon },
          'icon-name': this.getIconName(this.sort),
          decorative: !0,
        }),
      ),
      e('div', { class: 'gux-resize-spacer' }),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return i(this);
  }
};
h.style =
  '.gux-container{position:absolute;inset:0;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start;border-top:3px solid transparent;border-bottom:3px solid transparent}.gux-container:focus-within{border-bottom-color:#75a8ff}.gux-container .gux-sort-button{all:unset;flex:1 1 auto;align-self:stretch;order:0;cursor:pointer}.gux-container .gux-sort-button .gux-sort-icon{float:right;width:16px;height:16px;margin:8px;color:#d7dce5}.gux-container .gux-sort-button .gux-sort-icon.gux-left{float:left}.gux-container .gux-sort-button.gux-active .gux-sort-icon{color:#2e394c}.gux-container .gux-resize-spacer{flex:0 1 auto;align-self:stretch;order:0;width:2px}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}';
export { h as gux_sort_control };

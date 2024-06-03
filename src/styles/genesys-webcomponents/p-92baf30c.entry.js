import { r as t, c as s, f as i, d as e, h, H as o, g as l } from './p-9031eb6a.js';
import { b as a } from './p-54ad2682.js';
import { w as r } from './p-76ff3e75.js';
import { r as n } from './p-cbcbd1bb.js';
import { t as c } from './p-6a46bf1b.js';
import { t as b } from './p-e310debb.js';
import './p-8a133b9b.js';
const u = class {
  constructor(e) {
    t(this, e),
      (this.guxselectionchanged = s(this, 'guxselectionchanged', 7)),
      (this.guxsortchanged = s(this, 'guxsortchanged', 7)),
      (this.slotObserver = new MutationObserver(() => i(this))),
      (this.tableId = n('gux-table')),
      (this.columnsWidths = {}),
      (this.tableWidth = this.getElementComputedWidth(this.slottedTable)),
      (this.isVerticalScroll = !1),
      (this.isHorizontalScroll = !1),
      (this.isScrolledToFirstCell = !0),
      (this.isScrolledToLastCell = !1),
      (this.columnResizeHover = !1),
      (this.compact = !1),
      (this.objectTable = !1),
      (this.emptyMessage = void 0),
      (this.resizableColumns = void 0);
  }
  async componentWillLoad() {
    c(this.root), (this.i18n = await a(this.root, b));
  }
  componentDidLoad() {
    this.resizableColumns && this.prepareResizableColumns(),
      this.prepareSelectableRows(),
      this.checkHorizontalScroll(),
      this.checkVerticalScroll(),
      !this.resizeObserver &&
        window.ResizeObserver &&
        (this.resizeObserver = new ResizeObserver(() => {
          e(() => {
            this.checkHorizontalScroll(),
              this.checkVerticalScroll(),
              this.updateScrollState(),
              this.scaleColumnWidths();
          });
        })),
      this.resizeObserver &&
        (this.resizeObserver.observe(this.tableContainer), this.resizeObserver.observe(this.slottedTable)),
      this.slotObserver.observe(this.slottedTable, { subtree: !0, childList: !0 });
  }
  disconnectedCallback() {
    this.resizeObserver &&
      (this.resizeObserver.unobserve(this.tableContainer), this.resizeObserver.unobserve(this.slottedTable)),
      this.resizableColumns && document.getElementById(`${this.tableId}-resizable-styles`).remove();
  }
  onScroll() {
    this.updateScrollState();
  }
  onInternalAllRowSelectChange(t) {
    t.stopPropagation(), this.handleSelectAllRows();
  }
  onInternalRowSelectChange(t) {
    t.stopPropagation(), this.handleRowSelection(t.target);
  }
  onMouseMove(t) {
    this.resizableColumns && this.updateResizeState(t);
  }
  onMouseDown(t) {
    this.resizableColumns && this.maybeStartResizing(t);
  }
  onMouseUp() {
    this.resizableColumns && this.stopResizing();
  }
  get tableContainer() {
    return this.root.shadowRoot.querySelector('.gux-table-container');
  }
  get slottedTable() {
    return this.root.querySelector('table[slot="data"]');
  }
  get tableRows() {
    return Array.from(this.slottedTable.querySelectorAll('tbody tr'));
  }
  get tableColumns() {
    return Array.from(this.slottedTable.querySelectorAll('thead th'));
  }
  get rowCheckboxes() {
    return Array.from(this.slottedTable.querySelectorAll('tbody tr td gux-row-select'));
  }
  get selectAllCheckbox() {
    return this.slottedTable.querySelector('thead tr th gux-all-row-select');
  }
  async getSelected() {
    return this.getSelectedInternal();
  }
  getSelectedInternal() {
    return {
      selectedRowIds: Array.from(this.rowCheckboxes)
        .filter(t => t.selected)
        .map(t => t.closest('tr').getAttribute('data-row-id')),
    };
  }
  prepareSelectableRows() {
    this.rowCheckboxes.forEach(t => {
      this.updateRowSelection(t);
    }),
      this.updateSelectAllBoxState();
  }
  updateSelectAllBoxState() {
    const t = this.selectAllCheckbox;
    if (t) {
      const s = this.rowCheckboxes,
        i = s.filter(t => 0 == t.hasAttribute('disabled')),
        e = i.filter(t => t.selected),
        h = Boolean(s.length),
        o = e.length === i.length,
        l = 0 === e.length;
      (t.selected = h && o), t.setIndeterminate(h && !o && !l);
    }
  }
  handleSelectAllRows() {
    const t = this.selectAllCheckbox;
    this.rowCheckboxes.forEach(s => {
      s.hasAttribute('disabled') || ((s.selected = t.selected), this.updateRowSelection(s));
    }),
      this.emitSelectionEvent();
  }
  handleRowSelection(t) {
    this.updateRowSelection(t), this.updateSelectAllBoxState(), this.emitSelectionEvent();
  }
  emitSelectionEvent() {
    this.guxselectionchanged.emit(this.getSelectedInternal());
  }
  updateRowSelection(t) {
    const s = t.closest('tr');
    t.selected ? s.setAttribute('data-selected-row', '') : s.removeAttribute('data-selected-row');
  }
  nextColumn() {
    const t = this.tableColumns,
      s = this.tableContainer.getBoundingClientRect();
    let i =
      (t.find(t => t.getBoundingClientRect().right > s.right) || t[t.length - 1]).getBoundingClientRect().right -
      s.right;
    i > s.width && (i = 0.9 * s.width), (this.tableContainer.scrollLeft += Math.ceil(i)), this.updateScrollState();
  }
  previousColumn() {
    const t = this.tableColumns,
      s = this.tableContainer.getBoundingClientRect(),
      i = (t.reverse().find(t => t.getBoundingClientRect().left < s.left) || t[0]).getBoundingClientRect();
    let e = s.left - i.left;
    e > s.width && (e = 0.9 * s.width), (this.tableContainer.scrollLeft += -Math.ceil(e)), this.updateScrollState();
  }
  updateScrollState() {
    const t = this.tableContainer.scrollLeft,
      s = this.tableContainer.scrollWidth - this.tableContainer.clientWidth;
    (this.isScrolledToFirstCell = 0 === t), (this.isScrolledToLastCell = s - t - this.tableScrollbarConstant <= 0);
  }
  checkHorizontalScroll() {
    const t = this.slottedTable.getBoundingClientRect().width,
      s = this.root.getBoundingClientRect().width;
    this.isHorizontalScroll = t > s;
  }
  checkVerticalScroll() {
    const t = this.tableContainer;
    this.isVerticalScroll = t.scrollHeight > t.clientHeight;
  }
  get tableScrollbarConstant() {
    const t = this.tableContainer;
    return t ? t.offsetWidth - t.clientWidth : 0;
  }
  prepareResizableColumns() {
    const t = document.createElement('style');
    (t.id = `${this.tableId}-resizable-styles`), document.querySelector('head').appendChild(t);
    const s = this.calculateColumnWidths(this.tableColumns);
    (this.tableWidth = this.getElementComputedWidth(this.slottedTable)),
      s.slice(0, -1).forEach(t => (this.columnsWidths[t.name] = t.width)),
      this.setResizableColumnsStyles();
  }
  scaleColumnWidths() {
    if (!this.columnResizeState && this.resizableColumns && !this.isHorizontalScroll) {
      const t = this.calculateColumnWidths(this.tableColumns),
        s = this.tableWidth,
        i = this.getElementComputedWidth(this.slottedTable);
      t
        .map(t => Object.assign(Object.assign({}, t), { width: this.calcScaledColWidth(t.width, s, i) }))
        .slice(0, -1)
        .forEach(t => (this.columnsWidths[t.name] = t.width)),
        (this.tableWidth = i),
        this.setResizableColumnsStyles();
    }
  }
  calcScaledColWidth(t, s, i) {
    const e = Math.round((t / s) * i);
    return Math.max(e, 1);
  }
  updateResizeState(t) {
    if (this.columnResizeState) {
      const s = this.columnResizeState.resizableColumn.dataset.columnName,
        i = Math.max(
          this.columnResizeState.resizableColumnInitialWidth +
            (t.pageX - this.columnResizeState.columnResizeMouseStartX),
          1,
        ),
        e = this.calculateColumnWidths(this.tableColumns).map(t =>
          t.name === s ? Object.assign(Object.assign({}, t), { width: i }) : t,
        );
      (this.columnsWidths[s] = e.find(t => t.name === s).width),
        this.setResizableColumnsStyles(),
        (this.tableWidth = this.getElementComputedWidth(this.slottedTable));
    } else
      (this.columnResizeHover = !1),
        r('th', t, s => {
          this.tableColumns.length - 1 !== s.cellIndex && this.isInResizeZone(t, s) && (this.columnResizeHover = !0);
        });
  }
  maybeStartResizing(t) {
    r('th', t, s => {
      this.isInResizeZone(t, s) &&
        (this.columnResizeState = {
          resizableColumn: s,
          columnResizeMouseStartX: t.pageX,
          resizableColumnInitialWidth: this.getElementComputedWidth(s),
        });
    });
  }
  stopResizing() {
    this.columnResizeState && (this.columnResizeState = null);
  }
  isInResizeZone(t, s) {
    return s.getBoundingClientRect().right - t.clientX < 3;
  }
  getElementComputedWidth(t) {
    return (
      t.clientWidth -
      parseInt(window.getComputedStyle(t).paddingLeft) -
      parseInt(window.getComputedStyle(t).paddingRight)
    );
  }
  calculateColumnWidths(t) {
    return t.map(t => ({ name: t.dataset.columnName, width: this.getElementComputedWidth(t) }));
  }
  setResizableColumnsStyles() {
    const t = document.getElementById(`${this.tableId}-resizable-styles`);
    let s = '';
    Object.keys(this.columnsWidths).forEach(t => {
      s += `[gs-table-id=${this.tableId}] th[data-column-name="${t}"]{\n        width:${String(
        this.columnsWidths[t],
      )}px;\n        min-width:${String(this.columnsWidths[t])}px;\n      }`;
    }),
      (t.innerHTML = s);
  }
  get isTableEmpty() {
    return !this.root.children[0] || this.tableRows.length < 1;
  }
  get tableContainerClasses() {
    return {
      'gux-table-container': !0,
      'gux-column-resizing': Boolean(this.columnResizeState),
      'gux-column-resizing-hover': this.columnResizeHover,
    };
  }
  render() {
    return h(
      o,
      {
        'gs-table-id': this.tableId,
        'gs-v-scroll': this.isVerticalScroll,
        'gs-h-scroll': this.isHorizontalScroll,
        'gs-obj-table': this.objectTable,
        'gs-compact': this.compact,
      },
      h(
        'div',
        { class: 'gux-table' },
        h(
          'div',
          { tabindex: this.isVerticalScroll ? '0' : '-1', id: this.tableId, class: this.tableContainerClasses },
          h('slot', { name: 'data' }),
        ),
        this.isHorizontalScroll &&
          h(
            'gux-button-slot-beta',
            { accent: 'secondary' },
            h(
              'button',
              {
                class: 'gux-table-scroll-left',
                disabled: this.isScrolledToFirstCell,
                onClick: !this.isScrolledToFirstCell && this.previousColumn.bind(this),
              },
              h('gux-icon', { 'icon-name': 'chevron-left', 'screenreader-text': this.i18n('scrollLeft') }),
            ),
          ),
        this.isHorizontalScroll &&
          h(
            'gux-button-slot-beta',
            { accent: 'secondary', style: { marginRight: `${this.tableScrollbarConstant}px` } },
            h(
              'button',
              {
                class: 'gux-table-scroll-right',
                disabled: this.isScrolledToLastCell,
                style: { marginRight: `${this.tableScrollbarConstant}px` },
                onClick: !this.isScrolledToLastCell && this.nextColumn.bind(this),
              },
              h('gux-icon', { 'icon-name': 'chevron-right', 'screenreader-text': this.i18n('scrollRight') }),
            ),
          ),
        this.isTableEmpty && h('div', { class: 'gux-empty-table' }, this.emptyMessage || this.i18n('emptyMessage')),
      ),
    );
  }
  get root() {
    return l(this);
  }
};
u.style =
  ':host{display:block;isolation:isolate}:host .gux-table{position:relative;height:inherit}:host .gux-table .gux-table-scroll-left,:host .gux-table .gux-table-scroll-right{position:absolute;top:0;z-index:1;display:flex;align-items:center;justify-content:center;width:24px;min-width:0;height:40px;padding:0;color:#2e394c;cursor:pointer;border-radius:4px}:host .gux-table .gux-table-scroll-left gux-icon,:host .gux-table .gux-table-scroll-right gux-icon{width:8px;height:8px}:host .gux-table .gux-table-scroll-left{border-top-left-radius:0;border-bottom-left-radius:0}:host .gux-table .gux-table-scroll-right{right:0;border-top-right-radius:0;border-bottom-right-radius:0}:host .gux-table .gux-table-container{width:100%;max-height:100%;overflow-x:hidden;scrollbar-color:rgba(32, 41, 55, 0.24) #fdfdfd;scrollbar-width:thin}:host .gux-table .gux-table-container::-webkit-scrollbar{width:4px}:host .gux-table .gux-table-container::-webkit-scrollbar-track{background:#fdfdfd}:host .gux-table .gux-table-container::-webkit-scrollbar-thumb{background:rgba(32, 41, 55, 0.24)}:host .gux-table .gux-table-container::-webkit-scrollbar-thumb:hover{background:rgba(32, 41, 55, 0.48)}:host .gux-table .gux-table-container.gux-column-resizing-hover,:host .gux-table .gux-table-container.gux-column-resizing{cursor:col-resize}:host .gux-empty-table{display:flex;align-items:center;justify-content:center;height:calc(100% - 40px);min-height:150px;color:#596373;background:#fdfdfd;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px}';
export { u as gux_table_beta };

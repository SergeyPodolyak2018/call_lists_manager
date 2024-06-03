import { r as t, c as o, h as e, H as r, g as i } from './p-9031eb6a.js';
import { b as n } from './p-54ad2682.js';
import { c as s } from './p-62913396.js';
import './p-8a133b9b.js';
import './p-9dd4b14a.js';
import './p-d176c2ae.js';
const a = { activateReordering: 'Activate reordering mode for {columnName} column' },
  c = class {
    constructor(e) {
      t(this, e),
        (this.internal_order_change = o(this, 'internal_order_change', 7)),
        (this.internal_keyboard_reorder_start = o(this, 'internal_keyboard_reorder_start', 7)),
        (this.internal_keyboard_reorder_move = o(this, 'internal_keyboard_reorder_move', 7)),
        (this.internal_keyboard_reorder_emit = o(this, 'internal_keyboard_reorder_emit', 7)),
        (this.internal_keyboard_reorder_finish = o(this, 'internal_keyboard_reorder_finish', 7)),
        (this.orderId = void 0),
        (this.highlightActive = void 0),
        (this.highlight = void 0),
        (this.text = void 0),
        (this.pendingReorder = 'none'),
        (this.isDragging = !1),
        (this.isReordering = !1);
    }
    async guxSetHighlight(t = '', o = !1) {
      (this.highlight = t), (this.highlightActive = o);
    }
    async guxFocus() {
      this.reorderButtonElement.focus();
    }
    onBlur() {
      this.setReorderMode(!1);
    }
    onDragStart(t) {
      this.isDragging = !0;
      const o = s(this.root);
      t.dataTransfer.setData('oldIndex', String(o)), (t.dataTransfer.effectAllowed = 'move');
    }
    onDragEnter(t) {
      (t.dataTransfer.dropEffect = 'move'), (this.pendingReorder = this.mouseOnTopHalf(t) ? 'above' : 'below');
    }
    onDragOver(t) {
      t.preventDefault(), (this.pendingReorder = this.mouseOnTopHalf(t) ? 'above' : 'below');
    }
    onDragLeave() {
      this.pendingReorder = 'none';
    }
    onDragEnd() {
      this.isDragging = !1;
    }
    onDrop(t) {
      const o = Number(t.dataTransfer.getData('oldIndex')),
        e = s(this.root);
      t.stopPropagation(), t.stopImmediatePropagation(), (this.pendingReorder = 'none');
      const r = (function (t, o, e) {
        return t < o ? (e ? o - 1 : o) : e ? o : o + 1;
      })(o, e, this.mouseOnTopHalf(t));
      return this.internal_order_change.emit({ oldIndex: o, newIndex: r }), !1;
    }
    mouseOnTopHalf(t) {
      const o = this.root.getBoundingClientRect();
      return t.clientY - o.top <= (o.bottom - o.top) / 2;
    }
    onSlotChange() {
      this.text = this.root.querySelector('gux-form-field-checkbox label').textContent;
    }
    setReorderMode(t, o = !1) {
      this.isReordering !== t &&
        ((this.isReordering = t),
        t
          ? this.internal_keyboard_reorder_start.emit(this.text)
          : (o && this.internal_keyboard_reorder_emit.emit(), this.internal_keyboard_reorder_finish.emit()));
    }
    toggleReorderMode() {
      this.setReorderMode(!this.isReordering, !0);
    }
    keyboardReorder(t) {
      if (this.isReordering)
        switch (t.key) {
          case 'ArrowUp':
            t.preventDefault(), this.internal_keyboard_reorder_move.emit({ delta: -1, column: this.text });
            break;
          case 'ArrowDown':
            t.preventDefault(), this.internal_keyboard_reorder_move.emit({ delta: 1, column: this.text });
            break;
          case 'Home':
            t.preventDefault(), this.internal_keyboard_reorder_move.emit({ delta: -1 / 0, column: this.text });
            break;
          case 'End':
            t.preventDefault(),
              console.log('End'),
              this.internal_keyboard_reorder_move.emit({ delta: 1 / 0, column: this.text });
            break;
          case 'Escape':
            t.preventDefault(), this.setReorderMode(!1);
        }
    }
    async componentWillLoad() {
      this.i18n = await n(this.root, a);
    }
    render() {
      return e(
        r,
        { draggable: 'true' },
        e(
          'div',
          { class: { 'gux-container': !0, [`gux-drop-${this.pendingReorder}`]: !0, 'gux-dragging': this.isDragging } },
          e(
            'button',
            {
              class: { 'gux-reorder': !0, 'gux-reordering': this.isReordering },
              type: 'button',
              onClick: () => this.toggleReorderMode(),
              onKeyDown: t => this.keyboardReorder(t),
              ref: t => (this.reorderButtonElement = t),
            },
            e('gux-icon', { 'icon-name': 'grab-vertical', decorative: !0 }),
            e('span', { class: 'gux-sr-only' }, this.i18n('activateReordering', { columnName: this.text })),
          ),
          e(
            'div',
            { class: 'gux-select' },
            e('slot', { onSlotchange: () => this.onSlotChange() }),
            e('gux-text-highlight', {
              class: { 'gux-active': this.highlightActive },
              highlight: this.highlight,
              text: this.text,
              strategy: 'contains',
            }),
          ),
        ),
      );
    }
    get root() {
      return i(this);
    }
  };
c.style =
  ":host([gs-reorder-indicator='above']) .gux-container{border-top-color:#aac9ff}:host([gs-reorder-indicator='below']) .gux-container{border-bottom-color:#aac9ff}.gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;margin-bottom:-2px;border-top:2px solid transparent;border-bottom:2px solid transparent}.gux-container.gux-drop-above{border-top-color:#aac9ff}.gux-container.gux-drop-below{border-bottom-color:#aac9ff}.gux-container.gux-dragging{border-top-color:transparent;border-bottom-color:transparent;opacity:0.4}.gux-container .gux-reorder{all:unset;flex:0 1 auto;align-self:auto;order:0;margin-right:4px;color:#596373;cursor:grab;border-radius:4px}.gux-container .gux-reorder.gux-reordering:focus-visible gux-icon{color:#2a60c8}.gux-container .gux-reorder:active{pointer-events:none;cursor:grabbing !important}.gux-container .gux-reorder:hover,.gux-container .gux-reorder:focus-visible{outline:2px solid #aac9ff;outline-offset:0}.gux-container .gux-reorder:hover gux-icon,.gux-container .gux-reorder:focus-visible gux-icon{color:#2a60c8}.gux-container .gux-select{position:relative;flex:1 1 auto;align-self:auto;order:1}.gux-container .gux-select gux-text-highlight{position:absolute;top:2px;left:24px;color:transparent;pointer-events:none;opacity:0.25}.gux-container .gux-select gux-text-highlight.gux-active{opacity:1}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}";
export { c as gux_column_manager_item };

import { r as t, c as e, h as n, g as i } from './p-9031eb6a.js';
import { t as o } from './p-6a46bf1b.js';
import { b as s } from './p-54ad2682.js';
import './p-8a133b9b.js';
const a = { previous: 'Previous', next: 'Next' },
  r = class {
    constructor(n) {
      t(this, n),
        (this.guxPaginationCursorchange = e(this, 'guxPaginationCursorchange', 7)),
        (this.guxitemsperpagechange = e(this, 'guxitemsperpagechange', 7)),
        (this.hasPrevious = !1),
        (this.hasNext = !1),
        (this.itemsPerPage = void 0),
        (this.layout = 'simple');
    }
    handleInternalitemsperpagechange(t) {
      this.guxitemsperpagechange.emit(t.detail);
    }
    onButtonClick(t) {
      (('previous' === t && this.hasPrevious) || ('next' === t && this.hasNext)) &&
        this.guxPaginationCursorchange.emit(t);
    }
    async componentWillLoad() {
      o(this.root), (this.i18n = await s(this.root, a));
    }
    renderSimpleLayout() {
      return [
        n(
          'div',
          { role: 'navigation', class: 'gux-pagination-button-container' },
          n(
            'gux-button-slot-beta',
            { accent: 'ghost', class: 'gux-previous' },
            n(
              'button',
              {
                class: 'gux-simple-button',
                type: 'button',
                disabled: !this.hasPrevious,
                onClick: () => this.onButtonClick('previous'),
              },
              n('gux-icon', { iconName: 'chevron-small-left', 'screenreader-text': this.i18n('previous') }),
            ),
          ),
          n(
            'gux-button-slot-beta',
            { accent: 'ghost', class: 'gux-next' },
            n(
              'button',
              {
                class: 'gux-simple-button',
                type: 'button',
                disabled: !this.hasNext,
                onClick: () => this.onButtonClick('next'),
              },
              n('gux-icon', { iconName: 'chevron-small-right', 'screenreader-text': this.i18n('next') }),
            ),
          ),
        ),
      ];
    }
    renderAdvancedLayout() {
      return [
        n(
          'div',
          { role: 'navigation', class: 'gux-pagination-button-container' },
          n(
            'gux-button-slot-beta',
            { accent: 'ghost', class: 'gux-previous' },
            n(
              'button',
              { type: 'button', disabled: !this.hasPrevious, onClick: () => this.onButtonClick('previous') },
              n(
                'div',
                { class: 'gux-button-align-content' },
                n('gux-icon', { class: 'gux-icon-previous', decorative: !0, iconName: 'chevron-small-left' }),
                n('span', null, this.i18n('previous')),
              ),
            ),
          ),
          n(
            'gux-button-slot-beta',
            { accent: 'ghost', class: 'gux-next' },
            n(
              'button',
              { type: 'button', disabled: !this.hasNext, onClick: () => this.onButtonClick('next') },
              n(
                'div',
                { class: 'gux-button-align-content' },
                n('span', null, this.i18n('next')),
                n('gux-icon', { class: 'gux-icon-next', decorative: !0, iconName: 'chevron-small-right' }),
              ),
            ),
          ),
        ),
        this.renderItemsPerPage(),
      ];
    }
    renderItemsPerPage() {
      return (
        this.itemsPerPage &&
        n('gux-pagination-items-per-page-beta', {
          'items-per-page': this.itemsPerPage,
          onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this),
        })
      );
    }
    render() {
      return 'advanced' === this.layout ? this.renderAdvancedLayout() : this.renderSimpleLayout();
    }
    get root() {
      return i(this);
    }
  };
r.style =
  ':host{display:flex;flex-direction:row-reverse;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:space-between;padding:12px;border-top:1px solid #e2e6ee}:host .gux-pagination-button-container{display:flex;flex-wrap:nowrap;justify-content:space-between}:host button{color:#2e394c}:host button[disabled]{color:rgba(46, 57, 76, 0.5)}:host .gux-button-align-content{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:center;align-items:center;justify-content:center}:host .gux-button-align-content>*{flex:0 1 auto;align-self:auto;order:0}:host .gux-button-align-content>.gux-icon-previous{padding-right:4px}:host .gux-button-align-content>.gux-icon-next{padding-left:4px}:host gux-icon{width:16px;height:16px}:host gux-button-slot-beta.gux-previous{margin-right:12px}:host gux-button-slot-beta.gux-next{margin-left:12px}:host .gux-simple-button{padding:0}';
export { r as gux_pagination_cursor };

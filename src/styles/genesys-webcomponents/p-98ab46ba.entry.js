import { r as e, c as t, f as n, h as s, g as o } from './p-9031eb6a.js';
import { b as a } from './p-54ad2682.js';
import { t as r } from './p-6a46bf1b.js';
import { g as i, s as c, a as h, b as l, c as u, d, e as p, f as m, h as g } from './p-62913396.js';
import './p-8a133b9b.js';
import './p-9dd4b14a.js';
import './p-d176c2ae.js';
const x = {
    search: 'Search column',
    searchResults: 'search results',
    selectedColumnCount: '{count}/{total} Columns Selected',
    selectAllColumnsScreenReader: '{count} of {total} columns selected: check checkbox to select all {total} columns',
    unselectAllColumnsScreenReader:
      '{count} of {total} columns selected: uncheck checkbox to unselect all {total} columns',
    movePositionPrompt:
      'Press space or enter to move the {columnName} column to position {newPositionNumber} from position {oldPositionNumber}.',
    reorderingModeActive:
      'Reordering mode active. Reposition the {columnName} column using the up arrow key, the down arrow key, the home key and the end key. Press Escape to deactivate reordering mode.',
  },
  b = class {
    constructor(n) {
      e(this, n),
        (this.guxorderchange = t(this, 'guxorderchange', 7)),
        (this.highlightResults = { matchCount: 0, currentMatch: 0 }),
        (this.keyboardOrderChange = i());
    }
    watchKeyboardOrderChange() {
      c(this.root, this.keyboardOrderChange);
    }
    async componentWillLoad() {
      r(this.root), (this.i18n = await a(this.root, x));
    }
    componentDidLoad() {
      h(this.root, this.mainCheckboxElement);
    }
    handleInternalorderchange(e) {
      e.stopPropagation(), this.emitOrderChange(e.detail);
    }
    emitOrderChange(e) {
      const { oldIndex: t, newIndex: n } = e;
      if (t !== n) {
        const t = l(this.root, e);
        this.guxorderchange.emit(t);
      }
    }
    handleInternalkeyboardorderstart(e) {
      e.stopPropagation();
      const t = e.detail,
        n = u(e.target);
      (this.keyboardOrderChange = { oldIndex: n, newIndex: n }),
        this.announceElement.guxAnnounce(this.i18n('reorderingModeActive', { columnName: t }));
    }
    handleInternalkeyboardreordermove(e) {
      e.stopPropagation();
      const { delta: t, column: n } = e.detail;
      (this.keyboardOrderChange = d(this.root, this.keyboardOrderChange, t)),
        this.announceElement.guxAnnounce(
          this.i18n('movePositionPrompt', {
            columnName: n,
            newPositionNumber: this.keyboardOrderChange.newIndex + 1,
            oldPositionNumber: this.keyboardOrderChange.oldIndex + 1,
          }),
        );
    }
    handleInternalkeyboarddoreorder(e) {
      e.stopPropagation(), this.emitOrderChange(this.keyboardOrderChange), e.target.guxFocus();
    }
    handleInternalkeyboardorderfinish(e) {
      e.stopPropagation(), (this.keyboardOrderChange = i());
    }
    onSearchInput() {
      this.highlightResults = p(this.root, this.searchElement);
    }
    onGuxCurrentMatchChanged(e) {
      this.highlightResults = p(this.root, this.searchElement, e.detail);
    }
    onMainCheckboxChange() {
      m(this.root, this.mainCheckboxElement.checked), n(this.root);
    }
    onListChange() {
      h(this.root, this.mainCheckboxElement), n(this.root);
    }
    onSlotChange() {
      this.onListChange();
    }
    renderSelectedColumnCount() {
      const { count: e, total: t } = g(this.root);
      return s(
        'div',
        null,
        s('span', { 'aria-hidden': 'true' }, this.i18n('selectedColumnCount', { count: e, total: t })),
        s(
          'span',
          { class: 'gux-sr-only' },
          s(
            'span',
            null,
            ': ',
            this.i18n(e === t ? 'unselectAllColumnsScreenReader' : 'selectAllColumnsScreenReader', {
              count: e,
              total: t,
            }),
          ),
        ),
      );
    }
    render() {
      return s(
        'div',
        { class: 'gux-container' },
        s(
          'div',
          { class: 'gux-sr-only', 'aria-live': 'polite' },
          `${this.highlightResults.matchCount} ${this.i18n('searchResults')}`,
        ),
        s(
          'div',
          { class: 'gux-search' },
          s(
            'gux-content-search',
            {
              'match-count': this.highlightResults.matchCount,
              'current-match': this.highlightResults.currentMatch,
              onGuxcurrentmatchchanged: e => this.onGuxCurrentMatchChanged(e),
            },
            s('input', {
              type: 'search',
              placeholder: this.i18n('search'),
              onInput: () => this.onSearchInput(),
              ref: e => (this.searchElement = e),
            }),
          ),
        ),
        s(
          'div',
          { class: 'gux-select' },
          s(
            'gux-form-field-checkbox',
            null,
            s('input', {
              slot: 'input',
              type: 'checkbox',
              ref: e => (this.mainCheckboxElement = e),
              onChange: () => this.onMainCheckboxChange(),
            }),
            s('label', { slot: 'label' }, this.renderSelectedColumnCount()),
          ),
        ),
        s(
          'div',
          { class: 'gux-list', onChange: () => this.onListChange() },
          s('slot', { onSlotchange: () => this.onSlotChange() }),
        ),
        s('gux-announce-beta', { ref: e => (this.announceElement = e) }),
      );
    }
    get root() {
      return o(this);
    }
    static get watchers() {
      return { keyboardOrderChange: ['watchKeyboardOrderChange'] };
    }
  };
b.style =
  ".gux-container{width:320px;min-width:320px}.gux-container .gux-search gux-content-search{width:100%}.gux-container .gux-search gux-content-search input[type='search']::-webkit-search-decoration,.gux-container .gux-search gux-content-search input[type='search']::-webkit-search-cancel-button,.gux-container .gux-search gux-content-search input[type='search']::-webkit-search-results-button,.gux-container .gux-search gux-content-search input[type='search']::-webkit-search-results-decoration{display:none;-webkit-appearance:none}.gux-container .gux-select{padding:8px 0 8px 16px;margin:4px 0;color:#596373;background-color:#f6f7f9;border-radius:4px}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}";
export { b as gux_column_manager_beta };

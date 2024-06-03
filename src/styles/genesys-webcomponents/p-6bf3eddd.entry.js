import { r as t, c as n, h as e, g as i } from './p-9031eb6a.js';
import { t as o } from './p-6a46bf1b.js';
import { b as s } from './p-54ad2682.js';
import { a } from './p-3701eff0.js';
import './p-8a133b9b.js';
const r = {
    eraseBtnAria: 'Clear search text',
    navigateNextBtn: 'Highlight next match',
    navigatePreviousBtn: 'Highlight previous match',
    totalMatches: '{currentMatch, number} of {matchCount, number}',
    clear: 'Clear',
  },
  c = class {
    constructor(e) {
      t(this, e),
        (this.guxcurrentmatchchanged = n(this, 'guxcurrentmatchchanged', 7)),
        (this.matchCount = 0),
        (this.currentMatch = 0),
        (this.disabled = void 0),
        (this.value = void 0);
    }
    async clear() {
      this.disabled ||
        ((this.matchCount = 0),
        (this.currentMatch = 0),
        (this.value = ''),
        this.resetInputSlottedElement(),
        this.emitCurrentMatchChanged(),
        this.inputSlottedElement.focus());
    }
    async componentWillLoad() {
      o(this.root),
        (this.i18n = await s(this.root, r)),
        (this.inputSlottedElement = this.root.querySelector('input')),
        (this.disabled = this.inputSlottedElement.disabled),
        (this.value = this.inputSlottedElement.value),
        (this.disabledObserver = a(this.inputSlottedElement, t => {
          this.disabled = t;
        })),
        this.inputSlottedElement.addEventListener('input', t => this.onInput(t));
    }
    disconnectedCallback() {
      this.disabledObserver && this.disabledObserver.disconnect();
    }
    render() {
      return e(
        'div',
        { class: { 'gux-content-search': !0, 'gux-disabled': this.disabled } },
        e('div', { class: 'gux-search-icon' }, e('gux-icon', { decorative: !0, 'icon-name': 'search' })),
        e('slot', null),
        this.getNavigationPanel(),
      );
    }
    getNavigationPanel() {
      if (this.showNavigationPanel()) {
        const t = this.disableNavigationPanel();
        return e(
          'div',
          { class: 'gux-content-control-panel' },
          e(
            'div',
            { class: { 'gux-navigation-panel': !0, 'gux-navigation-disabled': t } },
            e(
              'span',
              { class: { 'gux-navigation-result': !0, 'gux-navigation-result-disabled': t } },
              this.matchCountResult(),
            ),
            e(
              'button',
              {
                type: 'button',
                class: 'gux-previous-button',
                title: this.i18n('navigatePreviousBtn'),
                'aria-label': this.i18n('navigatePreviousBtn'),
                onClick: () => this.previousClick(),
                disabled: t,
              },
              e('gux-icon', { decorative: !0, 'icon-name': 'arrow-solid-up' }),
            ),
            e(
              'button',
              {
                type: 'button',
                class: 'gux-next-button',
                title: this.i18n('navigateNextBtn'),
                'aria-label': this.i18n('navigateNextBtn'),
                onClick: () => this.nextClick(),
                disabled: t,
              },
              e('gux-icon', { decorative: !0, 'icon-name': 'arrow-solid-down' }),
            ),
          ),
          e(
            'button',
            {
              class: 'gux-clear-button',
              tabIndex: -1,
              type: 'button',
              title: this.i18n('clear'),
              onClick: () => {
                this.clear();
              },
            },
            e('gux-icon', { 'icon-name': 'close', decorative: !0 }),
          ),
        );
      }
      return null;
    }
    matchCountResult() {
      return this.i18n('totalMatches', {
        currentMatch: this.getNormalizedCurrentMatch(),
        matchCount: this.getNormalizedMatchCount(),
      });
    }
    showNavigationPanel() {
      return '' !== this.value;
    }
    disableNavigationPanel() {
      return this.disabled || this.getNormalizedMatchCount() <= 0;
    }
    getNormalizedMatchCount() {
      return this.matchCount && Number.isInteger(this.matchCount) && this.matchCount >= 0 ? Number(this.matchCount) : 0;
    }
    getNormalizedCurrentMatch() {
      return this.currentMatch &&
        Number.isInteger(this.currentMatch) &&
        this.currentMatch >= 0 &&
        this.currentMatch <= this.getNormalizedMatchCount() &&
        this.getNormalizedMatchCount() > 0
        ? Number(this.currentMatch)
        : 0;
    }
    resetInputSlottedElement() {
      (this.inputSlottedElement.value = ''),
        this.inputSlottedElement.dispatchEvent(new InputEvent('input', { bubbles: !0, cancelable: !0 })),
        this.inputSlottedElement.dispatchEvent(new InputEvent('change', { bubbles: !0 }));
    }
    nextClick() {
      this.disableNavigationPanel() ||
        ((this.currentMatch =
          this.getNormalizedCurrentMatch() === this.getNormalizedMatchCount()
            ? 1
            : this.getNormalizedCurrentMatch() + 1),
        this.emitCurrentMatchChanged());
    }
    previousClick() {
      this.disableNavigationPanel() ||
        ((this.currentMatch =
          1 === this.getNormalizedCurrentMatch() || 0 === this.getNormalizedCurrentMatch()
            ? this.getNormalizedMatchCount()
            : this.getNormalizedCurrentMatch() - 1),
        this.emitCurrentMatchChanged());
    }
    onInput(t) {
      this.value = t.target.value;
    }
    emitCurrentMatchChanged() {
      this.guxcurrentmatchchanged.emit(this.getNormalizedCurrentMatch());
    }
    get root() {
      return i(this);
    }
  };
c.style =
  ':host{display:inline-block;width:300px;min-width:300px;color:#596373}::slotted(input){box-sizing:border-box;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;background-color:#fdfdfd;background-image:none;border:1px solid #6b7585;border-radius:2px;flex-basis:100%;flex-shrink:1;min-width:0;height:22px;padding:0;color:#2e394c;background-color:#f6f7f9;border:0;border-radius:0;outline:none}::slotted(input)::placeholder{color:#596373}::slotted(input).gux-focused,::slotted(input):focus-visible{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px rgba(170, 201, 255, 0.5)}::slotted(input).gux-focused,::slotted(input):focus{border:0;outline:none;box-shadow:none}.gux-content-search{box-sizing:border-box;display:flex;flex-direction:row;width:100%;height:32px;padding:4px 0 4px 0;margin:4px 0;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-content-search.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-content-search:focus-visible,.gux-content-search:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}.gux-content-search .gux-search-icon{display:flex;flex-shrink:0;align-items:center;padding:0 4px 0 8px}.gux-content-search .gux-search-icon:disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-content-search .gux-search-icon gux-icon{width:16px;height:16px}.gux-content-search .gux-content-control-panel{box-sizing:border-box;display:flex;flex-grow:1;flex-shrink:0;align-content:center;align-items:center;justify-content:flex-end;height:22px;padding:0;line-height:1.6667}.gux-content-search .gux-content-control-panel gux-icon{width:16px;height:16px}.gux-content-search .gux-content-control-panel button{display:block;align-items:center;overflow:hidden;color:#596373;cursor:pointer;background:none;border:none;border-radius:4px;outline:none}.gux-content-search .gux-content-control-panel button:disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-content-search .gux-content-control-panel button:not(:disabled):hover,.gux-content-search .gux-content-control-panel button:not(:disabled):focus-visible{color:#2e394c}.gux-content-search .gux-content-control-panel button:not(.gux-clear-button):focus-visible:enabled{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-content-search .gux-content-control-panel button.gux-clear-button{flex-shrink:0;align-items:center;padding-right:0;padding-left:0;margin-right:8px;margin-left:8px}.gux-content-search .gux-content-control-panel button.gux-clear-button gux-icon{width:16px;height:16px}.gux-content-search .gux-content-control-panel .gux-navigation-disabled{pointer-events:auto;cursor:default;opacity:0.5}.gux-content-search .gux-content-control-panel .gux-navigation-panel{display:flex;align-content:center;align-items:center;justify-content:flex-end;border-right:1px solid #596373}.gux-content-search .gux-content-control-panel .gux-navigation-panel .gux-navigation-result{align-items:center;padding-left:8px;font-family:inherit;font-size:12px;white-space:nowrap}.gux-content-search .gux-content-control-panel .gux-navigation-panel .gux-previous-button{flex-shrink:0;align-items:center;padding-right:0;padding-left:0;margin-left:4px}.gux-content-search .gux-content-control-panel .gux-navigation-panel .gux-next-button{flex-shrink:0;align-items:center;padding-right:0;padding-left:0;margin-right:4px}';
export { c as gux_content_search };

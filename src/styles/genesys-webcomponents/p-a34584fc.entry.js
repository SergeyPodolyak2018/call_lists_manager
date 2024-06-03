import { r as t, h as n, g as i } from './p-9031eb6a.js';
import { b as e } from './p-54ad2682.js';
import { s as o } from './p-8fe7daff.js';
import { a as r } from './p-3701eff0.js';
import './p-8a133b9b.js';
import './p-d176c2ae.js';
const a = { clear: 'Clear' },
  u = class {
    constructor(n) {
      t(this, n), (this.hasContent = !1), (this.disabled = void 0);
    }
    clearInput() {
      o(this.input, '', !0);
    }
    setHasContent() {
      this.hasContent = Boolean(this.input.value);
    }
    renderSearchIcon() {
      return n('gux-icon', { class: 'gux-search-icon', 'icon-name': 'search', decorative: !0 });
    }
    renderClearButton() {
      return this.hasContent && !this.disabled
        ? n(
            'button',
            {
              class: 'gux-clear-button',
              tabIndex: -1,
              type: 'button',
              title: this.getI18nValue('clear'),
              disabled: this.disabled,
              onClick: this.clearInput.bind(this),
            },
            n('gux-icon', { 'icon-name': 'close', decorative: !0 }),
          )
        : null;
    }
    async componentWillLoad() {
      (this.getI18nValue = await e(this.root, a)),
        (this.input = this.root.querySelector('input[type="search"]')),
        this.setHasContent(),
        (this.disabled = this.input.disabled),
        this.input.addEventListener('input', () => {
          this.setHasContent();
        }),
        (this.disabledObserver = r(this.input, t => {
          this.disabled = t;
        }));
    }
    disconnectedCallback() {
      this.disabledObserver && this.disabledObserver.disconnect();
    }
    render() {
      return n(
        'div',
        { class: { 'gux-input-container': !0, 'gux-disabled': this.disabled } },
        this.renderSearchIcon(),
        n('slot', null),
        this.renderClearButton(),
      );
    }
    get root() {
      return i(this);
    }
  };
u.style =
  'gux-input-search{position:relative;display:block}gux-input-search .gux-input-container{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 8px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-search .gux-input-container.gux-disabled{opacity:0.5}gux-input-search .gux-input-container .gux-search-icon{flex:0 0 auto;align-self:auto;order:0;width:20px;height:20px;color:#596373}gux-input-search .gux-input-container input{flex:1 1 auto;align-self:auto;order:0;overflow:hidden;color:#2e394c;background-color:#f6f7f9;border:none;outline:none}gux-input-search .gux-input-container input::placeholder{color:#596373;opacity:1}gux-input-search .gux-input-container input::-webkit-search-cancel-button,gux-input-search .gux-input-container input::-webkit-search-results-button,gux-input-search .gux-input-container input::-webkit-calendar-picker-indicator{display:none;-webkit-appearance:none}gux-input-search .gux-input-container .gux-clear-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-search .gux-input-container .gux-clear-button:not(:disabled):focus-visible,gux-input-search .gux-input-container .gux-clear-button:not(:disabled):hover{color:#2e394c;cursor:pointer}gux-input-search .gux-input-container .gux-clear-button gux-icon{width:12px;height:12px;border-radius:4px}gux-input-search .gux-input-container .gux-clear-button:focus{outline:none}gux-input-search .gux-input-container .gux-clear-button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-input-search .gux-input-container:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}';
export { u as gux_input_search };

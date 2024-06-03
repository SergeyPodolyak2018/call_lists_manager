import { r as e, c as t, h as g, H as i, g as l } from './p-9031eb6a.js';
import { t as o } from './p-6a46bf1b.js';
import { r as a } from './p-cbcbd1bb.js';
import { b as n } from './p-54ad2682.js';
import './p-8a133b9b.js';
const s = {
    defaultAriaLabel: 'Toggle Switch',
    toggleIsLoading: 'Toggle is loading',
    toggleIsFinishedLoading: 'Toggle is finished loading',
  },
  r = class {
    constructor(g) {
      e(this, g),
        (this.check = t(this, 'check', 7)),
        (this.labelId = a('gux-toggle-label')),
        (this.errorId = a('gux-toggle-error')),
        (this.checked = !1),
        (this.disabled = !1),
        (this.loading = !1),
        (this.checkedLabel = void 0),
        (this.uncheckedLabel = void 0),
        (this.labelPosition = 'right'),
        (this.errorMessage = void 0),
        (this.displayInline = !1);
    }
    handleLoading(e) {
      this.announceElement.guxAnnounce(this.i18n(e ? 'toggleIsLoading' : 'toggleIsFinishedLoading'));
    }
    onClick() {
      this.toggle();
    }
    onKeydown(e) {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault(), this.toggle();
      }
    }
    toggle() {
      this.disabled ||
        this.loading ||
        this.check.emit(!this.checked).defaultPrevented ||
        (this.checked = !this.checked);
    }
    getAriaLabel() {
      return this.root.getAttribute('aria-label') || this.root.title || this.i18n('defaultAriaLabel');
    }
    async componentWillLoad() {
      (this.i18n = await n(this.root, s)),
        o(this.root, { variant: this.checkedLabel || this.uncheckedLabel ? 'labled' : 'unlabled' });
    }
    renderLoading() {
      if (this.loading)
        return g('div', { class: 'gux-toggle-label-loading' }, g('gux-radial-loading', { context: 'input' }));
    }
    renderLabel() {
      if (this.uncheckedLabel && this.checkedLabel)
        return g(
          'div',
          { class: 'gux-toggle-label-and-error' },
          g(
            'div',
            { class: 'gux-toggle-label' },
            g(
              'div',
              { class: 'gux-toggle-label-text' },
              g(
                'span',
                { class: 'gux-toggle-label-text-inner' },
                g('span', { id: this.labelId }, this.checked ? this.checkedLabel : this.uncheckedLabel),
                this.renderLoading(),
              ),
              g('span', { class: 'gux-toggle-label-text-inner gux-hidden' }, this.checkedLabel),
              g('span', { class: 'gux-toggle-label-text-inner gux-hidden' }, this.uncheckedLabel),
            ),
          ),
        );
    }
    renderError() {
      if (this.errorMessage)
        return g(
          'div',
          { id: this.errorId, class: 'gux-toggle-error' },
          g(
            'div',
            { class: 'gux-toggle-error-container' },
            g('gux-icon', { 'icon-name': 'alert-warning-octogon', decorative: !0 }),
            g('div', { class: 'gux-toggle-error-message' }, this.errorMessage),
          ),
        );
    }
    render() {
      return g(
        i,
        { class: { 'gux-display-inline': this.displayInline } },
        g(
          'div',
          {
            class: {
              'gux-toggle-container': !0,
              'gux-toggle-label-left': 'left' === this.labelPosition,
              'gux-disabled': this.disabled || this.loading,
            },
          },
          g(
            'div',
            { class: 'gux-toggle-input' },
            g('gux-toggle-slider', {
              checked: this.checked,
              disabled: this.disabled || this.loading,
              guxAriaLabel: this.getAriaLabel(),
              labelId: this.checkedLabel && this.uncheckedLabel ? this.labelId : '',
              errorId: this.errorMessage ? this.errorId : '',
            }),
            this.renderLabel(),
          ),
          this.renderError(),
        ),
        g('gux-announce-beta', { ref: e => (this.announceElement = e) }),
      );
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return l(this);
    }
    static get watchers() {
      return { loading: ['handleLoading'] };
    }
  };
r.style =
  ":host{display:block;margin:2px;color:#2e394c;outline:none}:host(.gux-display-inline){display:inline-block}.gux-toggle-container{cursor:pointer}.gux-toggle-container.gux-disabled{pointer-events:none;cursor:default}.gux-toggle-container.gux-disabled .gux-toggle-input .gux-toggle-label .gux-toggle-label-text{opacity:0.5}.gux-toggle-container.gux-toggle-label-left .gux-toggle-input{flex-direction:row-reverse}.gux-toggle-container.gux-toggle-label-left .gux-toggle-input .gux-toggle-label .gux-toggle-label-text{place-items:end}.gux-toggle-container.gux-toggle-label-left .gux-toggle-error{float:right}.gux-toggle-container .gux-toggle-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start}.gux-toggle-container .gux-toggle-input .gux-toggle-label{position:relative;display:inline-block;padding:0 4px}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-text{display:grid;grid-template-areas:'inner-div';place-items:start}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-text .gux-toggle-label-text-inner{position:relative;grid-area:inner-div}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-text .gux-toggle-label-text-inner.gux-hidden{visibility:hidden}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-loading{position:absolute;inset:0;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}.gux-toggle-container .gux-toggle-error .gux-toggle-error-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;font-size:11px;color:#2e394c}.gux-toggle-container .gux-toggle-error .gux-toggle-error-container gux-icon{flex:0 1 auto;align-self:auto;order:0;width:16px;height:16px;margin:0 4px;color:#ea0b0b}.gux-toggle-container .gux-toggle-error .gux-toggle-error-container .gux-toggle-error-message{flex:0 1 auto;align-self:auto;order:0}";
export { r as gux_toggle };

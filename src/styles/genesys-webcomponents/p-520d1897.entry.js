import { r as t, c as i, h as o, g as s } from './p-9031eb6a.js';
import { t as n } from './p-6a46bf1b.js';
import { O as e } from './p-23975bfb.js';
import { b as a } from './p-54ad2682.js';
import './p-8a133b9b.js';
const c = { actionButtonDropdown: 'Dropdown for {buttonTitle}' };
const h = class {
  constructor(o) {
    t(this, o),
      (this.open = i(this, 'open', 7)),
      (this.close = i(this, 'close', 7)),
      (this.actionClick = i(this, 'actionClick', 7)),
      (this.moveFocusDelay = 100),
      (this.type = 'button'),
      (this.text = void 0),
      (this.disabled = !1),
      (this.accent = 'secondary'),
      (this.isOpen = !1);
  }
  handleKeydown(t) {
    const i = t.composedPath();
    switch (t.key) {
      case 'Escape':
        (this.isOpen = !1), i.includes(this.actionListElement) && this.dropdownButton.focus();
        break;
      case 'Tab':
        this.isOpen = !1;
        break;
      case 'ArrowDown':
        t.preventDefault(),
          i.includes(this.dropdownButton) &&
            ((this.isOpen = !0),
            setTimeout(() => {
              this.actionListElement.setFocusOnFirstItem();
            }, this.moveFocusDelay));
        break;
      case 'Enter':
        i.includes(this.dropdownButton) &&
          ((this.isOpen = !0),
          setTimeout(() => {
            this.actionListElement.setFocusOnFirstItem();
          }, this.moveFocusDelay));
    }
  }
  handleKeyup(t) {
    const i = t.composedPath();
    ' ' === t.key &&
      i.includes(this.dropdownButton) &&
      (t.preventDefault(),
      (this.isOpen = !0),
      setTimeout(() => {
        this.actionListElement.setFocusOnFirstItem();
      }, this.moveFocusDelay));
  }
  watchDisabled(t) {
    t && (this.isOpen = !1);
  }
  watchValue(t) {
    t ? this.open.emit() : this.close.emit();
  }
  onClickOutside(t) {
    null === t.relatedTarget && (this.isOpen = !1);
  }
  toggle() {
    this.disabled || (this.isOpen = !this.isOpen);
  }
  onActionClick() {
    this.disabled || ((this.isOpen = !1), this.actionClick.emit());
  }
  async componentWillLoad() {
    n(this.root, { variant: this.type }), (this.i18n = await a(this.root, c));
  }
  render() {
    return o(
      'div',
      { class: 'gux-action-button-container' },
      o(
        'gux-popup',
        { expanded: this.isOpen, disabled: this.disabled },
        o(
          'div',
          { slot: 'target', class: 'gux-action-button-container' },
          o(
            'gux-button-slot-beta',
            { class: 'gux-action-button', accent: this.accent },
            o('button', { type: this.type, disabled: this.disabled, onClick: () => this.onActionClick() }, this.text),
          ),
          o(
            'gux-button-slot-beta',
            { class: 'gux-dropdown-button', accent: this.accent },
            o(
              'button',
              {
                type: 'button',
                disabled: this.disabled,
                ref: t => (this.dropdownButton = t),
                onClick: () => this.toggle(),
                'aria-haspopup': 'true',
                'aria-expanded': this.isOpen.toString(),
                'aria-label': this.i18n('actionButtonDropdown', { buttonTitle: this.text }),
              },
              o('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
            ),
          ),
        ),
        o('gux-action-list-legacy', { slot: 'popup', ref: t => (this.actionListElement = t) }, o('slot', null)),
      ),
    );
  }
  get root() {
    return s(this);
  }
  static get watchers() {
    return { disabled: ['watchDisabled'], isOpen: ['watchValue'] };
  }
};
(function (t, i, o, s) {
  var n,
    e = arguments.length,
    a = e < 3 ? i : null === s ? (s = Object.getOwnPropertyDescriptor(i, o)) : s;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, i, o, s);
  else for (var c = t.length - 1; c >= 0; c--) (n = t[c]) && (a = (e < 3 ? n(a) : e > 3 ? n(i, o, a) : n(i, o)) || a);
  e > 3 && a && Object.defineProperty(i, o, a);
})([e({ triggerEvents: 'click' })], h.prototype, 'onClickOutside', null),
  (h.style =
    ':host{display:block;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-action-button-container{min-width:128px}.gux-action-button-container>*{vertical-align:middle}.gux-action-button-container .gux-action-button{width:calc(100% - 33px);margin-right:1px}.gux-action-button-container .gux-action-button button{width:100%;max-width:none;text-align:center;border-top-right-radius:0;border-bottom-right-radius:0}.gux-action-button-container .gux-dropdown-button button{width:32px;min-width:0;padding:0;border-top-left-radius:0;border-bottom-left-radius:0}.gux-action-button-container .gux-dropdown-button button gux-icon{width:16px;height:16px}');
export { h as gux_action_button_legacy };

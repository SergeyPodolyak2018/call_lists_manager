import { r as t, c as s, h as i, g as e } from './p-9031eb6a.js';
import { t as o } from './p-6a46bf1b.js';
import { O as n } from './p-23975bfb.js';
const a = class {
  constructor(i) {
    t(this, i),
      (this.open = s(this, 'open', 7)),
      (this.close = s(this, 'close', 7)),
      (this.moveFocusDelay = 100),
      (this.text = void 0),
      (this.disabled = !1),
      (this.accent = 'secondary'),
      (this.isOpen = !1);
  }
  handleKeydown(t) {
    const s = t.composedPath();
    switch (t.key) {
      case 'Escape':
        (this.isOpen = !1), s.includes(this.listElement) && this.dropdownButton.focus();
        break;
      case 'Tab':
        this.isOpen = !1;
        break;
      case 'Enter':
      case 'ArrowDown':
        t.preventDefault(),
          s.includes(this.dropdownButton) &&
            ((this.isOpen = !0),
            setTimeout(() => {
              this.listElement.setFocusOnFirstItem();
            }, this.moveFocusDelay));
    }
  }
  handleKeyup(t) {
    const s = t.composedPath();
    ' ' === t.key &&
      (t.preventDefault(),
      s.includes(this.dropdownButton) &&
        ((this.isOpen = !0),
        setTimeout(() => {
          this.listElement.setFocusOnFirstItem();
        }, this.moveFocusDelay)));
  }
  watchDisabled(t) {
    t && (this.isOpen = !1);
  }
  watchValue(t) {
    t ? this.open.emit() : this.close.emit();
  }
  onClickOutside() {
    this.isOpen = !1;
  }
  toggle() {
    this.disabled || (this.isOpen = !this.isOpen);
  }
  componentWillLoad() {
    o(this.root, { variant: this.accent });
  }
  render() {
    return i(
      'gux-popup',
      { expanded: this.isOpen, disabled: this.disabled },
      i(
        'div',
        { slot: 'target', class: 'gux-button-multi-container' },
        i(
          'gux-button-slot-beta',
          { class: 'gux-dropdown-button', accent: this.accent },
          i(
            'button',
            {
              type: 'button',
              disabled: this.disabled,
              ref: t => (this.dropdownButton = t),
              onClick: () => this.toggle(),
              'aria-haspopup': 'true',
              'aria-expanded': this.isOpen.toString(),
            },
            i('span', null, this.text),
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
          ),
        ),
      ),
      i('gux-action-list-legacy', { slot: 'popup', ref: t => (this.listElement = t) }, i('slot', null)),
    );
  }
  get root() {
    return e(this);
  }
  static get watchers() {
    return { disabled: ['watchDisabled'], isOpen: ['watchValue'] };
  }
};
(function (t, s, i, e) {
  var o,
    n = arguments.length,
    a = n < 3 ? s : null === e ? (e = Object.getOwnPropertyDescriptor(s, i)) : e;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, s, i, e);
  else for (var h = t.length - 1; h >= 0; h--) (o = t[h]) && (a = (n < 3 ? o(a) : n > 3 ? o(s, i, a) : o(s, i)) || a);
  n > 3 && a && Object.defineProperty(s, i, a);
})([n({ triggerEvents: 'mousedown' })], a.prototype, 'onClickOutside', null),
  (a.style =
    ':host{display:block;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-button-multi-container .gux-dropdown-button button>*{vertical-align:middle}.gux-button-multi-container .gux-dropdown-button button gux-icon{width:16px;height:16px;margin-left:8px}');
export { a as gux_button_multi_legacy };

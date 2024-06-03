import { r as t, c as s, h as i, g as e } from './p-9031eb6a.js';
import { O as o } from './p-23975bfb.js';
import { w as n } from './p-76ff3e75.js';
import { a } from './p-091f51f6.js';
import { t as r } from './p-6a46bf1b.js';
const h = ['primary', 'secondary', 'tertiary'];
const c = class {
  constructor(i) {
    t(this, i),
      (this.open = s(this, 'open', 7)),
      (this.close = s(this, 'close', 7)),
      (this.text = void 0),
      (this.disabled = !1),
      (this.accent = 'secondary'),
      (this.isOpen = !1);
  }
  handleKeydown(t) {
    const s = t.composedPath();
    switch (t.key) {
      case 'Escape':
        (this.isOpen = !1), s.includes(this.listElement) && (t.preventDefault(), this.dropdownButton.focus());
        break;
      case 'Tab':
        this.isOpen = !1;
        break;
      case 'ArrowDown':
      case 'Enter':
        s.includes(this.dropdownButton) && (t.preventDefault(), (this.isOpen = !0), this.focusFirstItemInPopupList());
    }
  }
  handleKeyup(t) {
    if (' ' === t.key)
      t.composedPath().includes(this.dropdownButton) && ((this.isOpen = !0), this.focusFirstItemInPopupList());
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
    this.disabled || ((this.isOpen = !this.isOpen), this.isOpen && this.focusPopupList());
  }
  focusPopupList() {
    a(() => {
      this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    a(() => {
      this.listElement.guxFocusFirstItem();
    });
  }
  onListClick(t) {
    n('gux-list-item', t, () => {
      (this.isOpen = !1), this.dropdownButton.focus();
    });
  }
  componentWillLoad() {
    r(this.root, { variant: this.accent });
  }
  render() {
    return i(
      'gux-popup-beta',
      { expanded: this.isOpen, exceedTargetWidth: !0 },
      i(
        'div',
        { slot: 'target', class: 'gux-button-multi-container' },
        i(
          'gux-button-slot-beta',
          { class: 'gux-dropdown-button', accent: ((t = this.accent), h.find(s => s === t) ? t : 'secondary') },
          i(
            'button',
            {
              type: 'button',
              disabled: this.disabled,
              ref: t => (this.dropdownButton = t),
              onMouseUp: () => this.toggle(),
              'aria-haspopup': 'true',
              'aria-expanded': this.isOpen.toString(),
            },
            i('slot', { name: 'title' }, this.text),
            i('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
          ),
        ),
      ),
      i(
        'div',
        { class: 'gux-list-container', slot: 'popup' },
        i('gux-list', { onClick: t => this.onListClick(t), ref: t => (this.listElement = t) }, i('slot', null)),
      ),
    );
    var t;
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
  else for (var r = t.length - 1; r >= 0; r--) (o = t[r]) && (a = (n < 3 ? o(a) : n > 3 ? o(s, i, a) : o(s, i)) || a);
  n > 3 && a && Object.defineProperty(s, i, a);
})([o({ triggerEvents: 'mousedown' })], c.prototype, 'onClickOutside', null),
  (c.style =
    ':host{display:block;-webkit-user-select:none;user-select:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-button-multi-container .gux-dropdown-button button{display:inline-flex;align-items:center}.gux-button-multi-container .gux-dropdown-button button gux-icon{width:16px;height:16px;margin-left:8px}.gux-list-container{max-width:220px;padding:8px 0;margin:0;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}');
export { c as gux_button_multi };

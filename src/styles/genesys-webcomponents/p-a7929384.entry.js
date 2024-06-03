import { r as t, c as i, h as o, g as s } from './p-9031eb6a.js';
import { O as n } from './p-23975bfb.js';
import { w as e } from './p-76ff3e75.js';
import { a } from './p-091f51f6.js';
import { t as r } from './p-6a46bf1b.js';
import { b as c } from './p-54ad2682.js';
import './p-8a133b9b.js';
const h = { moreOptions: 'More options' },
  u = ['primary', 'secondary', 'tertiary', 'danger'];
function d(t) {
  return u.find(i => i === t) ? t : 'secondary';
}
const l = class {
  constructor(o) {
    t(this, o),
      (this.open = i(this, 'open', 7)),
      (this.close = i(this, 'close', 7)),
      (this.actionClick = i(this, 'actionClick', 7)),
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
        (this.isOpen = !1), i.includes(this.listElement) && (t.preventDefault(), this.dropdownButton.focus());
        break;
      case 'Tab':
        this.isOpen = !1;
        break;
      case 'ArrowDown':
      case 'Enter':
        i.includes(this.dropdownButton) && (t.preventDefault(), (this.isOpen = !0), this.focusFirstItemInPopupList());
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
  onClickOutside(t) {
    null === t.relatedTarget && (this.isOpen = !1);
  }
  toggle() {
    this.disabled || ((this.isOpen = !this.isOpen), this.isOpen && this.focusPopupList());
  }
  focusPopupList() {
    a(() => {
      this.listElement.focus && this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    a(() => {
      this.listElement.guxFocusFirstItem();
    });
  }
  onActionClick() {
    this.disabled || ((this.isOpen = !1), this.actionClick.emit());
  }
  onListClick(t) {
    e('gux-list-item', t, () => {
      (this.isOpen = !1), this.dropdownButton.focus();
    });
  }
  async componentWillLoad() {
    r(this.root, { variant: this.type }), (this.i18n = await c(this.root, h));
  }
  render() {
    return o(
      'div',
      { class: 'gux-action-button-container' },
      o(
        'gux-popup-beta',
        { expanded: this.isOpen, disabled: this.disabled, exceedTargetWidth: !0 },
        o(
          'div',
          { slot: 'target', class: 'gux-action-button-container' },
          o(
            'gux-button-slot-beta',
            { class: 'gux-action-button', accent: d(this.accent) },
            o(
              'button',
              { type: this.type, disabled: this.disabled, onClick: () => this.onActionClick() },
              o('slot', { name: 'title' }, this.text),
            ),
          ),
          o(
            'gux-button-slot-beta',
            { class: 'gux-dropdown-button', accent: d(this.accent) },
            o(
              'button',
              {
                type: 'button',
                disabled: this.disabled,
                ref: t => (this.dropdownButton = t),
                onMouseUp: () => this.toggle(),
                'aria-haspopup': 'true',
                'aria-expanded': this.isOpen.toString(),
                'aria-label': this.i18n('moreOptions'),
              },
              o('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
            ),
          ),
        ),
        o(
          'div',
          { class: 'gux-list-container', slot: 'popup' },
          o('gux-list', { onClick: t => this.onListClick(t), ref: t => (this.listElement = t) }, o('slot', null)),
        ),
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
  else for (var r = t.length - 1; r >= 0; r--) (n = t[r]) && (a = (e < 3 ? n(a) : e > 3 ? n(i, o, a) : n(i, o)) || a);
  e > 3 && a && Object.defineProperty(i, o, a);
})([n({ triggerEvents: 'click' })], l.prototype, 'onClickOutside', null),
  (l.style =
    ':host{display:block;-webkit-user-select:none;user-select:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-action-button-container{min-width:128px}.gux-action-button-container>*{vertical-align:middle}.gux-action-button-container .gux-action-button{width:calc(100% - 33px);margin-right:1px}.gux-action-button-container .gux-action-button button{width:100%;max-width:none;text-align:center;border-top-right-radius:0;border-bottom-right-radius:0}.gux-action-button-container .gux-dropdown-button button{width:32px;min-width:0;padding:0;border-top-left-radius:0;border-bottom-left-radius:0}.gux-action-button-container .gux-dropdown-button button gux-icon{width:16px;height:16px}.gux-action-button-container .gux-list-container{max-width:220px;padding:8px 0;margin:0;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}');
export { l as gux_action_button };

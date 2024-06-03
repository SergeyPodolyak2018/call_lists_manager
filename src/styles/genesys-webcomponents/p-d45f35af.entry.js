import { r as t, h as s, H as e, g as i } from './p-9031eb6a.js';
import { r as o } from './p-cbcbd1bb.js';
import { t as r } from './p-6a46bf1b.js';
import { b as a } from './p-54ad2682.js';
import { O as n } from './p-23975bfb.js';
import { b as c } from './p-091f51f6.js';
import { w as h } from './p-76ff3e75.js';
import './p-8a133b9b.js';
const l = { contextMenuScreenreaderText: 'Context menu' };
const p = class {
  constructor(s) {
    t(this, s), (this.buttonId = o()), (this.screenreaderText = ''), (this.isOpen = !1);
  }
  onClickOutside() {
    this.isOpen = !1;
  }
  handleKeyDown(t) {
    const s = t.composedPath().includes(this.listElement),
      e = t.composedPath().includes(this.button);
    switch (t.key) {
      case 'Escape':
        s && (t.preventDefault(), (this.isOpen = !1), this.button.focus());
        break;
      case 'Tab':
        this.isOpen = !1;
        break;
      case 'ArrowDown':
      case 'Enter':
        e && !this.isOpen && (t.preventDefault(), (this.isOpen = !0), this.focusFirstListItem());
        break;
      case 'ArrowUp':
        e && !this.isOpen && (t.preventDefault(), (this.isOpen = !0), this.focusLastListItem());
    }
  }
  handleKeyup(t) {
    ' ' === t.key &&
      t.composedPath().includes(this.button) &&
      (t.preventDefault(), (this.isOpen = !0), this.focusFirstListItem());
  }
  focusFirstListItem() {
    c(() => {
      this.listElement.guxFocusFirstItem();
    });
  }
  focusLastListItem() {
    c(() => {
      this.listElement.guxFocusLastItem();
    });
  }
  onButtonClick() {
    (this.isOpen = !this.isOpen), this.isOpen && this.focusFirstListItem();
  }
  onListClick(t) {
    h('gux-list-item', t, () => {
      (this.isOpen = !1), this.button.focus();
    });
  }
  async componentWillLoad() {
    r(this.root), (this.i18n = await a(this.root, l));
  }
  render() {
    return s(
      e,
      null,
      s(
        'gux-popup-beta',
        { expanded: this.isOpen, exceedTargetWidth: !0 },
        s(
          'div',
          { slot: 'target', class: 'gux-button-container' },
          s(
            'gux-button-slot-beta',
            { accent: 'ghost' },
            s(
              'button',
              {
                type: 'button',
                onClick: () => this.onButtonClick(),
                id: this.buttonId,
                ref: t => (this.button = t),
                'aria-haspopup': 'true',
                'aria-expanded': this.isOpen.toString(),
              },
              s('gux-icon', {
                'icon-name': 'menu-kebab-vertical',
                'screenreader-text': this.screenreaderText || this.i18n('contextMenuScreenreaderText'),
              }),
            ),
          ),
        ),
        s(
          'div',
          { slot: 'popup', class: 'gux-list-container' },
          s('gux-list', { onClick: t => this.onListClick(t), ref: t => (this.listElement = t) }, s('slot', null)),
        ),
      ),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return i(this);
  }
};
(function (t, s, e, i) {
  var o,
    r = arguments.length,
    a = r < 3 ? s : null === i ? (i = Object.getOwnPropertyDescriptor(s, e)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, s, e, i);
  else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (a = (r < 3 ? o(a) : r > 3 ? o(s, e, a) : o(s, e)) || a);
  r > 3 && a && Object.defineProperty(s, e, a);
})([n({ triggerEvents: 'click' })], p.prototype, 'onClickOutside', null),
  (p.style =
    ':host{display:block;max-width:fit-content}gux-icon{width:16px;height:16px;color:#6b7585}.gux-list-container{width:128px;padding:8px 0;margin:0;text-align:left;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}');
export { p as gux_context_menu_beta };

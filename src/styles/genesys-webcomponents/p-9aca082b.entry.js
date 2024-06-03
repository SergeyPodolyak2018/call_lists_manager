import { r as t, h as s, H as o, g as e } from './p-9031eb6a.js';
import { t as i } from './p-6a46bf1b.js';
import { O as n } from './p-23975bfb.js';
import { b as a } from './p-54ad2682.js';
import { b as r } from './p-091f51f6.js';
import './p-8a133b9b.js';
const u = { additionalActions: 'Additional Actions' };
const c = class {
  constructor(s) {
    t(this, s), (this.showMenu = void 0), (this.expanded = !1);
  }
  handleKeyDown(t) {
    const s = t.composedPath();
    switch (t.key) {
      case 'Escape':
        (this.expanded = !1), s.includes(this.listElement) && (t.preventDefault(), this.dropdownButton.focus());
        break;
      case 'Tab':
        this.expanded = !1;
        break;
      case 'ArrowDown':
      case 'Enter':
        s.includes(this.dropdownButton) && (t.preventDefault(), (this.expanded = !0), this.focusFirstItemInPopupList());
    }
  }
  handleKeyup(t) {
    if (' ' === t.key)
      t.composedPath().includes(this.dropdownButton) && ((this.expanded = !0), this.focusFirstItemInPopupList());
  }
  onFocusin() {
    this.tooltipTitleElement.setShowTooltip();
  }
  onFocusout() {
    this.tooltipTitleElement.setHideTooltip();
  }
  toggle() {
    (this.expanded = !this.expanded), this.expanded && this.focusPopupList();
  }
  onClickOutside() {
    this.expanded = !1;
  }
  focusPopupList() {
    r(() => {
      this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    r(() => {
      this.listElement.guxFocusFirstItem();
    });
  }
  async componentWillLoad() {
    (this.i18n = await a(this.root, u)), i(this.root);
  }
  render() {
    return s(
      o,
      { class: { 'gux-show-menu': this.showMenu } },
      s(
        'gux-popup-beta',
        { expanded: this.expanded, exceedTargetWidth: !0 },
        s(
          'div',
          { slot: 'target', class: 'gux-toolbar-menu-container' },
          s(
            'gux-button-slot-beta',
            { class: 'gux-menu-button' },
            s(
              'button',
              {
                type: 'button',
                ref: t => (this.dropdownButton = t),
                onMouseUp: () => this.toggle(),
                'aria-haspopup': 'true',
                'aria-expanded': this.expanded.toString(),
              },
              s(
                'gux-tooltip-title',
                { ref: t => (this.tooltipTitleElement = t) },
                s(
                  'span',
                  null,
                  s('gux-icon', {
                    'screenreader-text': this.i18n('additionalActions'),
                    'icon-name': 'menu-kebab-horizontal',
                  }),
                ),
              ),
            ),
          ),
        ),
        s(
          'div',
          { class: 'gux-list-container', slot: 'popup' },
          s('gux-list', { ref: t => (this.listElement = t) }, s('slot', null)),
        ),
      ),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return e(this);
  }
};
(function (t, s, o, e) {
  var i,
    n = arguments.length,
    a = n < 3 ? s : null === e ? (e = Object.getOwnPropertyDescriptor(s, o)) : e;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, s, o, e);
  else for (var r = t.length - 1; r >= 0; r--) (i = t[r]) && (a = (n < 3 ? i(a) : n > 3 ? i(s, o, a) : i(s, o)) || a);
  n > 3 && a && Object.defineProperty(s, o, a);
})([n({ triggerEvents: 'mousedown' })], c.prototype, 'onClickOutside', null),
  (c.style =
    ':host{display:none;-webkit-user-select:none;user-select:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}:host(.gux-show-menu){display:block}>*{vertical-align:middle}.gux-menu-button button{color:#2e394c;cursor:grab;background-color:#e2e6ee;border:none}.gux-menu-button button gux-icon{width:16px;height:16px}.gux-list-container{width:min-content;padding:8px 0;margin:0;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}');
export { c as gux_table_toolbar_menu_button };

import { r as t, c as s, h as e, g as i } from './p-9031eb6a.js';
import { O as o } from './p-23975bfb.js';
import { b as r } from './p-3701eff0.js';
import { c } from './p-e459974a.js';
const n = class {
  constructor(e) {
    t(this, e),
      (this.guxdismiss = s(this, 'guxdismiss', 7)),
      (this.for = void 0),
      (this.closeOnClickOutside = !1),
      (this.hidden = !0);
  }
  hiddenHandler(t) {
    t || this.popperInstance ? !t && this.popperInstance && this.popperInstance.forceUpdate() : this.runPopper();
  }
  checkForClickOutside(t) {
    const s = t.composedPath(),
      e = document.getElementById(this.for),
      i = s.includes(e);
    !this.closeOnClickOutside || this.hidden || i || this.dismiss();
  }
  runPopper() {
    const t = document.getElementById(this.for);
    this.popupElement &&
      (this.popperInstance = c(t, this.popupElement, {
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [-20, 0] } }],
        placement: 'bottom-start',
      }));
  }
  destroyPopper() {
    this.popperInstance && (this.popperInstance.destroy(), (this.popperInstance = null));
  }
  dismiss() {
    this.guxdismiss.emit().defaultPrevented || this.root.setAttribute('hidden', '');
  }
  connectedCallback() {
    (this.hiddenObserver = r(this.root, t => {
      this.hidden = t;
    })),
      (this.hidden = this.root.hidden);
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper(), this.hiddenObserver && this.hiddenObserver.disconnect();
  }
  render() {
    return e(
      'div',
      { ref: t => (this.popupElement = t), class: 'gux-popover-wrapper' },
      e('div', { class: 'gux-popover-content' }, e('slot', null)),
    );
  }
  get root() {
    return i(this);
  }
  static get watchers() {
    return { hidden: ['hiddenHandler'] };
  }
};
(function (t, s, e, i) {
  var o,
    r = arguments.length,
    c = r < 3 ? s : null === i ? (i = Object.getOwnPropertyDescriptor(s, e)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) c = Reflect.decorate(t, s, e, i);
  else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (c = (r < 3 ? o(c) : r > 3 ? o(s, e, c) : o(s, e)) || c);
  r > 3 && c && Object.defineProperty(s, e, c);
})([o({ triggerEvents: 'mousedown' })], n.prototype, 'checkForClickOutside', null),
  (n.style =
    ':host{color:#2e394c}.gux-popover-wrapper{z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:8px 0;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}');
export { n as gux_table_select_popover };

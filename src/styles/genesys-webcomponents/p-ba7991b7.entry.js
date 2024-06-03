import { r as t, c as o, h as e, g as r } from './p-9031eb6a.js';
import { a as p, c as a, o as s, f as i, s as c, b as d } from './p-42e2cc1f.js';
import { O as n } from './p-23975bfb.js';
import { t as l } from './p-6a46bf1b.js';
import { f as b } from './p-82ffe3cc.js';
const h = class {
  constructor(e) {
    t(this, e),
      (this.guxdismiss = o(this, 'guxdismiss', 7)),
      (this.for = void 0),
      (this.position = 'bottom'),
      (this.displayDismissButton = void 0),
      (this.closeOnClickOutside = !1),
      (this.isOpen = !1);
  }
  checkForClickOutside(t) {
    const o = t.composedPath(),
      e = b(this.root, this.for),
      r = o.includes(e);
    (!this.closeOnClickOutside && this.displayDismissButton) || !this.isOpen || r || this.dismiss();
  }
  runUpdatePosition() {
    this.root.isConnected
      ? (this.cleanupUpdatePosition = p(b(this.root, this.for), this.popupElement, () => this.updatePosition(), {
          ancestorScroll: !0,
          elementResize: !0,
          animationFrame: !0,
          ancestorResize: !0,
        }))
      : this.disconnectedCallback();
  }
  updatePosition() {
    const t = b(this.root, this.for);
    this.popupElement &&
      a(t, this.popupElement, {
        placement: this.position,
        middleware: [s(7), i(), c(), d({ element: this.arrowElement, padding: 16 })],
      }).then(({ x: t, y: o, middlewareData: e, placement: r }) => {
        Object.assign(this.popupElement.style, { left: `${t}px`, top: `${o}px` });
        const p = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[r.split('-')[0]];
        if (e.arrow) {
          const { x: t, y: o } = e.arrow;
          this.popupElement.setAttribute('data-placement', r),
            Object.assign(this.arrowElement.style, {
              left: null != t ? `${t}px` : '',
              top: null != o ? `${o}px` : '',
              right: '',
              bottom: '',
              [p]: '-6.5px',
              transform: 'rotate(45deg)',
            });
        }
      });
  }
  dismiss() {
    this.guxdismiss.emit().defaultPrevented || (this.isOpen = !1);
  }
  connectedCallback() {
    l(this.root, { variant: this.position });
  }
  componentDidLoad() {
    this.isOpen && this.runUpdatePosition();
  }
  componentDidUpdate() {
    this.isOpen ? this.runUpdatePosition() : this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  disconnectedCallback() {
    this.cleanupUpdatePosition && this.cleanupUpdatePosition();
  }
  render() {
    return e(
      'div',
      {
        ref: t => (this.popupElement = t),
        class: { 'gux-hidden': !this.isOpen, 'gux-popover-wrapper': !0 },
        'data-placement': !0,
      },
      e('div', { ref: t => (this.arrowElement = t), class: 'gux-arrow' }),
      this.displayDismissButton && e('gux-dismiss-button', { onClick: this.dismiss.bind(this) }),
      e('div', { class: 'gux-popover-content' }, e('slot', null)),
    );
  }
  get root() {
    return r(this);
  }
};
(function (t, o, e, r) {
  var p,
    a = arguments.length,
    s = a < 3 ? o : null === r ? (r = Object.getOwnPropertyDescriptor(o, e)) : r;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, o, e, r);
  else for (var i = t.length - 1; i >= 0; i--) (p = t[i]) && (s = (a < 3 ? p(s) : a > 3 ? p(o, e, s) : p(o, e)) || s);
  a > 3 && s && Object.defineProperty(o, e, s);
})([n({ triggerEvents: 'mousedown' })], h.prototype, 'checkForClickOutside', null),
  (h.style =
    ".gux-popover-wrapper{position:absolute;top:0;left:0;z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:8px 0;color:#2e394c;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-popover-wrapper.gux-hidden{display:none}.gux-popover-wrapper .gux-arrow{position:absolute;width:10px;height:10px;background:inherit}.gux-popover-wrapper[data-placement='bottom'] .gux-arrow,.gux-popover-wrapper[data-placement='bottom-start'] .gux-arrow,.gux-popover-wrapper[data-placement='bottom-end'] .gux-arrow{border-top:1px solid #b4bccb;border-left:1px solid #b4bccb}.gux-popover-wrapper[data-placement='top'] .gux-arrow,.gux-popover-wrapper[data-placement='top-start'] .gux-arrow,.gux-popover-wrapper[data-placement='top-end'] .gux-arrow{border-right:1px solid #b4bccb;border-bottom:1px solid #b4bccb}.gux-popover-wrapper[data-placement='left'] .gux-arrow,.gux-popover-wrapper[data-placement='left-start'] .gux-arrow,.gux-popover-wrapper[data-placement='left-end'] .gux-arrow{border-top:1px solid #b4bccb;border-right:1px solid #b4bccb}.gux-popover-wrapper[data-placement='right'] .gux-arrow,.gux-popover-wrapper[data-placement='right-start'] .gux-arrow,.gux-popover-wrapper[data-placement='right-end'] .gux-arrow{border-bottom:1px solid #b4bccb;border-left:1px solid #b4bccb}");
export { h as gux_popover_list_beta };

import { r, c as p, h as e, g as o } from './p-9031eb6a.js';
import { O as t } from './p-23975bfb.js';
import { b as a } from './p-3701eff0.js';
import { t as i } from './p-6a46bf1b.js';
import { c as s } from './p-e459974a.js';
const d = class {
  constructor(e) {
    r(this, e),
      (this.guxdismiss = p(this, 'guxdismiss', 7)),
      (this.for = void 0),
      (this.position = 'bottom'),
      (this.displayDismissButton = void 0),
      (this.closeOnClickOutside = !1),
      (this.hidden = !0);
  }
  hiddenHandler(r) {
    r || this.popperInstance ? !r && this.popperInstance && this.popperInstance.forceUpdate() : this.runPopper();
  }
  checkForClickOutside(r) {
    const p = r.composedPath(),
      e = document.getElementById(this.for),
      o = p.includes(e);
    (!this.closeOnClickOutside && this.displayDismissButton) || this.hidden || o || this.dismiss();
  }
  runPopper() {
    const r = document.getElementById(this.for);
    r
      ? this.popupElement &&
        (this.popperInstance = s(r, this.popupElement, {
          modifiers: [
            { name: 'offset', options: { offset: [0, 7] } },
            { name: 'arrow', options: { padding: 16 } },
          ],
          placement: this.position,
        }))
      : console.error(`gux-popover-list: invalid "for" attribute. No element in page with the id "${this.for}"`);
  }
  destroyPopper() {
    this.popperInstance && (this.popperInstance.destroy(), (this.popperInstance = null));
  }
  dismiss() {
    this.guxdismiss.emit().defaultPrevented || this.root.setAttribute('hidden', '');
  }
  connectedCallback() {
    i(this.root, { variant: this.position }),
      (this.hiddenObserver = a(this.root, r => {
        this.hidden = r;
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
      { ref: r => (this.popupElement = r), class: 'gux-popover-wrapper' },
      e('div', { class: 'gux-arrow', 'data-popper-arrow': !0 }),
      this.displayDismissButton && e('gux-dismiss-button', { onClick: this.dismiss.bind(this) }),
      e('div', { class: 'gux-popover-content' }, e('slot', null)),
    );
  }
  get root() {
    return o(this);
  }
  static get watchers() {
    return { hidden: ['hiddenHandler'] };
  }
};
(function (r, p, e, o) {
  var t,
    a = arguments.length,
    i = a < 3 ? p : null === o ? (o = Object.getOwnPropertyDescriptor(p, e)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) i = Reflect.decorate(r, p, e, o);
  else for (var s = r.length - 1; s >= 0; s--) (t = r[s]) && (i = (a < 3 ? t(i) : a > 3 ? t(p, e, i) : t(p, e)) || i);
  a > 3 && i && Object.defineProperty(p, e, i);
})([t({ triggerEvents: 'mousedown' })], d.prototype, 'checkForClickOutside', null),
  (d.style =
    ":host{color:#2e394c}.gux-popover-wrapper{z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:8px 0;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-popover-wrapper .gux-arrow,.gux-popover-wrapper .gux-arrow::before{position:absolute;width:10px;height:10px;background:inherit}.gux-popover-wrapper .gux-arrow{visibility:hidden}.gux-popover-wrapper .gux-arrow::before{visibility:visible;content:'';transform:rotate(45deg)}.gux-popover-wrapper[data-popper-placement='bottom'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='bottom-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='bottom-end'] .gux-arrow{top:-5px}.gux-popover-wrapper[data-popper-placement='bottom'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='bottom-start'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='bottom-end'] .gux-arrow::before{border-top:1px solid #b4bccb;border-left:1px solid #b4bccb}.gux-popover-wrapper[data-popper-placement='top'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='top-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='top-end'] .gux-arrow{bottom:-5px}.gux-popover-wrapper[data-popper-placement='top'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='top-start'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='top-end'] .gux-arrow::before{border-right:1px solid #b4bccb;border-bottom:1px solid #b4bccb}.gux-popover-wrapper[data-popper-placement='left'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='left-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='left-end'] .gux-arrow{right:-5px}.gux-popover-wrapper[data-popper-placement='left'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='left-start'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='left-end'] .gux-arrow::before{border-top:1px solid #b4bccb;border-right:1px solid #b4bccb}.gux-popover-wrapper[data-popper-placement='right'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='right-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='right-end'] .gux-arrow{left:-5px}.gux-popover-wrapper[data-popper-placement='right'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='right-start'] .gux-arrow::before,.gux-popover-wrapper[data-popper-placement='right-end'] .gux-arrow::before{border-bottom:1px solid #b4bccb;border-left:1px solid #b4bccb}");
export { d as gux_popover_list };

import { r as t, c as e, h as r, g as o } from './p-9031eb6a.js';
import { O as p } from './p-23975bfb.js';
import { b as i } from './p-3701eff0.js';
import { t as a } from './p-6a46bf1b.js';
import { g as s } from './p-3e6097e5.js';
import { f as n } from './p-82ffe3cc.js';
import { c as h } from './p-e459974a.js';
const d = class {
  constructor(r) {
    t(this, r),
      (this.guxdismiss = e(this, 'guxdismiss', 7)),
      (this.for = void 0),
      (this.position = 'bottom'),
      (this.displayDismissButton = void 0),
      (this.closeOnClickOutside = !1),
      (this.hidden = !0);
  }
  hiddenHandler(t) {
    t || this.popperInstance ? !t && this.popperInstance && this.popperInstance.forceUpdate() : this.runPopper();
  }
  checkForClickOutside(t) {
    const e = t.composedPath(),
      r = n(this.root, this.for),
      o = e.includes(r);
    (!this.closeOnClickOutside && this.displayDismissButton) || this.hidden || o || this.dismiss();
  }
  get titleSlot() {
    return s(this.root, 'title');
  }
  runPopper() {
    const t = n(this.root, this.for);
    t
      ? this.popupElement &&
        (this.popperInstance = h(t, this.popupElement, {
          modifiers: [
            { name: 'computeStyles', options: { gpuAcceleration: !1 } },
            { name: 'offset', options: { offset: [0, 7] } },
            { name: 'arrow', options: { padding: 16 } },
          ],
          placement: this.position,
        }))
      : console.error(`gux-popover: invalid "for" attribute. No element in page with the id "${this.for}"`);
  }
  destroyPopper() {
    this.popperInstance && (this.popperInstance.destroy(), (this.popperInstance = null));
  }
  dismiss() {
    this.guxdismiss.emit().defaultPrevented || this.root.setAttribute('hidden', '');
  }
  connectedCallback() {
    a(this.root, { variant: this.position }),
      (this.hiddenObserver = i(this.root, t => {
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
  renderDismissButton() {
    if (this.displayDismissButton)
      return r('gux-dismiss-button', { onClick: this.dismiss.bind(this), position: 'inherit' });
  }
  render() {
    return r(
      'div',
      { ref: t => (this.popupElement = t), class: 'gux-popover-wrapper' },
      r('div', { class: 'gux-arrow', 'data-popper-arrow': !0 }),
      r(
        'div',
        { class: { 'gux-popover-header': Boolean(this.titleSlot) } },
        r('slot', { name: 'title' }),
        this.renderDismissButton(),
      ),
      r('div', { class: 'gux-popover-content' }, r('slot', null)),
    );
  }
  get root() {
    return o(this);
  }
  static get watchers() {
    return { hidden: ['hiddenHandler'] };
  }
};
(function (t, e, r, o) {
  var p,
    i = arguments.length,
    a = i < 3 ? e : null === o ? (o = Object.getOwnPropertyDescriptor(e, r)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, o);
  else for (var s = t.length - 1; s >= 0; s--) (p = t[s]) && (a = (i < 3 ? p(a) : i > 3 ? p(e, r, a) : p(e, r)) || a);
  i > 3 && a && Object.defineProperty(e, r, a);
})([p({ triggerEvents: 'mousedown' })], d.prototype, 'checkForClickOutside', null),
  (d.style =
    ":host{color:#2e394c}.gux-popover-wrapper{z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:16px;background-color:#fdfdfd;border-radius:4px;box-shadow:0 3px 14px rgba(46, 57, 76, 0.22)}.gux-popover-wrapper .gux-arrow,.gux-popover-wrapper .gux-arrow::before{position:absolute;width:10px;height:10px;background:inherit}.gux-popover-wrapper .gux-arrow{visibility:hidden}.gux-popover-wrapper .gux-arrow::before{visibility:visible;content:'';transform:rotate(45deg)}.gux-popover-wrapper[data-popper-placement='bottom'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='bottom-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='bottom-end'] .gux-arrow{top:-5px}.gux-popover-wrapper[data-popper-placement='top'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='top-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='top-end'] .gux-arrow{bottom:-5px}.gux-popover-wrapper[data-popper-placement='left'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='left-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='left-end'] .gux-arrow{right:-5px}.gux-popover-wrapper[data-popper-placement='right'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='right-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='right-end'] .gux-arrow{left:-5px}.gux-popover-wrapper .gux-popover-header{font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;display:flex;flex-direction:row;align-content:center;align-items:center;justify-content:space-between;padding-bottom:16px}.gux-popover-wrapper gux-dismiss-button{float:right}");
export { d as gux_popover };

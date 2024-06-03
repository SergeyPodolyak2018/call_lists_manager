import { r as t, h as i, H as s, g as o } from './p-9031eb6a.js';
import { a as e, c as a, o as h, f as n, s as r } from './p-42e2cc1f.js';
import { r as l } from './p-cbcbd1bb.js';
import { t as d } from './p-6a46bf1b.js';
import { f as c } from './p-82ffe3cc.js';
import { b as p } from './p-091f51f6.js';
const m = class {
  constructor(i) {
    t(this, i),
      (this.pointerenterHandler = () => this.show()),
      (this.pointerleaveHandler = () => this.hide()),
      (this.focusinHandler = () => this.show()),
      (this.focusoutHandler = () => this.hide()),
      (this.id = l('gux-tooltip')),
      (this.for = void 0),
      (this.placement = 'bottom-start'),
      (this.isShown = !1);
  }
  handleKeyDown(t) {
    'Escape' === t.key && this.isShown && this.hide();
  }
  async showTooltip() {
    this.show();
  }
  async hideTooltip() {
    this.hide();
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = e(this.forElement, this.root, () => this.updatePosition(), {
      ancestorScroll: !0,
      elementResize: !0,
      animationFrame: !1,
      ancestorResize: !0,
    });
  }
  updatePosition() {
    a(this.forElement, this.root, { placement: this.placement, strategy: 'fixed', middleware: [h(16), n(), r()] }).then(
      ({ x: t, y: i, placement: s }) => {
        Object.assign(this.root.style, { left: `${t}px`, top: `${i}px` }), this.root.setAttribute('data-placement', s);
      },
    );
  }
  show() {
    (this.isShown = !0),
      p(() => {
        this.runUpdatePosition();
      });
  }
  hide() {
    this.cleanupUpdatePosition && this.cleanupUpdatePosition(), (this.isShown = !1);
  }
  getForElement() {
    this.forElement = this.for ? c(this.root, this.for) : this.root.parentElement;
  }
  logForAttributeError() {
    this.root.isConnected && console.error(`gux-tooltip: invalid element supplied to 'for': "${this.for}"`);
  }
  connectedCallback() {
    this.getForElement(),
      this.forElement
        ? (this.forElement.setAttribute('aria-describedby', this.id),
          this.forElement.addEventListener('pointerenter', this.pointerenterHandler),
          this.forElement.addEventListener('pointerleave', this.pointerleaveHandler),
          this.forElement.addEventListener('focusin', this.focusinHandler),
          this.forElement.addEventListener('focusout', this.focusoutHandler))
        : this.logForAttributeError();
  }
  componentWillLoad() {
    d(this.root);
  }
  disconnectedCallback() {
    var t, i, s, o, e;
    this.cleanupUpdatePosition && this.cleanupUpdatePosition(),
      null === (t = this.forElement) || void 0 === t || t.removeAttribute('aria-describedby'),
      null === (i = this.forElement) || void 0 === i || i.removeEventListener('pointerenter', this.pointerenterHandler),
      null === (s = this.forElement) || void 0 === s || s.removeEventListener('pointerleave', this.pointerleaveHandler),
      null === (o = this.forElement) || void 0 === o || o.removeEventListener('focusin', this.focusinHandler),
      null === (e = this.forElement) || void 0 === e || e.removeEventListener('focusout', this.focusoutHandler);
  }
  render() {
    return i(
      s,
      { id: this.id, class: { 'gux-show': this.isShown }, role: 'tooltip' },
      i('div', { class: 'gux-container' }, i('slot', null)),
    );
  }
  get root() {
    return o(this);
  }
};
m.style =
  ':host{position:fixed;z-index:var(--gux-zindex-tooltip, 1);display:none;width:max-content;max-width:250px;overflow:hidden;opacity:0}:host(.gux-show){display:block;animation-name:fade-in;animation-duration:250ms;animation-delay:1s;animation-fill-mode:forwards}.gux-container{box-sizing:border-box;padding:6px 12px;color:#2e394c;pointer-events:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}';
export { m as gux_tooltip };

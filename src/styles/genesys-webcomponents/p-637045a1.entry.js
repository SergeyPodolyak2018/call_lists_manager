import { r as t, c as o, h as a, g as i } from './p-9031eb6a.js';
import { r as n } from './p-cbcbd1bb.js';
import { t as s } from './p-6a46bf1b.js';
const e = class {
  constructor(a) {
    t(this, a),
      (this.guxdismiss = o(this, 'guxdismiss', 7)),
      (this.size = 'dynamic'),
      (this.trapFocus = !0),
      (this.initialFocus = void 0);
  }
  handleKeyEvent(t) {
    'Escape' === t.key && this.onDismissHandler(t);
  }
  connectedCallback() {
    this.triggerElement = document.activeElement;
  }
  componentWillLoad() {
    s(this.root, { variant: `${this.size}-${this.trapFocus ? 'trapfocuson' : 'trapfocusoff'}` });
  }
  componentDidLoad() {
    var t, o, a;
    const i = this.getInitialFocusElement();
    i
      ? null === (t = i.focus) || void 0 === t || t.call(i)
      : this.dismissButton && (null === (a = (o = this.dismissButton).focus) || void 0 === a || a.call(o));
  }
  render() {
    const t = this.hasModalTitleSlot(),
      o = this.hasFooterButtons(),
      i = n();
    return a(
      'div',
      { class: 'gux-modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': t ? i : null },
      a(
        'div',
        { class: `gux-modal-container gux-${this.size}` },
        this.renderModalTrapFocusEl(),
        t && a('h1', { class: 'gux-modal-header', id: i }, a('slot', { name: 'title' })),
        a('gux-dismiss-button', { onClick: this.onDismissHandler.bind(this), ref: t => (this.dismissButton = t) }),
        a(
          'div',
          { class: { 'gux-modal-content': !0, 'gux-no-buttons': !o } },
          a('p', null, a('slot', { name: 'content' })),
        ),
        o &&
          a(
            'div',
            { class: 'gux-button-footer' },
            a('div', { class: 'gux-left-align-buttons' }, a('slot', { name: 'left-align-buttons' })),
            a('div', { class: 'gux-right-align-buttons' }, a('slot', { name: 'right-align-buttons' })),
          ),
        this.renderModalTrapFocusEl(),
      ),
    );
  }
  renderModalTrapFocusEl() {
    if (this.trapFocus) return a('span', { onFocus: () => this.dismissButton.focus(), tabindex: '0' });
  }
  getInitialFocusElement() {
    return this.initialFocus ? this.root.querySelector(this.initialFocus) : void 0;
  }
  hasModalTitleSlot() {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }
  hasFooterButtons() {
    return (
      Boolean(this.root.querySelector('[slot="left-align-buttons"]')) ||
      Boolean(this.root.querySelector('[slot="right-align-buttons"]'))
    );
  }
  onDismissHandler(t) {
    var o;
    t.stopPropagation(),
      this.guxdismiss.emit().defaultPrevented ||
        (this.root.remove(), null === (o = this.triggerElement) || void 0 === o || o.focus());
  }
  get root() {
    return i(this);
  }
};
e.style =
  ':host .gux-modal{position:fixed;inset:0;z-index:var(--gux-zindex-modal, 1);display:flex;align-items:center;justify-content:center;color:#2e394c;background:rgba(32, 41, 55, 0.8)}:host .gux-modal .gux-modal-container{box-shadow:0 8px 24px rgba(32, 41, 55, 0.4);position:relative;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;padding:40px;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px}:host .gux-modal .gux-modal-container.gux-small{width:416px;max-height:min(368px, 100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-medium{width:672px;max-height:min(640px, 100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-large{width:940px;max-height:min(640px, 100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-dynamic{max-width:calc(100vw - 2 * 24px);max-height:calc(100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-dynamic .gux-modal-content{max-height:none}:host .gux-modal .gux-modal-container .gux-modal-header{padding-bottom:24px;margin:0;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}:host .gux-modal .gux-modal-container .gux-modal-content{max-height:432px;margin:0 8px 24px;overflow-y:auto}:host .gux-modal .gux-modal-container .gux-modal-content.gux-no-buttons{margin-bottom:0}:host .gux-modal .gux-modal-container .gux-button-footer{display:flex;justify-content:space-between}:host .gux-modal .gux-modal-container .gux-button-footer .gux-left-align-buttons gux-button{padding-right:5px}:host .gux-modal .gux-modal-container .gux-button-footer .gux-right-align-buttons gux-button{padding-left:5px}@media (max-width: 416px){:host .gux-modal .gux-modal-container.gux-small,:host .gux-modal .gux-modal-container.gux-medium,:host .gux-modal .gux-modal-container.gux-large{width:100%;height:100%}}';
export { e as gux_modal };

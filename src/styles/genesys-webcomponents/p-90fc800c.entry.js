import { r as e, d as t, h as n, g as i } from './p-9031eb6a.js';
import { t as o } from './p-6a46bf1b.js';
import { O as a } from './p-c3f208cd.js';
const s = class {
  constructor(t) {
    e(this, t), (this.blankStateSize = void 0);
  }
  onResize() {
    this.setBlankStateSize();
  }
  componentWillLoad() {
    o(this.root);
  }
  componentDidLoad() {
    this.setBlankStateSize();
  }
  setBlankStateSize() {
    t(() => {
      const e = this.root.clientWidth;
      this.blankStateSize = e <= 160 ? 'small' : e <= 300 ? 'medium' : 'large';
    });
  }
  render() {
    return n(
      'div',
      { class: { 'gux-container': !0, [`gux-${this.blankStateSize}`]: !0 } },
      n('slot', { name: 'image' }),
      n('div', { class: 'gux-message-container' }, n('slot', { name: 'primary-message' })),
      n('div', { class: 'gux-guidance-container' }, n('slot', { name: 'additional-guidance' })),
      n('gux-button-slot-beta', { accent: 'primary' }, n('slot', { name: 'call-to-action' })),
    );
  }
  get root() {
    return i(this);
  }
};
(function (e, t, n, i) {
  var o,
    a = arguments.length,
    s = a < 3 ? t : null === i ? (i = Object.getOwnPropertyDescriptor(t, n)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, i);
  else for (var g = e.length - 1; g >= 0; g--) (o = e[g]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, n, s) : o(t, n)) || s);
  a > 3 && s && Object.defineProperty(t, n, s);
})([a()], s.prototype, 'onResize', null),
  (s.style =
    ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container ::slotted(gux-icon){width:48px;height:48px;color:#c8cfda}.gux-container slot[name='primary-message']{color:#364154;text-align:center;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:14px;line-height:20px}.gux-container slot[name='additional-guidance']{color:#364154;text-align:center;font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}.gux-container.gux-small .gux-message-container,.gux-container.gux-medium .gux-message-container{padding:8px 0 4px}.gux-container.gux-small .gux-guidance-container,.gux-container.gux-medium .gux-guidance-container{padding-bottom:8px}.gux-container.gux-large .gux-message-container{padding:16px 0 4px}.gux-container.gux-large .gux-message-container slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}.gux-container.gux-large .gux-guidance-container{padding-bottom:16px}.gux-container.gux-large .gux-guidance-container slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}");
export { s as gux_blank_state_beta };

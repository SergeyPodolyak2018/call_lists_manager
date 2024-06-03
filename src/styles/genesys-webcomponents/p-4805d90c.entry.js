import { r as e, d as t, h as i, g as n } from './p-9031eb6a.js';
import { a } from './p-091f51f6.js';
import { t as o } from './p-6a46bf1b.js';
const s = class {
  constructor(t) {
    e(this, t), (this.hasAdditionalGuidance = void 0), (this.loadingMessageSize = void 0);
  }
  updateLoadingMessageSize() {
    t(() => {
      const e = this.root.clientWidth;
      this.loadingMessageSize = e <= 160 ? 'small' : e <= 300 ? 'medium' : 'large';
    });
  }
  componentWillLoad() {
    o(this.root);
  }
  componentDidLoad() {
    !this.resizeObserver &&
      window.ResizeObserver &&
      (this.resizeObserver = new ResizeObserver(() => {
        this.updateLoadingMessageSize();
      })),
      this.resizeObserver && this.resizeObserver.observe(this.root),
      a(() => {
        this.updateLoadingMessageSize();
      }, 500);
  }
  disconnectedCallback() {
    this.resizeObserver && this.resizeObserver.unobserve(this.root);
  }
  render() {
    return i(
      'div',
      {
        class: { 'gux-container': !0, [`gux-${this.loadingMessageSize}`]: !0 },
        role: 'alert',
        'aria-live': 'assertive',
      },
      i('slot', { name: 'progress' }),
      i('slot', { name: 'primary-message' }),
      i('slot', { name: 'additional-guidance' }),
    );
  }
  get root() {
    return n(this);
  }
};
s.style =
  ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container slot[name='primary-message']{color:#364154;text-align:center}.gux-container slot[name='additional-guidance']{color:#596373;text-align:center}.gux-container.gux-small,.gux-container.gux-medium{padding:8px 0 4px}.gux-container.gux-small slot[name='primary-message'],.gux-container.gux-medium slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:14px;line-height:20px}.gux-container.gux-small slot[name='additional-guidance'],.gux-container.gux-medium slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}.gux-container.gux-large{padding:16px 0 4px}.gux-container.gux-large slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}.gux-container.gux-large slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}";
export { s as gux_loading_message_beta };

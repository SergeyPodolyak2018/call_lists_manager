import { r as t, c as o, h as i, H as e, g as s } from './p-9031eb6a.js';
import { t as n } from './p-6a46bf1b.js';
const a = class {
  constructor(i) {
    t(this, i), (this.guxdismiss = o(this, 'guxdismiss', 7)), (this.accent = 'neutral');
  }
  componentWillLoad() {
    n(this.root, { variant: this.accent });
  }
  render() {
    return i(
      e,
      null,
      i('div', { class: `gux-icon gux-${this.accent}` }, i('slot', { name: 'icon' })),
      i(
        'div',
        { class: 'gux-content' },
        i('gux-truncate-beta', { class: 'gux-title', 'max-lines': 1 }, i('slot', { name: 'title' })),
        i('gux-truncate-beta', { class: 'gux-message', 'max-lines': 2 }, i('slot', { name: 'message' })),
      ),
      i('gux-dismiss-button', { onClick: this.onDismissClickHandler.bind(this) }),
    );
  }
  onDismissClickHandler(t) {
    t.stopPropagation(), this.guxdismiss.emit().defaultPrevented || this.root.remove();
  }
  get root() {
    return s(this);
  }
};
a.style =
  ':host{position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;width:294px;padding:16px 8px 16px 16px;margin-bottom:4px;color:#2e394c;background:#f6f7f9;border:1px solid #b4bccb;border-color:#b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-icon{flex:0 1 auto;align-self:auto;order:0;margin:4px}.gux-icon ::slotted(gux-icon){width:24px !important;height:24px !important}.gux-icon.gux-alert{color:#ea0b0b}.gux-icon.gux-warning{color:#ffae00}.gux-icon.gux-positive{color:#3c8527}.gux-icon.gux-neutral{color:#203b73}.gux-content{display:flex;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;align-self:auto;justify-content:flex-start;order:0;margin:0 12px 0 8px;color:#2e394c}.gux-content .gux-title,.gux-content .gux-message{flex:1 1 auto;align-self:auto;order:0}.gux-content .gux-title{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:20px}';
export { a as gux_notification_toast };

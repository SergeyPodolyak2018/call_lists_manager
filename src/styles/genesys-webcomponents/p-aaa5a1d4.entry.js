import { r as t, f as e, h as i, g as o } from './p-9031eb6a.js';
import { O as n } from './p-f222d4b1.js';
import { O as l } from './p-c3f208cd.js';
function r(t) {
  return t
    .reduce((t, e) => {
      if ('SLOT' === e.nodeName) {
        const i = e.assignedNodes();
        return t.concat(r(i));
      }
      return t.concat(e.textContent);
    }, [])
    .map(t => t.trim())
    .join(' ');
}
var a = function (t, e, i, o) {
  var n,
    l = arguments.length,
    r = l < 3 ? e : null === o ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, o);
  else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (r = (l < 3 ? n(r) : l > 3 ? n(e, i, r) : n(e, i)) || r);
  return l > 3 && r && Object.defineProperty(e, i, r), r;
};
const s = class {
  constructor(e) {
    t(this, e), (this.maxLines = void 0);
  }
  async setShowTooltip() {
    var t;
    await (null === (t = this.tooltipElement) || void 0 === t ? void 0 : t.showTooltip());
  }
  async setHideTooltip() {
    var t;
    await (null === (t = this.tooltipElement) || void 0 === t ? void 0 : t.hideTooltip());
  }
  onMutation() {
    e(this.root);
  }
  onResize() {
    e(this.root);
  }
  getTooltipContent() {
    return r(Array.from(this.root.childNodes)) || '';
  }
  needsTruncation() {
    const t = this.root.shadowRoot.querySelector('.gux-truncate-slot-container');
    return (
      (null == t ? void 0 : t.scrollWidth) > (null == t ? void 0 : t.offsetWidth) ||
      (null == t ? void 0 : t.scrollHeight) > (null == t ? void 0 : t.offsetHeight)
    );
  }
  renderTooltip() {
    return this.needsTruncation()
      ? i('gux-tooltip', { 'aria-hidden': 'true', ref: t => (this.tooltipElement = t) }, this.getTooltipContent())
      : null;
  }
  render() {
    var t;
    return i(
      'div',
      { class: { 'gux-truncate-multi-line': Boolean(this.maxLines) } },
      i(
        'span',
        {
          class: 'gux-truncate-slot-container',
          style: { webkitLineClamp: null === (t = this.maxLines) || void 0 === t ? void 0 : t.toString() },
        },
        i('slot', null),
      ),
      this.renderTooltip(),
    );
  }
  get root() {
    return o(this);
  }
};
a([n({ childList: !0, subtree: !0, characterData: !0 })], s.prototype, 'onMutation', null),
  a([l()], s.prototype, 'onResize', null),
  (s.style =
    ':host{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:inherit}::slotted(*){display:inline}.gux-truncate-multi-line{white-space:normal}.gux-truncate-multi-line .gux-truncate-slot-container{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}gux-tooltip{font-weight:normal;line-height:normal;text-align:left;overflow-wrap:break-word;white-space:normal}.gux-truncate-slot-container>*{display:inline}.gux-truncate-slot-container{display:block;overflow:hidden;text-overflow:ellipsis}');
export { s as gux_truncate_beta };

import { r as t, h as e, g as i } from './p-9031eb6a.js';
import { a as o } from './p-d0805f56.js';
import { O as s } from './p-f222d4b1.js';
import { a as n } from './p-091f51f6.js';
const r = class {
  constructor(e) {
    t(this, e), (this.hasTooltip = !1), (this.showTooltip = !1), (this.iconOnly = !1), (this.titleName = '');
  }
  onmouseenter(t) {
    t.buttons || (this.showTooltip = !0);
  }
  onmouseleave() {
    this.showTooltip = !1;
  }
  onmousedown() {
    this.showTooltip = !1;
  }
  async setShowTooltip() {
    this.tooltipElement && ((this.showTooltip = !0), await this.tooltipElement.showTooltip());
  }
  async setHideTooltip() {
    this.tooltipElement && ((this.showTooltip = !1), await this.tooltipElement.hideTooltip());
  }
  onMutation() {
    (this.titleName = this.setTooltipTitleText()),
      this.checkForTooltipHideOrShow(),
      n(() => {
        this.checkForTooltipHideOrShow();
      }, 500);
  }
  componentWillLoad() {
    this.titleName = this.setTooltipTitleText();
  }
  componentDidLoad() {
    this.logWarnNoIconSrText();
  }
  logWarnNoIconSrText() {
    this.iconOnly &&
      !this.titleName &&
      o(
        this.root,
        'No screenreader-text provided. Provide a localized screenreader-text property for the gux-icon. The screenreader-text property is used for the icon screenreader text and the tooltip.',
      );
  }
  addIconDecorative() {
    this.root.classList.add('gux-tooltip-icon-decorative');
  }
  getTitleElements() {
    var t;
    const e = this.root.querySelector('slot'),
      i = null === (t = this.root.querySelector('.gux-title-container span')) || void 0 === t ? void 0 : t.children;
    return e ? e.assignedElements() : i ? Array.from(i) : [];
  }
  getTitleTextContent() {
    return this.root.querySelector('slot')
      ? this.root
          .querySelector('slot')
          .assignedNodes()
          .map(t => t.textContent)
          .join('')
          .trim()
      : this.root.querySelector('.gux-title-container')
      ? this.root.querySelector('.gux-title-container').textContent.trim()
      : '';
  }
  setTooltipTitleText() {
    let t = this.getTitleTextContent();
    return (
      this.getTitleElements().forEach(e => {
        'GUX-ICON' !== e.tagName || this.getTitleTextContent()
          ? 'GUX-ICON' === e.tagName && this.getTitleTextContent() && this.addIconDecorative()
          : ((this.iconOnly = !0), (t = e.getAttribute('screenreader-text')));
      }),
      t
    );
  }
  checkForTooltipHideOrShow() {
    const t = this.root.querySelector('.gux-title-container');
    this.root.classList.remove('gux-overflow-hidden'),
      this.iconOnly && this.titleName
        ? (this.hasTooltip = !0)
        : (null == t ? void 0 : t.scrollWidth) > (null == t ? void 0 : t.offsetWidth)
        ? (this.root.classList.add('gux-overflow-hidden'), (this.hasTooltip = !0))
        : (this.hasTooltip = !1);
  }
  render() {
    return [e('span', { class: 'gux-title-container' }, e('slot', null)), this.renderTooltip()];
  }
  renderTooltip() {
    if (this.hasTooltip)
      return e(
        'gux-tooltip',
        { 'aria-hidden': 'true', ref: t => (this.tooltipElement = t), hidden: !this.showTooltip },
        this.titleName,
      );
  }
  get root() {
    return i(this);
  }
};
(function (t, e, i, o) {
  var s,
    n = arguments.length,
    r = n < 3 ? e : null === o ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, o);
  else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (r = (n < 3 ? s(r) : n > 3 ? s(e, i, r) : s(e, i)) || r);
  n > 3 && r && Object.defineProperty(e, i, r);
})([s({ childList: !0, subtree: !0, characterData: !0 })], r.prototype, 'onMutation', null),
  (r.style =
    'gux-tooltip-title{overflow:hidden}gux-tooltip{font-weight:normal;line-height:normal;text-align:left;overflow-wrap:break-word;white-space:normal}.gux-overflow-hidden .gux-title-container ::slotted(span){overflow:hidden;text-overflow:ellipsis}.gux-overflow-hidden .gux-title-container>*{overflow:hidden;text-overflow:ellipsis}.gux-title-container{display:flex;pointer-events:none}.gux-tooltip-icon-decorative .gux-title-container{position:relative;margin-left:calc(16px + 4px)}.gux-tooltip-icon-decorative .gux-title-container gux-icon,.gux-tooltip-icon-decorative .gux-title-container ::slotted(gux-icon){position:absolute;left:calc(-16px - 4px);flex-shrink:0;width:16px}');
export { r as gux_tooltip_title };

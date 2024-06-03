import { r as i, h as t, H as e, g as o } from './p-9031eb6a.js';
import { r as s } from './p-cbcbd1bb.js';
const n = class {
  constructor(t) {
    i(this, t),
      (this.value = void 0),
      (this.iconName = void 0),
      (this.iconSrText = void 0),
      (this.iconColor = void 0),
      (this.active = !1),
      (this.selected = !1),
      (this.disabled = !1),
      (this.filtered = !1),
      (this.hovered = !1);
  }
  onmouseenter() {
    this.hovered = !0;
  }
  onMouseleave() {
    this.hovered = !1;
  }
  handleActive(i) {
    var t, e;
    i
      ? null === (t = this.truncateElement) || void 0 === t || t.setShowTooltip()
      : null === (e = this.truncateElement) || void 0 === e || e.setHideTooltip();
  }
  componentWillLoad() {
    this.root.id = this.root.id || s('gux-option-icon');
  }
  getAriaSelected() {
    return !this.disabled && (this.selected ? 'true' : 'false');
  }
  render() {
    let i = null;
    return (
      null === this.iconColor || this.hovered || this.active || (i = { color: this.iconColor }),
      t(
        e,
        {
          role: 'option',
          class: {
            'gux-active': this.active,
            'gux-disabled': this.disabled,
            'gux-filtered': this.filtered,
            'gux-hovered': this.hovered,
            'gux-selected': this.selected,
          },
          'aria-selected': this.getAriaSelected(),
          'aria-disabled': this.disabled.toString(),
        },
        t('gux-icon', {
          decorative: null == this.iconSrText,
          'screenreader-text': this.iconSrText,
          'icon-name': this.iconName,
          style: i,
        }),
        t('gux-truncate-beta', { ref: i => (this.truncateElement = i) }, t('slot', null)),
      )
    );
  }
  get root() {
    return o(this);
  }
  static get watchers() {
    return { active: ['handleActive'] };
  }
};
n.style =
  'gux-option-icon{box-sizing:border-box;display:flex;height:32px;padding:6px 8px;color:#2e394c;word-wrap:break-word;cursor:pointer;align-items:flex-start}gux-option-icon.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option-icon.gux-selected{background:#deeaff}gux-option-icon.gux-active,gux-option-icon.gux-hovered:not(:disabled){color:#fdfdfd;background:#2a60c8}gux-option-icon.gux-filtered{display:none}gux-option-icon .gux-slot-container{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}gux-option-icon gux-icon{flex-shrink:0;width:16px;height:16px;margin-block-start:calc((20px - 16px) / 2);margin-inline-end:8px}';
export { n as gux_option_icon };

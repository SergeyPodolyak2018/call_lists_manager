import { r as i, h as e } from './p-9031eb6a.js';
const s = class {
  constructor(e) {
    i(this, e),
      (this.checked = !1),
      (this.disabled = !1),
      (this.guxAriaLabel = ''),
      (this.labelId = ''),
      (this.errorId = '');
  }
  componentDidLoad() {
    var i, e, s;
    this.labelId
      ? null === (i = this.checkboxElement) || void 0 === i || i.setAttribute('aria-labelledby', this.labelId)
      : null === (e = this.checkboxElement) || void 0 === e || e.setAttribute('aria-label', this.guxAriaLabel),
      this.errorId &&
        (null === (s = this.checkboxElement) || void 0 === s || s.setAttribute('aria-describedby', this.errorId));
  }
  render() {
    return e(
      'div',
      {
        class: { 'gux-toggle-slider': !0, 'gux-checked': this.checked, 'gux-disabled': this.disabled },
        role: 'checkbox',
        'aria-checked': this.checked.toString(),
        'aria-disabled': this.disabled.toString(),
        tabindex: this.disabled ? '' : '0',
        ref: i => (this.checkboxElement = i),
      },
      e(
        'div',
        { class: 'gux-slider' },
        e('div', { class: 'gux-switch' }, e('gux-icon', { 'icon-name': 'checkmark', decorative: !0 })),
      ),
    );
  }
};
s.style =
  "gux-toggle-slider{display:flex;align-items:center;padding:2px;outline:none}gux-toggle-slider .gux-toggle-slider{position:relative;display:inline-block;flex:0 1 auto;align-self:auto;order:0;width:30px;height:16px;border-radius:8px}gux-toggle-slider .gux-toggle-slider.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-toggle-slider .gux-toggle-slider:focus-visible{outline:none;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-toggle-slider .gux-toggle-slider .gux-slider{position:absolute;inset:0;background-color:#6b7585;border-radius:8px;transition:background-color 0.5s ease}gux-toggle-slider .gux-toggle-slider .gux-slider .gux-switch{position:absolute;bottom:1px;left:1px;width:14px;height:14px;content:'';background-color:#fdfdfd;border-radius:50%;transition:0.5s}gux-toggle-slider .gux-toggle-slider .gux-slider .gux-switch gux-icon{position:absolute;inset:0;width:12px;height:12px;padding:1px;color:#fdfdfd;opacity:0;transition:color 0.5s linear}gux-toggle-slider .gux-toggle-slider.gux-checked .gux-slider{background-color:#2a60c8}gux-toggle-slider .gux-toggle-slider.gux-checked .gux-slider .gux-switch{transform:translateX(14px)}gux-toggle-slider .gux-toggle-slider.gux-checked .gux-slider .gux-switch gux-icon{color:#2a60c8;opacity:1;transition:opacity 0.25s linear;transition-delay:0.25s}";
export { s as gux_toggle_slider };

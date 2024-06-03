import { r as t, c as i, h as e, H as o } from './p-9031eb6a.js';
const n = class {
  constructor(e) {
    t(this, e), (this.press = i(this, 'press', 7)), (this.text = void 0), (this.value = void 0), (this.disabled = !1);
  }
  handleClick() {
    this.onItemClicked();
  }
  onKeydown(t) {
    if ('Enter' === t.key) return t.preventDefault(), void this.onItemClicked();
  }
  onKeyup(t) {
    if (' ' === t.key) return t.preventDefault(), void this.onItemClicked();
  }
  onItemClicked() {
    this.disabled || this.press.emit(this.value);
  }
  render() {
    return e(
      o,
      { role: 'listitem' },
      e(
        'button',
        {
          disabled: this.disabled,
          onClick: () => this.onItemClicked(),
          class: { 'gux-action-item': !0, 'gux-disabled': this.disabled },
        },
        this.text,
        e('slot', null),
      ),
    );
  }
};
n.style =
  ':host{outline:none}.gux-action-item{display:flex;width:100%;height:max-content;padding:0 16px;font-family:inherit;font-size:inherit;line-height:32px;text-align:left;word-wrap:break-word;cursor:pointer;background-color:inherit;border:none}.gux-action-item:focus-within:not([disabled]),.gux-action-item:active:not([disabled]),.gux-action-item:hover:not([disabled]){color:#fdfdfd;background:#2a60c8;outline:none}.gux-action-item .gux-text{width:100%}.gux-action-item.gux-disabled{pointer-events:none;cursor:default}';
export { n as gux_action_item };

import { r as t, c as e, h as o, g as i } from './p-9031eb6a.js';
import { b as s } from './p-54ad2682.js';
import './p-8a133b9b.js';
const a = { clearSelection: 'Clear {numberSelected} selected items' },
  n = class {
    constructor(o) {
      t(this, o),
        (this.internalclearselected = e(this, 'internalclearselected', 7)),
        (this.disabled = !1),
        (this.numberSelected = 0),
        (this.label = '');
    }
    onKeyDown(t) {
      switch (t.key) {
        case 'Backspace':
        case 'Delete':
          this.removeTag();
      }
    }
    removeTag() {
      this.disabled || this.internalclearselected.emit();
    }
    renderRemoveButton() {
      return o(
        'button',
        { class: 'gux-tag-remove-button', onClick: this.removeTag.bind(this), type: 'button', disabled: this.disabled },
        o('gux-icon', {
          class: 'gux-tag-remove-icon',
          'icon-name': 'close',
          'screenreader-text': this.i18n('clearSelection', { numberSelected: this.numberSelected.toString() }),
        }),
      );
    }
    async componentWillRender() {
      this.i18n = await s(this.root, a);
    }
    render() {
      return o(
        'div',
        { class: { 'gux-tag': !0, 'gux-disabled': this.disabled }, 'aria-disabled': this.disabled.toString() },
        this.numberSelected.toString(),
        this.renderRemoveButton(),
      );
    }
    get root() {
      return i(this);
    }
  };
n.style =
  ':host{display:inline-block}.gux-tag{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;padding:2px 4px 2px 8px;font-size:12px;font-weight:bold;color:#2e394c;background-color:#e2e6ee;border-radius:4px}.gux-tag .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-tag .gux-tag-remove-button{all:unset;display:flex;align-content:center;align-items:center;justify-content:center;margin-left:7px}.gux-tag .gux-tag-remove-button:not(:disabled):hover{cursor:pointer}.gux-tag .gux-tag-remove-button .gux-tag-remove-icon{width:16px;height:16px;border-radius:25%}.gux-tag .gux-tag-remove-button:focus-within .gux-tag-remove-icon{outline:2px solid #aac9ff;outline-offset:0}.gux-tag.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(226, 230, 238, 0.5)}';
export { n as gux_dropdown_multi_tag };

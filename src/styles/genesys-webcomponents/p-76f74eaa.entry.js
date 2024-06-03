import { r as t, c as e, h as o, H as i, g as s } from './p-9031eb6a.js';
import { r as n } from './p-cbcbd1bb.js';
import { b as r } from './p-54ad2682.js';
import './p-8a133b9b.js';
const a = {
    createCustomOptionInstructions: ', select to create a new custom option',
    createOption: 'Add "{optionValue}"',
  },
  c = class {
    constructor(o) {
      t(this, o),
        (this.internalcreatenewoption = e(this, 'internalcreatenewoption', 7)),
        (this.value = void 0),
        (this.active = !1),
        (this.hidden = !0),
        (this.filtered = !0),
        (this.hovered = !1);
    }
    onmouseenter() {
      this.hovered = !0;
    }
    onMouseleave() {
      this.hovered = !1;
    }
    async guxEmitInternalCreateNewOption() {
      this.internalcreatenewoption.emit();
    }
    handleClick() {
      this.internalcreatenewoption.emit(this.value);
    }
    async componentWillLoad() {
      (this.i18n = await r(this.root, a)), (this.root.id = this.root.id || n('gux-option-multi'));
    }
    renderCustomOptionInstructions() {
      return o('span', { class: 'gux-screenreader' }, this.i18n('createCustomOptionInstructions'));
    }
    render() {
      return o(
        i,
        {
          role: 'option',
          'aria-selected': !1,
          class: { 'gux-active': this.active, 'gux-hovered': this.hovered, 'gux-filtered': this.filtered },
        },
        o(
          'div',
          { class: 'gux-option' },
          o('gux-icon', { decorative: !0, iconName: 'add' }),
          o('div', { class: 'gux-create-text' }, this.i18n('createOption', { optionValue: this.value })),
          this.renderCustomOptionInstructions(),
        ),
      );
    }
    get root() {
      return s(this);
    }
  };
c.style =
  'gux-create-option{font-family:Roboto, sans-serif;font-weight:400;font-weight:700;box-sizing:border-box;display:flex;min-height:32px;padding:6px 12px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-create-option.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-create-option.gux-active,gux-create-option.gux-hovered:not([disabled]){color:#fdfdfd;background:#2a60c8}gux-create-option.gux-filtered{display:none}gux-create-option gux-icon{width:16px;height:100%;padding-right:10px}gux-create-option .gux-option{display:inline-flex}gux-create-option .gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}';
export { c as gux_create_option };

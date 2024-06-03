import { r as o, h as t, g as i, c as n } from './p-9031eb6a.js';
const r = [
    '#203B73',
    '#75A8FF',
    '#8452CF',
    '#1DA8B3',
    '#B5B5EB',
    '#CC3EBE',
    '#5E6782',
    '#FF8FDD',
    '#868C1E',
    '#DDD933',
  ],
  e = class {
    constructor(t) {
      o(this, t), (this.color = void 0);
    }
    onColorSelect(o) {
      const t = o.target;
      (this.color = t.value),
        (this.input.value = t.value),
        this.input.dispatchEvent(new Event('input', { bubbles: !0, cancelable: !0 })),
        this.input.dispatchEvent(new Event('change', { bubbles: !0 }));
    }
    componentWillLoad() {
      (this.input = this.root.querySelector('input[slot="input"]')), (this.color = this.input.value);
    }
    render() {
      return [
        t('div', { hidden: !0 }, t('slot', { name: 'input' })),
        t('div', null, t('div', { class: 'gux-input-color-matrix' }, this.renderDefaultTiles())),
      ];
    }
    renderDefaultTiles() {
      return r.map((o, i) =>
        t('gux-input-color-option', {
          key: `${o}-${i}`,
          value: o,
          active: this.color.toLowerCase() === o.toLowerCase(),
        }),
      );
    }
    get root() {
      return i(this);
    }
  };
e.style =
  'gux-color-select{display:inline-block;color:#2e394c}gux-color-select>div{box-sizing:border-box;padding:20px 0 12px;margin-top:2px;background-color:#f6f7f9;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-color-select .gux-input-color-matrix{display:flex;flex-wrap:wrap;align-content:flex-start;width:120px;padding:0 20px 8px;margin:0}gux-color-select .gux-input-color-matrix>*{display:none}gux-color-select .gux-input-color-matrix>gux-input-color-option{display:inline-block}';
const l = class {
  constructor(t) {
    o(this, t), (this.colorSelect = n(this, 'colorSelect', 7)), (this.active = void 0), (this.value = void 0);
  }
  render() {
    return t('button', {
      type: 'button',
      value: this.value,
      class: this.active ? 'gux-input-color-option-active' : '',
      disabled: !this.value,
      style: this.value && { 'background-color': this.value },
      title: this.value,
      onClick: this.onColorOptionClickHandler.bind(this),
    });
  }
  onColorOptionClickHandler() {
    this.colorSelect.emit(this.value);
  }
};
l.style =
  'gux-input-color-option{color:#2e394c}gux-input-color-option>button{display:inline-block;flex:0 0 16px;width:16px;height:16px;padding:0;margin:4px;font-size:0;line-height:0;cursor:pointer;border:none}gux-input-color-option>button:not(:disabled):hover,gux-input-color-option>button:focus-visible,gux-input-color-option>button.gux-input-color-option-active,gux-input-color-option>button:active{border:1px white solid;outline:1px solid #2a60c8}gux-input-color-option>button:disabled{cursor:default;background-color:#fdfdfd;border:1px solid #2e394c;opacity:0.5}gux-input-color-option button::-moz-focus-inner{border:none}';
export { e as gux_color_select, l as gux_input_color_option };

import { r as t, c as i, h as o, g as s, H as e } from './p-9031eb6a.js';
const n = /[-/\\^$*+?.()|[\]{}]/g,
  r = class {
    constructor(o) {
      t(this, o),
        (this.selectedChanged = i(this, 'selectedChanged', 7)),
        (this.value = void 0),
        (this.disabled = void 0),
        (this.filtered = void 0),
        (this.selected = void 0),
        (this.text = void 0),
        (this.highlight = void 0);
    }
    getDisplayedValue() {
      return Promise.resolve(this.text);
    }
    shouldFilter(t) {
      if (((this.highlight = t), (this.highlightIndex = -1), !t)) return Promise.resolve(!1);
      const i = new RegExp(t.replace(n, '\\$&'), 'gi').exec(this.text),
        o = null === i;
      return o || (this.highlightIndex = i.index), Promise.resolve(o);
    }
    componentDidLoad() {
      (this.root.onclick = () => {
        this.onItemClicked();
      }),
        (this.root.onkeydown = t => {
          switch (t.key) {
            case ' ':
            case 'Enter':
              (this.selected = !0), this.selectedChanged.emit(this.value);
          }
        });
    }
    hostData() {
      return { tabindex: '0' };
    }
    __stencil_render() {
      return o('div', { class: 'gux-dropdown-option', title: this.text }, this.textWithHighlights());
    }
    textWithHighlights() {
      if (!this.highlight || !this.text) return o('span', null, this.text);
      if (this.highlightIndex < 0) return o('span', null, this.text);
      const t = this.text.substring(0, this.highlightIndex),
        i = this.text.substring(this.highlightIndex, this.highlightIndex + this.highlight.length),
        s = this.text.substring(t.length + this.highlight.length);
      return o('span', null, t, o('strong', null, i), s);
    }
    onItemClicked() {
      (this.selected = !0), this.selectedChanged.emit(this.value);
    }
    get root() {
      return s(this);
    }
    render() {
      return o(e, this.hostData(), this.__stencil_render());
    }
  };
r.style =
  "gux-dropdown-option{position:relative;display:flex;height:var(--option-height);padding:0 16px;line-height:32px;cursor:pointer}gux-dropdown-option div.gux-dropdown-option{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}gux-dropdown-option div.gux-dropdown-option .gux-ghost{position:absolute}gux-dropdown-option[filtered]{display:none}gux-dropdown-option[disabled]{pointer-events:none;cursor:default;opacity:0.5}gux-dropdown-option[disabled='false']{pointer-events:auto;cursor:pointer;opacity:1}gux-dropdown-option:not(:disabled)[selected]{color:#2e394c;background:#deeaff}gux-dropdown-option:not(:disabled):hover,gux-dropdown-option:not(:disabled):focus-visible{color:#fdfdfd;background:#2a60c8}";
export { r as gux_dropdown_option };

import { r as t, h as e, H as o, g as s } from './p-9031eb6a.js';
import { l as r, f as n, n as i, p as a, a as d } from './p-417354e9.js';
import { g as c } from './p-8a133b9b.js';
const l = ['gux-month-list-item'],
  u = class {
    constructor(e) {
      t(this, e);
    }
    onKeyDown(t) {
      switch (t.key) {
        case 'ArrowUp':
          t.preventDefault(), d(this.root, l, -3);
          break;
        case 'ArrowDown':
          t.preventDefault(), d(this.root, l, 3);
          break;
        case 'ArrowLeft':
          t.preventDefault(), a(this.root, l);
          break;
        case 'ArrowRight':
          t.preventDefault(), i(this.root, l);
          break;
        case 'Home':
          t.preventDefault(), n(this.root, l);
          break;
        case 'End':
          t.preventDefault(), r(this.root, l);
      }
    }
    async guxFocusFirstItem() {
      n(this.root, l);
    }
    renderFocusTarget() {
      return e('span', { tabindex: '1' });
    }
    render() {
      return e(o, { role: 'list' }, this.renderFocusTarget(), e('slot', null));
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return s(this);
    }
  };
u.style =
  ':host{display:flex;flex-direction:row;flex-wrap:wrap;padding:12px 16px;background-color:#fdfdfd;border:1px solid #b4bccb}';
const b = class {
  constructor(e) {
    t(this, e), (this.value = void 0), (this.disabled = !1), (this.selected = !1);
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const t = c('gux-month-list', this.root);
    t && null === t.shadowRoot.activeElement && (this.root.blur(), t.focus());
  }
  render() {
    return e(
      o,
      { role: 'listitem', value: this.value },
      e(
        'div',
        { class: 'gux-container' },
        e(
          'button',
          { class: { 'gux-selected': this.selected }, type: 'button', tabIndex: -1, disabled: this.disabled },
          e('slot', null),
        ),
      ),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return s(this);
  }
};
b.style =
  ":host{flex:0 0 33.3%}:host([disabled]){pointer-events:none}:host([disabled='false']){pointer-events:auto}::slotted(gux-icon){width:16px;height:16px;margin-right:8px;vertical-align:middle}.gux-container{padding:4px}.gux-container button{all:unset;box-sizing:border-box;width:100%;height:49px;padding:8px 0;color:#2e394c;text-align:center;word-wrap:break-word;cursor:pointer;border:none;border-radius:4px;outline:none}.gux-container button.gux-selected{color:#fdfdfd;background:#2a60c8}.gux-container button:focus-visible:not(:disabled){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-container button:hover:not(:disabled){color:#fdfdfd;background:#2a60c8}.gux-container button:active:not(:disabled){color:#fdfdfd;background:#2a60c8}.gux-container button:disabled{color:rgba(46, 57, 76, 0.5);cursor:default}";
export { u as gux_month_list, b as gux_month_list_item };

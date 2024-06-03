import { r as t, h as o, H as e, g as s } from './p-9031eb6a.js';
import { g as r } from './p-8a133b9b.js';
const n = class {
  constructor(o) {
    t(this, o), (this.disabled = !1);
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const t = r('gux-list', this.root);
    t && null === t.shadowRoot.activeElement && (this.root.blur(), t.focus({ preventScroll: !0 }));
  }
  render() {
    return o(
      e,
      { role: 'listitem' },
      o('button', { type: 'button', tabIndex: -1, disabled: this.disabled }, o('slot', null)),
    );
  }
  static get delegatesFocus() {
    return !0;
  }
  get root() {
    return s(this);
  }
};
n.style =
  ":host{width:100%;outline:none}:host([disabled]){pointer-events:none}:host([disabled='false']){pointer-events:auto}::slotted(gux-icon){width:16px;height:16px;margin-right:8px;vertical-align:middle}button{all:unset;box-sizing:border-box;width:100%;min-height:32px;padding:8px 16px;color:#2e394c;word-wrap:break-word;cursor:pointer;border:none;outline:none}button:focus-visible:not(:disabled){color:#fdfdfd;background:#2a60c8}button:hover:not(:disabled){color:#fdfdfd;background:#2754ac}button:active:not(:disabled){color:#fdfdfd;background:#23478f}button:disabled{color:rgba(46, 57, 76, 0.5);cursor:default}";
export { n as gux_list_item };

import { r, h as o, H as e } from './p-9031eb6a.js';
const t = class {
  constructor(o) {
    r(this, o);
  }
  render() {
    return o(e, { role: 'menu' }, o('slot', null), o('div', { class: 'gux-arrow', 'data-popper-arrow': !0 }));
  }
};
t.style =
  "gux-menu{flex-direction:column;width:fit-content;padding:8px 0;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-menu .gux-arrow,gux-menu .gux-arrow::before{position:absolute;top:-3px;width:10px;height:10px;background:inherit}gux-menu .gux-arrow::before{visibility:visible;content:'';border-top:1px solid #b4bccb;border-left:1px solid #b4bccb;transform:rotate(45deg)}";
export { t as gux_menu };

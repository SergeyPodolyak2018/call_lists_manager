import { r as t, h as o, g as i } from './p-9031eb6a.js';
import { t as s } from './p-6a46bf1b.js';
import { b as n } from './p-54ad2682.js';
import './p-8a133b9b.js';
const e = { dismiss: 'Dismiss' },
  r = class {
    constructor(o) {
      t(this, o), (this.position = 'absolute');
    }
    async componentWillLoad() {
      s(this.root, { variant: this.position }), (this.i18n = await n(this.root, e));
    }
    render() {
      return o(
        'button',
        { class: 'inherit' == this.position ? 'gux-inherit' : void 0, type: 'button', title: this.i18n('dismiss') },
        o('gux-icon', { 'icon-name': 'close', 'screenreader-text': this.i18n('dismiss') }),
      );
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return i(this);
    }
  };
r.style =
  'button{position:absolute;top:0;right:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}button.gux-inherit{position:inherit}button:not(:disabled):focus-visible,button:not(:disabled):hover{color:#2e394c;cursor:pointer}button gux-icon{width:16px;height:16px;margin:4px;border-radius:4px}button:focus{outline:none}button:focus gux-icon{outline:none}button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}';
export { r as gux_dismiss_button };

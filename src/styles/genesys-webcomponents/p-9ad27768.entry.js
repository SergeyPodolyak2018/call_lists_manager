import { r as t, h as o, g as e } from './p-9031eb6a.js';
import { t as r } from './p-6a46bf1b.js';
import { b as n } from './p-54ad2682.js';
import './p-8a133b9b.js';
const a = { clear: 'Clear' },
  i = class {
    constructor(o) {
      t(this, o);
    }
    async componentWillLoad() {
      r(this.root), (this.i18n = await n(this.root, a));
    }
    render() {
      return o(
        'button',
        { tabIndex: -1, type: 'button', title: this.i18n('clear') },
        o('gux-icon', { 'icon-name': 'close', decorative: !0 }),
      );
    }
    static get delegatesFocus() {
      return !0;
    }
    get root() {
      return e(this);
    }
  };
i.style =
  'button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}button:not(:disabled):focus-visible,button:not(:disabled):hover{color:#2e394c;cursor:pointer}button gux-icon{width:12px;height:12px;margin:4px;border-radius:4px}button:focus{outline:none}button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}';
export { i as gux_form_field_input_clear_button };

import { r as e, h as o, g as r } from './p-9031eb6a.js';
import { h as a } from './p-08bc2e6b.js';
import { t as n } from './p-6a46bf1b.js';
const t = class {
  constructor(o) {
    e(this, o);
  }
  componentWillLoad() {
    n(this.root);
  }
  renderOptionalSlot(e) {
    if (a(this.root, e))
      switch (e) {
        case 'header':
          return o('header', { class: 'gux-panel-header' }, o('slot', { name: `${e}` }));
        case 'body':
          return o('div', { class: 'gux-panel-body' }, o('slot', { name: `${e}` }));
        case 'footer':
          return o('footer', { class: 'gux-panel-footer' }, o('slot', { name: `${e}` }));
      }
  }
  render() {
    return o(
      'section',
      { class: 'gux-panel-container' },
      this.renderOptionalSlot('header'),
      this.renderOptionalSlot('body'),
      this.renderOptionalSlot('footer'),
    );
  }
  get root() {
    return r(this);
  }
};
t.style =
  '.gux-panel-container{box-sizing:border-box;display:flex;flex-direction:column;height:100%;padding:8px 15px;color:#2e394c;background-color:#fdfdfd;border:1px solid #e2e6ee}.gux-panel-container .gux-panel-header,.gux-panel-container .gux-panel-body,.gux-panel-container .gux-panel-footer{box-sizing:border-box;width:100%}.gux-panel-container .gux-panel-header{flex-shrink:0;padding:0 8px;border-bottom:1px solid #e2e6ee}.gux-panel-container .gux-panel-body{flex-grow:1;padding:8px;overflow-y:auto}.gux-panel-container .gux-panel-footer{flex-shrink:0;padding:12px 8px;border-top:1px solid #e2e6ee}';
export { t as gux_panel_frame_legacy };

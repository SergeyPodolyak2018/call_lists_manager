import { r as t, c as s, h as i, g as o } from './p-9031eb6a.js';
import { r as e } from './p-cbcbd1bb.js';
import { t as r } from './p-6a46bf1b.js';
import { b as n } from './p-54ad2682.js';
import './p-8a133b9b.js';
const a = { defaultLabel: 'Disclosure button' },
  u = class {
    constructor(i) {
      t(this, i),
        (this.active = s(this, 'active', 7)),
        (this.panelId = e('gux-disclosure-button-panel')),
        (this.position = 'left'),
        (this.label = void 0),
        (this.isOpen = !1),
        (this.icon = 'arrow-solid-right');
    }
    watchIsOpen() {
      this.updateIcon();
    }
    changeState() {
      this.togglePanel(), this.active.emit(this.isOpen);
    }
    togglePanel() {
      this.isOpen = !this.isOpen;
    }
    updateIcon() {
      this.icon =
        'right' === this.position
          ? this.isOpen
            ? 'arrow-solid-right'
            : 'arrow-solid-left'
          : this.isOpen
          ? 'arrow-solid-left'
          : 'arrow-solid-right';
    }
    async componentWillLoad() {
      r(this.root, { variant: this.position }), (this.i18n = await n(this.root, a)), this.updateIcon();
    }
    render() {
      return i(
        'div',
        { class: `gux-disclosure-button-container gux-${this.position}` },
        i(
          'button',
          {
            class: 'gux-disclosure-button',
            onClick: () => this.changeState(),
            'aria-controls': this.panelId,
            'aria-expanded': this.isOpen.toString(),
            'aria-label': this.label || this.i18n('defaultLabel'),
          },
          i('gux-icon', { 'icon-name': `${this.icon}`, decorative: !0 }),
        ),
        i(
          'div',
          { id: this.panelId, class: { 'gux-disclosure-panel': !0, 'gux-active': this.isOpen }, role: 'region' },
          i('slot', { name: 'panel-content' }),
        ),
      );
    }
    get root() {
      return o(this);
    }
    static get watchers() {
      return { isOpen: ['watchIsOpen'] };
    }
  };
u.style =
  ':host{height:100%;color:#2e394c}.gux-disclosure-button-container{display:flex;flex-direction:row;justify-content:flex-start;height:100%}.gux-disclosure-button-container .gux-disclosure-button{width:16px;padding:0;margin:0;color:#2e394c;background:transparent;border-top:none;border-right:1px solid #e2e6ee;border-bottom:none;border-left:1px solid #e2e6ee}.gux-disclosure-button-container .gux-disclosure-button gux-icon{width:12px;height:12px}.gux-disclosure-button-container .gux-disclosure-button:focus{outline:none}.gux-disclosure-button-container .gux-disclosure-panel{display:none;order:-1;width:100%}.gux-disclosure-button-container .gux-disclosure-panel.gux-active{display:block}.gux-disclosure-button-container.gux-right{justify-content:flex-end}.gux-disclosure-button-container.gux-right .gux-disclosure-panel{order:1}';
export { u as gux_disclosure_button };

import { r as t, h as o, g as e } from './p-9031eb6a.js';
import { c as i } from './p-251befef.js';
import { t as s } from './p-6a46bf1b.js';
import { b as r } from './p-54ad2682.js';
import './p-8a133b9b.js';
const a = {
    actionRefresh: 'Refresh',
    actionDelete: 'Delete',
    actionExport: 'Export',
    actionImport: 'Import',
    actionRevert: 'Revert',
    actionAdd: 'Add',
  },
  n = class {
    constructor(o) {
      t(this, o), (this.action = void 0), (this.accent = 'secondary'), (this.iconOnly = !1), (this.disabled = !1);
    }
    returnActionLocale(t) {
      return this.i18n(`action${i(t)}`);
    }
    returnActionTypeIcon(t) {
      return 'revert' == t ? 'reset' : t;
    }
    async componentWillLoad() {
      s(this.root, { variant: this.action }), (this.i18n = await r(this.root, a));
    }
    render() {
      return o(
        'gux-table-toolbar-custom-action',
        { 'icon-only': this.iconOnly, accent: this.accent, disabled: this.disabled },
        o('span', { slot: 'text' }, this.returnActionLocale(this.action)),
        o('gux-icon', { slot: 'icon', 'icon-name': this.returnActionTypeIcon(this.action), decorative: !0 }),
      );
    }
    get root() {
      return e(this);
    }
  };
n.style = ':host([disabled]){pointer-events:none}';
export { n as gux_table_toolbar_action };

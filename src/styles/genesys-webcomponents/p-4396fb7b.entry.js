import { r as t, c as s, h as e, g as o } from './p-9031eb6a.js';
import { b as i } from './p-54ad2682.js';
import { r as l } from './p-cbcbd1bb.js';
import { t as r } from './p-e310debb.js';
import './p-8a133b9b.js';
const a = class {
  constructor(e) {
    t(this, e),
      (this.internalrowselectchange = s(this, 'internalrowselectchange', 7)),
      (this.id = l('gux-row-select')),
      (this.selected = !1),
      (this.disabled = void 0);
  }
  onCheck(t) {
    t.stopPropagation(), (this.selected = t.target.checked), this.internalrowselectchange.emit();
  }
  async componentWillLoad() {
    this.i18n = await i(this.root, r, 'gux-table');
  }
  render() {
    return e(
      'gux-form-field-checkbox',
      null,
      e('input', { slot: 'input', id: this.id, type: 'checkbox', checked: this.selected, disabled: this.disabled }),
      e(
        'label',
        { slot: 'label', htmlFor: this.id },
        '​',
        e('span', { class: 'gux-label-text' }, this.i18n('selectTableRow')),
      ),
    );
  }
  get root() {
    return o(this);
  }
};
a.style =
  'gux-row-select .gux-label-text{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}';
export { a as gux_row_select };

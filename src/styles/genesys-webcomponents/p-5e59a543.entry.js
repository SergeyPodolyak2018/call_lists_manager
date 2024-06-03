import { r as t, c as s, h as e, g as l } from './p-9031eb6a.js';
import { b as o } from './p-54ad2682.js';
import { r as i } from './p-cbcbd1bb.js';
import { t as a } from './p-e310debb.js';
import './p-8a133b9b.js';
const r = class {
  constructor(e) {
    t(this, e),
      (this.internalallrowselectchange = s(this, 'internalallrowselectchange', 7)),
      (this.id = i('gux-all-row-select')),
      (this.selected = !1);
  }
  onCheck(t) {
    t.stopPropagation(), (this.selected = t.target.checked), this.internalallrowselectchange.emit();
  }
  async setIndeterminate(t = !0) {
    this.inputElement.indeterminate = t;
  }
  async componentWillLoad() {
    this.i18n = await o(this.root, a, 'gux-table');
  }
  render() {
    return e(
      'gux-form-field-checkbox',
      null,
      e('input', {
        ref: t => (this.inputElement = t),
        slot: 'input',
        id: this.id,
        type: 'checkbox',
        checked: this.selected,
      }),
      e(
        'label',
        { slot: 'label', htmlFor: this.id },
        '​',
        e('span', { class: 'gux-label-text' }, this.i18n('selectAllTableRows')),
      ),
    );
  }
  get root() {
    return l(this);
  }
};
r.style =
  'gux-all-row-select .gux-label-text{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}';
export { r as gux_all_row_select };

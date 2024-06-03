import { r as e, h as t, g as l } from './p-9031eb6a.js';
import { t as a } from './p-6a46bf1b.js';
let o = 1;
const x = class {
  constructor(t) {
    e(this, t), (this.label = void 0), (this.position = 'above'), (this.id = this.generateId());
  }
  componentWillLoad() {
    a(this.root, { variant: this.position });
  }
  componentDidLoad() {
    const e = this.labeledComponent.querySelector('*');
    'function' == typeof e.componentOnReady && 'function' == typeof e.setLabelledBy
      ? e.componentOnReady().then(() => {
          e.setLabelledBy(this.id);
        })
      : e.setAttribute('aria-labelledby', this.id);
  }
  render() {
    return t(
      'div',
      { class: `gux-text-label-container gux-${this.position}` },
      t('label', { class: 'gux-label', id: this.id }, t('slot', { name: 'label' }, this.label)),
      t('div', { class: 'gux-labeled-component', ref: e => (this.labeledComponent = e) }, t('slot', null)),
    );
  }
  generateId() {
    return 'gux-text-label-' + o++;
  }
  get root() {
    return l(this);
  }
};
x.style =
  'gux-text-label-legacy .gux-label{margin-right:8px}gux-text-label-legacy .gux-text-label-container.gux-beside{display:flex;flex-direction:row;align-items:baseline}gux-text-label-legacy .gux-text-label-container.gux-beside .gux-labeled-component{flex:1 1 auto}.gux-text-label-dark-theme{color:#fdfdfd}.gux-dark-theme gux-text-label-legacy{color:#fdfdfd}gux-text-label-legacy.gux-dark-theme{color:#fdfdfd}.gux-text-label-light-theme{color:#2e394c}.gux-light-theme gux-text-label-legacy{color:#2e394c}gux-text-label-legacy.gux-light-theme{color:#2e394c}gux-text-label-legacy{color:#2e394c}';
export { x as gux_text_label_legacy };

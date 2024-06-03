import { r as t, h as i, H as a, g as s } from './p-9031eb6a.js';
import { s as r } from './p-d176c2ae.js';
import { c as e } from './p-9dd4b14a.js';
import { t as n } from './p-6a46bf1b.js';
import { a as o } from './p-d0805f56.js';
const h = class {
  constructor(i) {
    t(this, i), (this.value = 0), (this.maxValue = 5), (this.disabled = !1), (this.readonly = !1);
  }
  onClick(t) {
    if ((t.stopPropagation(), this.disabled || this.readonly)) return;
    const [i] = t.composedPath(),
      a = i.getRootNode(),
      s = Array.from(this.starContainer.children).findIndex(t => t.shadowRoot === a) + 1;
    s === this.value + 0.5
      ? this.updateRatingValue(s)
      : s === this.value
      ? this.updateRatingValue(0)
      : s !== Math.floor(this.value) && this.updateRatingValue(s - 0.5);
  }
  onKeyDown(t) {
    if ((t.stopPropagation(), !this.disabled && !this.readonly))
      switch (t.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          t.preventDefault(), this.updateRatingValue(this.value - 0.5);
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          t.preventDefault(), this.updateRatingValue(this.value + 0.5);
          break;
        case 'End':
          t.preventDefault(), this.updateRatingValue(1 / 0);
          break;
        case 'Home':
          t.preventDefault(), this.updateRatingValue(-1 / 0);
      }
  }
  updateRatingValue(t) {
    const i = e(t, 0, Array.from(this.starContainer.children).length);
    this.value !== i && ((this.value = i), r(this.root, 'input'), r(this.root, 'change'));
  }
  getRatingStarElements() {
    return [...Array(this.maxValue).keys()]
      .reduce(
        (t, i) =>
          t.concat(i + 0.5 === this.value ? 'rating-partial' : i + 1 <= this.value ? 'rating-active' : 'rating'),
        [],
      )
      .map(t => i('gux-icon', { 'icon-name': t, decorative: !0 }));
  }
  getTabIndex() {
    return this.disabled ? -1 : 0;
  }
  componentWillLoad() {
    n(this.root);
  }
  componentDidLoad() {
    this.root.getAttribute('aria-label') ||
      this.root.getAttribute('aria-labelledby') ||
      o(
        this.root,
        '`gux-rating` requires a label. Either provide a label and associate it with the gux-rating element using `aria-labelledby` or add an `aria-label` attribute to the gux-rating element.',
      );
  }
  render() {
    return i(
      a,
      {
        role: 'spinbutton',
        tabindex: this.getTabIndex(),
        'aria-readonly': this.readonly.toString(),
        'aria-valuenow': this.value,
        'aria-valuemin': '0',
        'aria-valuemax': this.maxValue,
      },
      i(
        'div',
        {
          ref: t => (this.starContainer = t),
          class: { 'gux-rating-star-container': !0, 'gux-disabled': this.disabled },
        },
        this.getRatingStarElements(),
      ),
    );
  }
  get root() {
    return s(this);
  }
};
h.style =
  ':host{display:inline-flex;user-select:none}:host:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(117, 168, 255, 0.5)}.gux-rating-star-container{color:#2e394c}.gux-rating-star-container.gux-disabled{opacity:0.5}.gux-rating-star-container gux-icon{width:24px;height:24px}';
export { h as gux_rating };

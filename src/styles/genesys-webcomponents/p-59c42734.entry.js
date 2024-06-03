import { r as t, d as i, h as e, H as n, g as o } from './p-9031eb6a.js';
import { O as s } from './p-c3f208cd.js';
import { O as r } from './p-f222d4b1.js';
import { t as a } from './p-6a46bf1b.js';
import { g as l } from './p-3e6097e5.js';
function c(t, i) {
  [].concat(t).forEach(t => {
    null != t && (t.accent = i);
  });
}
function h(t, ...i) {
  i.flat()
    .filter(t => null !== t && !t.hasAttribute('icon-only'))
    .forEach(i => (i.iconOnly = t));
}
var u = function (t, i, e, n) {
  var o,
    s = arguments.length,
    r = s < 3 ? i : null === n ? (n = Object.getOwnPropertyDescriptor(i, e)) : n;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, i, e, n);
  else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (r = (s < 3 ? o(r) : s > 3 ? o(i, e, r) : o(i, e)) || r);
  return s > 3 && r && Object.defineProperty(i, e, r), r;
};
const d = class {
  constructor(i) {
    t(this, i),
      (this.minimumSizes = { full: 0, iconOnly: 0, condensed: 0 }),
      (this.displayedLayout = 'full'),
      (this.hasContextDivider = !1);
  }
  onMutation() {
    this.hasContextDivider = this.needsContextDivider();
  }
  recordLayoutMinSize() {
    i(() => {
      var t, i;
      const e = 0 | (null === (t = this.filterSlot) || void 0 === t ? void 0 : t.clientWidth),
        n = 0 | (null === (i = this.actionsContainer) || void 0 === i ? void 0 : i.clientWidth);
      this.minimumSizes[this.displayedLayout] = e + n + 72;
    });
  }
  get actionsContainer() {
    return this.root.shadowRoot.querySelector('.gux-contextual-permanent-primary');
  }
  get filterSlot() {
    return l(this.root, 'search-and-filter');
  }
  get menuActionSlot() {
    return l(this.root, 'menu-actions');
  }
  get permanentSlot() {
    return l(this.root, 'permanent-actions');
  }
  get contextualSlot() {
    return l(this.root, 'contextual-actions');
  }
  get primaryAction() {
    var t;
    return null === (t = this.root) || void 0 === t ? void 0 : t.querySelector('gux-table-toolbar-custom-action[slot]');
  }
  get permanentActions() {
    var t, i;
    if (null === (t = this.permanentSlot) || void 0 === t ? void 0 : t.hasChildNodes)
      return Array.from(
        null === (i = this.permanentSlot) || void 0 === i
          ? void 0
          : i.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'),
      );
  }
  get menuActionsItems() {
    var t, i;
    if (null === (t = this.menuActionSlot) || void 0 === t ? void 0 : t.hasChildNodes)
      return Array.from(
        null === (i = this.menuActionSlot) || void 0 === i
          ? void 0
          : i.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'),
      );
  }
  get contextualActions() {
    var t, i;
    if (null === (t = this.contextualSlot) || void 0 === t ? void 0 : t.hasChildNodes)
      return Array.from(
        null === (i = this.contextualSlot) || void 0 === i
          ? void 0
          : i.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'),
      );
  }
  get filterActions() {
    var t, i;
    if (null === (t = this.filterSlot) || void 0 === t ? void 0 : t.hasChildNodes)
      return Array.from(
        null === (i = this.filterSlot) || void 0 === i
          ? void 0
          : i.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'),
      );
  }
  get allFilterContextual() {
    var t;
    return null === (t = this.filterActions) || void 0 === t ? void 0 : t.concat(this.contextualActions);
  }
  needsContextDivider() {
    var t;
    return (
      (null === (t = this.contextualActions) || void 0 === t ? void 0 : t.length) &&
      this.contextualSlot !== this.root.lastElementChild
    );
  }
  renderMenu() {
    var t;
    return Boolean(
      (null === (t = this.menuActionsItems) || void 0 === t ? void 0 : t.length) || 'condensed' == this.displayedLayout,
    );
  }
  renderFullLayout() {
    (this.displayedLayout = 'full'), h(!1, this.primaryAction, ...this.allFilterContextual, ...this.permanentActions);
  }
  renderIconOnlyLayoutScaleDown(t) {
    (this.displayedLayout = 'iconOnly'),
      h(!0, this.primaryAction, ...this.allFilterContextual, ...this.permanentActions),
      (this.iconOnlySectionWidth = t);
  }
  renderIconOnlyLayoutScaleUp() {
    var t, i;
    (this.displayedLayout = 'iconOnly'),
      c(this.permanentActions, 'secondary'),
      c(this.primaryAction, 'primary'),
      h(!0, this.primaryAction, ...this.allFilterContextual, ...this.permanentActions),
      this.permanentActions && (null === (t = this.root) || void 0 === t || t.appendChild(this.permanentSlot)),
      this.primaryAction && (null === (i = this.root) || void 0 === i || i.appendChild(this.primaryAction));
  }
  renderCondensedLayout() {
    var t, i;
    (this.displayedLayout = 'condensed'),
      this.permanentActions &&
        (null === (t = this.menuActionSlot) || void 0 === t || t.appendChild(this.permanentSlot)),
      this.primaryAction && (null === (i = this.menuActionSlot) || void 0 === i || i.appendChild(this.primaryAction)),
      h(!0, ...this.allFilterContextual),
      h(!1, ...this.permanentActions),
      h(!1, this.primaryAction),
      c(this.menuActionsItems, 'ghost');
  }
  componentWillLoad() {
    a(this.root), (this.hasContextDivider = this.needsContextDivider());
  }
  componentDidLoad() {
    this.recordLayoutMinSize(), this.checkResponsiveLayout(), c(this.menuActionsItems, 'ghost');
  }
  componentDidUpdate() {
    this.recordLayoutMinSize(), this.checkResponsiveLayout();
  }
  checkResponsiveLayout() {
    i(() => {
      var t;
      const i = 0 | (null === (t = this.actionsContainer) || void 0 === t ? void 0 : t.clientWidth),
        e = this.root.clientWidth;
      e <= this.minimumSizes.full && e >= this.minimumSizes.iconOnly
        ? 'full' == this.displayedLayout
          ? this.renderIconOnlyLayoutScaleDown(i)
          : 'condensed' == this.displayedLayout && this.renderIconOnlyLayoutScaleUp()
        : e <= this.minimumSizes.iconOnly
        ? this.renderCondensedLayout()
        : this.minimumSizes.iconOnly > this.minimumSizes.full
        ? this.renderIconOnlyLayoutScaleUp()
        : this.renderFullLayout();
    });
  }
  render() {
    return e(
      n,
      { role: 'toolbar', 'aria-orientation': 'horizontal' },
      e('div', { class: 'search-filter-container' }, e('slot', { name: 'search-and-filter' })),
      e('div', { class: 'section-spacing' }),
      e(
        'div',
        { class: 'gux-contextual-permanent-primary' },
        e(
          'div',
          { class: { 'gux-contextual-wrapper': this.hasContextDivider } },
          e('slot', { name: 'contextual-actions' }),
        ),
        e(
          'div',
          { class: 'gux-permanent-menu-primary-wrapper' },
          e('slot', { name: 'permanent-actions' }),
          e('gux-table-toolbar-menu-button', { 'show-menu': this.renderMenu() }, e('slot', { name: 'menu-actions' })),
          e('slot', { name: 'primary-action' }),
        ),
      ),
    );
  }
  get root() {
    return o(this);
  }
};
u([r({ childList: !0, subtree: !0 })], d.prototype, 'onMutation', null),
  u([s()], d.prototype, 'checkResponsiveLayout', null),
  (d.style =
    ":host{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;max-height:48px;padding:0 8px 16px 8px;background-color:#fdfdfd;border-radius:4px}:host .search-filter-container{width:260px;min-width:260px}:host slot[name='search-and-filter']::slotted(*){display:flex;flex-direction:row;gap:4px;align-content:flex-start;align-items:center}:host .section-spacing{display:flex;flex-direction:row;min-width:72px}:host .gux-contextual-permanent-primary{display:flex;flex-direction:row;justify-content:space-between}:host .gux-contextual-permanent-primary slot[name='permanent-actions']::slotted(*),:host .gux-contextual-permanent-primary slot[name='contextual-actions']::slotted(*){display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;align-content:flex-end;align-items:center}:host .gux-contextual-permanent-primary .gux-contextual-wrapper{padding-right:8px;border-right:1px solid #d7dce5}:host .gux-contextual-permanent-primary .gux-permanent-menu-primary-wrapper{display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;margin-left:8px}");
export { d as gux_table_toolbar_beta };

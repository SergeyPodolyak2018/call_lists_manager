import { r as t, c as o, w as i, h as a, g as n } from './p-9031eb6a.js';
import { e as s } from './p-29e8b184.js';
import { r as d } from './p-cbcbd1bb.js';
import { a as e } from './p-091f51f6.js';
import { b as u } from './p-54ad2682.js';
import { t as b } from './p-2c3d934a.js';
import './p-8a133b9b.js';
const g = class {
  constructor(i) {
    t(this, i),
      (this.internalactivatetabpanel = o(this, 'internalactivatetabpanel', 7)),
      (this.dropdownOptionsButtonId = d()),
      (this.tabTitle = ''),
      (this.focusinFromClick = !1),
      (this.tabId = void 0),
      (this.active = !1),
      (this.guxDisabled = !1),
      (this.popoverHidden = !0),
      (this.hasAnimated = !1);
  }
  onFocusin(t) {
    !this.focusinFromClick &&
      t.target.classList.contains('gux-tab-button') &&
      this.tooltipTitleElement.setShowTooltip();
  }
  onFocusout(t) {
    this.root.querySelector('.gux-tab').contains(t.relatedTarget) || (this.popoverHidden = !0),
      t.target.classList.contains('gux-tab-button') && this.tooltipTitleElement.setHideTooltip(),
      (this.focusinFromClick = !1);
  }
  onKeydown(t) {
    switch (t.key) {
      case 'ArrowDown':
      case 'Enter':
        s('.gux-tab-options-button', t) &&
          (t.preventDefault(), (this.popoverHidden = !1), this.focusFirstItemInPopupList());
        break;
      case 'Escape':
        s('gux-list[slot="dropdown-options"]', t) &&
          (t.stopPropagation(),
          (this.popoverHidden = !0),
          e(() => {
            var t;
            null === (t = this.tabOptionsButtonElement) || void 0 === t || t.focus();
          }));
    }
  }
  onKeyup(t) {
    ' ' === t.key && s('.gux-tab-options-button', t) && this.focusFirstItemInPopupList();
  }
  onClick(t) {
    s('.gux-tab-options-button', t) ||
      this.active ||
      this.guxDisabled ||
      this.internalactivatetabpanel.emit(this.tabId);
  }
  onMouseDown() {
    this.focusinFromClick = !0;
  }
  async guxSetActive(t) {
    this.active = t;
  }
  async guxGetActive() {
    return this.active;
  }
  async guxFocus() {
    this.buttonElement.focus();
  }
  get hasDropdownOptions() {
    return Boolean(this.root.querySelector('gux-list[slot="dropdown-options"]'));
  }
  focusFirstItemInPopupList() {
    const t = this.root.querySelector('gux-list[slot="dropdown-options"]');
    e(() => {
      null == t || t.guxFocusFirstItem();
    });
  }
  toggleOptions() {
    this.popoverHidden = !this.popoverHidden;
  }
  onSelectDropdownOption(t) {
    (this.popoverHidden = !0),
      t.stopPropagation(),
      e(() => {
        this.tabOptionsButtonElement.focus();
      });
  }
  async componentWillLoad() {
    this.i18n = await u(this.root, b, 'gux-tabs-advanced');
  }
  componentDidLoad() {
    (this.tabTitle = this.root.querySelector('gux-tooltip-title').textContent.trim()),
      this.hasAnimated ||
        i(() => {
          this.root.querySelector('.gux-tab').classList.add('gux-show'), (this.hasAnimated = !0);
        });
  }
  popoverOnClick(t) {
    t.stopPropagation();
  }
  getDropdownOptions() {
    return this.hasDropdownOptions
      ? [
          a(
            'button',
            {
              id: this.dropdownOptionsButtonId,
              'aria-expanded': (!this.popoverHidden).toString(),
              type: 'button',
              class: 'gux-tab-options-button',
              ref: t => (this.tabOptionsButtonElement = t),
              onClick: () => this.toggleOptions(),
              tabIndex: this.active ? 0 : -1,
              disabled: this.guxDisabled,
            },
            a('gux-icon', {
              'icon-name': 'menu-kebab-vertical',
              'screenreader-text': this.i18n('options', { tabTitle: this.tabTitle }),
            }),
          ),
          a(
            'gux-popover-list',
            {
              position: 'top-end',
              for: this.dropdownOptionsButtonId,
              displayDismissButton: !1,
              hidden: this.popoverHidden,
              closeOnClickOutside: !0,
              onGuxdismiss: () => (this.popoverHidden = !0),
              onClick: t => this.popoverOnClick(t),
              onFocusout: t => t.stopImmediatePropagation(),
            },
            a(
              'div',
              { class: 'gux-dropdown-option-container', onClick: t => this.onSelectDropdownOption(t) },
              a('slot', { name: 'dropdown-options' }),
            ),
          ),
        ]
      : null;
  }
  render() {
    return [
      a(
        'div',
        {
          class: {
            'gux-tab': !0,
            'gux-selected': this.active,
            'gux-dropdown-options': this.hasDropdownOptions,
            'gux-disabled': this.guxDisabled,
          },
        },
        a(
          'button',
          {
            class: 'gux-tab-button',
            type: 'button',
            role: 'tab',
            'aria-selected': this.active.toString(),
            'aria-disabled': this.guxDisabled.toString(),
            'aria-controls': `gux-${this.tabId}-panel`,
            ref: t => (this.buttonElement = t),
            tabIndex: this.active ? 0 : -1,
            id: `gux-${this.tabId}-tab`,
          },
          a('gux-tooltip-title', { ref: t => (this.tooltipTitleElement = t) }, a('span', null, a('slot', null))),
        ),
        this.getDropdownOptions(),
      ),
    ];
  }
  get root() {
    return n(this);
  }
};
g.style =
  '.gux-tab-sorting :focus-within{margin-bottom:4px}gux-tab-advanced:not(:last-child) .gux-tab:not(.gux-dropdown-options) .gux-tab-button{border-right:1px solid #d7dce5}gux-tab-advanced:not(:last-child) .gux-dropdown-options .gux-tab-options-button{border-right:1px solid #d7dce5}gux-tab-advanced .gux-tab{display:flex;align-items:center;width:126px;height:50px;padding-bottom:2px;overflow:hidden;border-radius:4px 4px 0 0;transition:width 0.4s ease-out}gux-tab-advanced .gux-tab .gux-tab-button{display:flex;align-items:center;width:100%;width:125px;height:50px;padding-right:0;padding-left:16px;color:#000000;background-color:#f6f7f9;border:none}gux-tab-advanced .gux-tab .gux-tab-button:focus-visible{height:90%;border:3px solid #aac9ff;border-radius:5px;outline:none}gux-tab-advanced .gux-tab.gux-show{width:160px}gux-tab-advanced .gux-tab.gux-show.gux-disabled .gux-tab-button{color:rgba(0, 0, 0, 0.5)}gux-tab-advanced .gux-tab.gux-show.gux-disabled .gux-tab-options-button{color:rgba(46, 57, 76, 0.5);pointer-events:none;cursor:default}gux-tab-advanced .gux-tab .gux-tab-options-button{z-index:1;align-items:center;justify-content:center;width:35px;height:30px;padding:0;cursor:pointer;background-color:#f6f7f9;border:none}gux-tab-advanced .gux-tab .gux-tab-options-button:focus-visible{outline:none}gux-tab-advanced .gux-tab .gux-tab-options-button:focus-visible gux-icon{padding-right:0;padding-left:0;border:3px solid #aac9ff;border-radius:5px}gux-tab-advanced .gux-tab .gux-tab-options-button gux-icon{width:16px;height:16px;padding-right:16px;padding-left:8px;transition:color 0.25s}gux-tab-advanced .gux-tab:not(.gux-dropdown-options) .gux-tab-button{width:160px;height:30px;padding-right:16px}gux-tab-advanced .gux-tab:not(.gux-dropdown-options) .gux-tab-button:focus-visible{height:90%;border:3px solid #aac9ff;border-radius:5px;outline:none}gux-tab-advanced .gux-tab .tab-icon-container{display:flex;flex:0 0 16px;align-items:center;justify-content:center;height:14px;margin-right:8px}gux-tab-advanced .gux-tab .tab-icon-container gux-icon{width:100%}gux-tab-advanced .gux-tab.gux-selected{padding-bottom:0;background-color:#fdfdfd;border-bottom:2px solid #2a60c8}gux-tab-advanced .gux-tab.gux-selected .gux-tab-button{background-color:#fdfdfd}gux-tab-advanced .gux-tab.gux-selected .gux-tab-options-button{background-color:#fdfdfd}gux-tab-advanced .gux-tab:hover:not(.gux-selected):not(.gux-disabled){padding-bottom:0;border-bottom:2px solid #8a97ad}gux-tab-advanced .gux-tab gux-tooltip-title{font-size:14px;white-space:nowrap}';
export { g as gux_tab_advanced };

import { r as o, h as i, g as t } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
import { b as c } from './p-54ad2682.js';
import './p-8a133b9b.js';
const p = {
    clickToCopy: 'Click to Copy',
    enterToCopy: 'Press Enter to Copy',
    copySuccess: 'Copied to Clipboard',
    copyFailure: 'Error. Please Try Again.',
  },
  r = class {
    constructor(i) {
      o(this, i), (this.tooltipContent = 'clickToCopy');
    }
    onMouseleave() {
      this.resetTooltip();
    }
    onFocusout() {
      this.resetTooltip();
    }
    onFocus() {
      this.copyButton.matches(':focus-visible') && (this.tooltipContent = 'enterToCopy');
    }
    resetTooltip() {
      this.tooltipContent = 'clickToCopy';
    }
    onCopyToClipboard() {
      navigator.clipboard
        .writeText(this.root.innerText)
        .then(() => {
          this.tooltipContent = 'copySuccess';
        })
        .catch(() => {
          this.tooltipContent = 'copyFailure';
        });
    }
    getIconName(o) {
      switch (o) {
        case 'copyFailure':
          return 'badge-x';
        case 'copySuccess':
          return 'badge-check';
      }
    }
    renderTooltipIcon() {
      const o = this.getIconName(this.tooltipContent);
      if (o) return i('gux-icon', { 'icon-name': o, decorative: !0 });
    }
    renderTooltip() {
      return i(
        'gux-tooltip',
        { placement: 'bottom-end' },
        i(
          'div',
          { class: 'gux-tooltip-content' },
          this.renderTooltipIcon(),
          i('span', null, this.i18n(this.tooltipContent)),
        ),
      );
    }
    async componentWillLoad() {
      e(this.root), (this.i18n = await c(this.root, p));
    }
    render() {
      return i(
        'button',
        {
          class: 'gux-copy-to-clipboard-wrapper',
          ref: o => (this.copyButton = o),
          onClick: this.onCopyToClipboard.bind(this),
        },
        i(
          'div',
          { class: 'gux-copy-content' },
          i('slot', { name: 'content' }),
          i('gux-icon', { 'icon-name': 'copy', decorative: !0 }),
        ),
        this.renderTooltip(),
      );
    }
    get root() {
      return t(this);
    }
  };
r.style =
  "button{all:unset}.gux-copy-to-clipboard-wrapper{display:inline-flex;align-items:center}.gux-copy-to-clipboard-wrapper .gux-copy-content{display:inherit;align-items:inherit;cursor:pointer}.gux-copy-to-clipboard-wrapper .gux-copy-content ::slotted(*){padding:0 2px;margin-right:4px}.gux-copy-to-clipboard-wrapper .gux-copy-content:hover ::slotted(*){background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper .gux-copy-content:hover gux-icon[icon-name='copy']{visibility:visible}.gux-copy-to-clipboard-wrapper .gux-copy-content gux-icon[icon-name='copy']{width:16px;height:16px;padding:2px;visibility:hidden;background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper:focus-visible{outline:none}.gux-copy-to-clipboard-wrapper:focus-visible ::slotted(*){background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper:focus-visible gux-icon[icon-name='copy']{visibility:visible}.gux-copy-to-clipboard-wrapper gux-tooltip{display:inline-flex;align-items:center}.gux-copy-to-clipboard-wrapper gux-tooltip .gux-tooltip-content>*{vertical-align:middle}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon{width:16px;height:16px;padding-right:8px}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon[icon-name='badge-check']{color:#3c8527}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon[icon-name='badge-x']{color:#ea0b0b}.focus-and-hover-copy-content ::slotted(*){background-color:#deeaff;border-radius:4px}.focus-and-hover-copy-content gux-icon[icon-name='copy']{visibility:visible}";
export { r as gux_copy_to_clipboard_beta };

import { r as o, h as e, g as n } from './p-9031eb6a.js';
import { t } from './p-6a46bf1b.js';
function c(o, e, n) {
  const t = (function (o, e) {
    return e.find(e => e.slotName === o);
  })(o, n);
  null == t || t.ref.classList[e]('gux-opened');
}
const r = class {
  constructor(e) {
    o(this, e), (this.sections = []), (this.headingLevel = null), (this.arrowPosition = 'default');
  }
  async open(o) {
    c(o, 'add', this.sections);
  }
  async close(o) {
    c(o, 'remove', this.sections);
  }
  async toggle(o) {
    c(o, 'toggle', this.sections);
  }
  componentWillLoad() {
    t(this.root),
      (this.sections = (function (o) {
        const e = Array.from(o.children),
          n = [];
        return (
          e.forEach(o => {
            const e = o.getAttribute('slot');
            (o.hidden = !Boolean(e)), e && n.push({ slotName: e, ref: null });
          }),
          n
        );
      })(this.root));
  }
  render() {
    return e(
      'div',
      { class: 'gux-accordion' },
      this.sections.map(o =>
        e(
          'section',
          {
            class: 'gux-section',
            onKeyDown: e =>
              (function (o, e, n) {
                let t;
                switch (o.key) {
                  case 'ArrowUp':
                    t = (function (o, e) {
                      const n = e.findIndex(e => e.slotName === o);
                      return n <= 0 ? e[e.length - 1].ref : e[n - 1].ref;
                    })(e, n);
                    break;
                  case 'ArrowDown':
                    t = (function (o, e) {
                      const n = e.findIndex(e => e.slotName === o);
                      return n >= e.length - 1 ? e[0].ref : e[n + 1].ref;
                    })(e, n);
                    break;
                  case 'End':
                    t = (function (o) {
                      return o[this.sections.length - 1].ref;
                    })(n);
                    break;
                  case 'Home':
                    t = (function (o) {
                      return o[0].ref;
                    })(n);
                }
                var c;
                t && ((c = t), c.querySelector('.gux-header-button')).focus();
              })(e, o.slotName, this.sections),
            ref: e => (o.ref = e),
          },
          e(
            'div',
            { 'aria-role': 'heading', 'aria-level': this.headingLevel, class: 'gux-header' },
            e(
              'button',
              { class: 'gux-header-button', type: 'button', onClick: () => this.toggle(o.slotName) },
              e('div', { class: 'gux-text' }, o.slotName),
              'beside-text' === this.arrowPosition ? null : e('div', { class: 'gux-spacer' }),
              e(
                'div',
                { class: 'gux-toggle-arrow' },
                e('gux-icon', { decorative: !0, 'icon-name': 'chevron-small-down' }),
              ),
            ),
          ),
          e('div', { class: 'gux-content' }, e('slot', { name: o.slotName })),
        ),
      ),
    );
  }
  get root() {
    return n(this);
  }
};
r.style =
  'gux-accordion-legacy .gux-accordion{padding:0;margin:0;background-color:#fdfdfd}gux-accordion-legacy .gux-accordion .gux-section{color:#2e394c}gux-accordion-legacy .gux-accordion .gux-section .gux-header{box-sizing:border-box;height:40px;border-top:1px solid #e2e6ee}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:center;align-items:center;justify-content:flex-start;width:100%;height:100%;padding:0 16px;margin:0;color:#2e394c;cursor:pointer;background:none;border:none}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-text{flex:0 1 auto;align-self:auto;font-family:inherit;font-size:inherit;font-weight:bold;text-align:left}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-spacer{flex:1 1 auto;align-self:auto}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-toggle-arrow{flex:0 1 auto;align-items:center;align-self:auto;color:#6b7585;transition:transform 0.5s ease;transform-origin:center}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-toggle-arrow gux-icon{width:20px;height:20px}gux-accordion-legacy .gux-accordion .gux-section .gux-header:hover .gux-toggle-arrow{color:#2e394c}gux-accordion-legacy .gux-accordion .gux-section .gux-content{box-sizing:border-box;display:none;padding:16px}gux-accordion-legacy .gux-accordion .gux-section.gux-opened .gux-header{border-bottom:1px solid #e2e6ee}gux-accordion-legacy .gux-accordion .gux-section.gux-opened .gux-header .gux-toggle-arrow{transform:rotate(-180deg)}gux-accordion-legacy .gux-accordion .gux-section.gux-opened .gux-content{display:block}gux-accordion-legacy .gux-accordion .gux-section:last-of-type .gux-header{border-bottom:1px solid #e2e6ee}gux-accordion-legacy .gux-accordion .gux-section:last-of-type .gux-content{border-bottom:1px solid #e2e6ee}';
export { r as gux_accordion_legacy };

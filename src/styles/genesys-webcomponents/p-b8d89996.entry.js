import { h as e, r, g as s } from './p-9031eb6a.js';
import { t } from './p-6a46bf1b.js';
import { a } from './p-d0805f56.js';
import { r as o } from './p-cbcbd1bb.js';
import { c as i } from './p-9dd4b14a.js';
const n = 23.5,
  c = 2 * Math.PI * n;
function l(e, r) {
  return !(isNaN(e) || isNaN(r) || e > r || e < 0 || 0 === r);
}
const d = ({ value: r, max: s, scale: t, dropshadowId: a, screenreaderText: o }) =>
    e(
      'div',
      { role: 'progressbar', 'aria-valuenow': r, 'aria-valuemin': '0', 'aria-valuemax': s, 'aria-label': o },
      e(
        'svg',
        { class: 'gux-svg-container', width: '60px', height: '60px', viewBox: '0 0 60 60', role: 'presentation' },
        e(
          'filter',
          { id: a },
          e('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: '1.4' }),
          e('feOffset', { dx: '0', dy: '0', result: 'offsetblur' }),
          e('feMerge', null, e('feMergeNode', null), e('feMergeNode', { in: 'SourceGraphic' })),
        ),
        e('circle', { cx: '50%', cy: '50%', r: n, class: 'gux-static-circle' }),
        e('circle', {
          cx: '50%',
          cy: '50%',
          r: n,
          class: 'gux-dynamic-circle-shadow',
          'stroke-dashoffset': c * (1 - r / s),
          'stroke-dasharray': c,
          'stroke-linecap': 'round',
          filter: 'url(#' + a + ')',
        }),
        e('circle', {
          cx: '50%',
          cy: '50%',
          r: n,
          class: 'gux-dynamic-circle',
          'stroke-dashoffset': c * (1 - r / s),
          'stroke-dasharray': c,
          'stroke-linecap': 'round',
        }),
        e(
          'text',
          {
            x: '50%',
            y: '50%',
            'dominant-baseline': 'central',
            class: { 'gux-percentage': !0, 'gux-small': ![0, 1].includes(t) },
          },
          (function (e, r, s) {
            const t = Math.pow(10, i(s, 0, 2));
            return Math.round(((e + Number.EPSILON) / r) * 100 * t) / t + '%';
          })(r, s, t),
        ),
      ),
    ),
  g = ({ screenreaderText: r }) => e('gux-radial-loading', { 'screenreader-text': r, context: 'modal' }),
  h = class {
    constructor(e) {
      r(this, e),
        (this.dropshadowId = o('gux-dropshadow')),
        (this.value = void 0),
        (this.max = 100),
        (this.scale = 0),
        (this.screenreaderText = '');
    }
    componentWillLoad() {
      t(this.root);
    }
    componentDidLoad() {
      !this.screenreaderText &&
        l(this.value, this.max) &&
        a(
          this.root,
          'No screenreader-text provided. Provide a localized screenreader-text property for the component.',
        );
    }
    render() {
      return l(this.value, this.max)
        ? e(d, {
            value: this.value,
            max: this.max,
            scale: this.scale,
            dropshadowId: this.dropshadowId,
            screenreaderText: this.screenreaderText,
          })
        : e(g, { screenreaderText: this.screenreaderText });
    }
    get root() {
      return s(this);
    }
  };
h.style =
  ":host{display:inline-block}div[role='progressbar'] .gux-svg-container{display:block}div[role='progressbar'] .gux-svg-container .gux-dynamic-circle{fill:none;stroke:#2a60c8;stroke-width:5;transform:rotate(-90deg);transform-origin:50% 50%}div[role='progressbar'] .gux-svg-container .gux-dynamic-circle-shadow{fill:none;stroke:#75a8ff;stroke-width:5;transform:rotate(-90deg);transform-origin:50% 50%}div[role='progressbar'] .gux-svg-container .gux-static-circle{fill:none;stroke:#deeaff;stroke-width:4}div[role='progressbar'] .gux-svg-container .gux-percentage{font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;text-anchor:middle;fill:#2e394c}div[role='progressbar'] .gux-svg-container .gux-percentage.gux-small{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}";
export { h as gux_radial_progress };

import { h as e } from './p-9031eb6a.js';
import { r as i } from './p-cbcbd1bb.js';
import { l as o } from './p-d0805f56.js';
import { s as r } from './p-8fe7daff.js';
import { h as a } from './p-08bc2e6b.js';
const t = ({ show: i }, o) =>
    e('div', { class: { 'gux-form-field-help': !0, 'gux-show': i } }, e('div', { class: 'gux-message' }, o)),
  s = ({ show: i }, o) =>
    e(
      'div',
      { class: { 'gux-form-field-error': !0, 'gux-show': i } },
      e('gux-icon', { 'icon-name': 'alert-warning-octogon', decorative: !0 }),
      e('div', { class: 'gux-message' }, o),
    );
function l(e) {
  r(e, '', !0);
}
function d(e) {
  return Boolean(null == e ? void 0 : e.value);
}
function n(e, i) {
  if (e)
    return ['above', 'beside', 'screenreader'].includes(i)
      ? i
      : e.offsetWidth > 1 && e.offsetWidth < 40
      ? 'beside'
      : 'above';
}
function f(e, r) {
  var t, s, l, d;
  if (
    (function (e) {
      return Boolean(e.querySelector('label[slot="label"]'));
    })(e)
  ) {
    const a = e.querySelector('label[slot="label"]'),
      t = Boolean(r.hasAttribute('id')),
      s = Boolean(a.hasAttribute('for'));
    if (!t && s)
      o(
        e,
        'A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.',
      );
    else if (t)
      if (t && !s) {
        const e = r.getAttribute('id');
        a.setAttribute('for', e);
      } else
        t &&
          s &&
          r.getAttribute('id') !== a.getAttribute('for') &&
          o(e, 'The input id and label for attribute should match.');
    else {
      const e = i('gux-form-field-input');
      r.setAttribute('id', e), a.setAttribute('for', e);
    }
  } else
    o(
      e,
      'A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.',
    );
  if (a(e, 'error')) {
    const o = e.querySelector('[slot="error"]'),
      a = i('gux-form-field-error'),
      s =
        (null === (t = r.getAttribute('aria-describedby')) || void 0 === t
          ? void 0
          : t.split(' ').filter(e => !e.startsWith('gux-form-field-error'))) || [];
    o.setAttribute('id', a), s.push(a), s && r.setAttribute('aria-describedby', s.join(' '));
  } else if (r.getAttribute('aria-describedby')) {
    const e =
      (null === (s = r.getAttribute('aria-describedby')) || void 0 === s
        ? void 0
        : s.split(' ').filter(e => !e.startsWith('gux-form-field-error'))) || [];
    r.setAttribute('aria-describedby', e.join(' '));
  }
  if (a(e, 'help')) {
    const o = e.querySelector('[slot="help"]'),
      a = i('gux-form-field-help'),
      t =
        (null === (l = r.getAttribute('aria-describedby')) || void 0 === l
          ? void 0
          : l.split(' ').filter(e => !e.startsWith('gux-form-field-help'))) || [];
    o.setAttribute('id', a), t.push(a), t && r.setAttribute('aria-describedby', t.join(' '));
  } else if (r.getAttribute('aria-describedby')) {
    const e =
      (null === (d = r.getAttribute('aria-describedby')) || void 0 === d
        ? void 0
        : d.split(' ').filter(e => !e.startsWith('gux-form-field-help'))) || [];
    r.setAttribute('aria-describedby', e.join(' '));
  }
}
function u(e, o, r, t) {
  var s;
  if (a(e, t)) {
    const a = e.querySelector(`[slot=${t}]`),
      l = i(`gux-${t}`),
      d =
        (null === (s = r.getAttribute(o)) || void 0 === s
          ? void 0
          : s.split(' ').filter(e => !e.startsWith(`gux-${t}`))) || [];
    a.setAttribute('id', l), null == d || d.push(l), d && r.setAttribute(o, d.join(' '));
  }
}
function b(e, i, o) {
  u(e, 'aria-labelledby', i, o);
}
function c(e, i, o) {
  u(e, 'aria-describedby', i, o);
}
function h(e, i) {
  const r = e.querySelector(i);
  return r || o(e, `This component requires an input element that matches the following selector: ${i}`), r;
}
export { s as G, t as a, n as b, c, l as d, h as g, d as h, b as s, f as v };

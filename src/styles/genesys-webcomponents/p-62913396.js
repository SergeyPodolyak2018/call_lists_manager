import { c as n } from './p-9dd4b14a.js';
import { s as t } from './p-d176c2ae.js';
function r(n, { oldIndex: t, newIndex: r }) {
  const o = Array.from(n.children).map(n => n.orderId),
    [e] = o.splice(t, 1);
  return o.splice(r, 0, e), o;
}
function o(n, { oldIndex: t, newIndex: r }) {
  l(n).forEach((n, o) => {
    o !== r
      ? n.removeAttribute('gs-reorder-indicator')
      : n.setAttribute('gs-reorder-indicator', r < t ? 'above' : 'below');
  });
}
function e(t, r, o) {
  const e = n(r.newIndex + o, 0, Array.from(t.children).length - 1);
  return Object.assign({}, r, { newIndex: e });
}
function c() {
  return { oldIndex: null, newIndex: null };
}
function u(n) {
  return Array.from(n.parentNode.children).indexOf(n);
}
function a(n, r) {
  f(n).forEach(n => {
    n.checked !== r && ((n.checked = r), t(n, 'input'), t(n, 'change'));
  });
}
function s(n, t) {
  const { count: r, total: o } = i(n);
  0 === r
    ? ((t.indeterminate = !1), (t.checked = !1))
    : r === o
    ? ((t.indeterminate = !1), (t.checked = !0))
    : (t.indeterminate = !0);
}
function i(n) {
  const t = f(n).length,
    r = (function (n) {
      return f(n).filter(n => n.checked);
    })(n).length;
  return { count: r, total: t };
}
function d(n, t, r = 1) {
  return l(n).reduce(
    (n, o) => {
      const e = t.value.toLowerCase();
      if (e && o.textContent.toLowerCase().includes(e)) {
        const e = n.matchCount + 1;
        return o.guxSetHighlight(t.value, e === r), { matchCount: e, currentMatch: r };
      }
      return o.guxSetHighlight(), n;
    },
    { matchCount: 0, currentMatch: 0 },
  );
}
function f(n) {
  return Array.from(n.querySelectorAll('input[type=checkbox]'));
}
function l(n) {
  return Array.from(n.querySelectorAll('gux-column-manager-item'));
}
export { s as a, r as b, u as c, e as d, d as e, a as f, c as g, i as h, o as s };

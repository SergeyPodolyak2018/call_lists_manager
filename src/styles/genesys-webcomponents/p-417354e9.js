function n(n, t) {
  return (function (n) {
    const t = n.querySelector('slot');
    return t ? t.assignedElements() : Array.from(n.children);
  })(n).filter(n => !!t.includes(n.tagName.toLowerCase()) && !n.disabled);
}
function t(o, c, u) {
  const f = n(o, c).findIndex(n => n.id.startsWith(u));
  return f >= 0 ? f : t(o, c, u.slice(0, -1));
}
function o(t, o, u) {
  const f = (function (t, o) {
    return n(t, o).findIndex(n => n.matches(':focus-within'));
  })(t, o);
  c(t, o, (f + u) % n(t, o).length);
}
function c(t, o, c) {
  var u;
  const f = n(t, o);
  for (; c < 0; ) c += f.length;
  null === (u = f[c]) || void 0 === u || u.focus();
}
function u(n, t) {
  c(n, t, 0);
}
function f(t, o) {
  c(
    t,
    o,
    (function (t, o) {
      return n(t, o).length - 1;
    })(t, o),
  );
}
function i(n, t) {
  o(n, t, 1);
}
function r(n, t) {
  o(n, t, -1);
}
function s(t, o, u) {
  const f = (function (t, o, c) {
    return n(t, o).findIndex(n => n.id === c);
  })(t, o, u);
  c(t, o, f >= 0 ? f : 0);
}
function a(n, o, u) {
  const f = t(n, o, u);
  c(n, o, f >= 0 ? f : 0);
}
export { o as a, s as b, a as c, u as f, f as l, i as n, r as p };

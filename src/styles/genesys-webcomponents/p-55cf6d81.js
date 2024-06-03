function n(n) {
  return Array.from(n.children).filter(n => n.value || '' === n.value);
}
function t(t) {
  return n(t).find(n => n.active);
}
function r(t, r) {
  r &&
    (n(t).forEach(n => {
      const o = !((n.disabled && n.filtered) || n !== r);
      (n.active = o), o && t.setAttribute('aria-activedescendant', n.id);
    }),
    r.scrollIntoView({ block: 'nearest' }));
}
function o(t) {
  let r = n(t)[0];
  for (; r && (r.disabled || r.filtered); ) r = r.nextElementSibling;
  return r;
}
function u(n) {
  return Boolean(t(n));
}
function e(t, r) {
  return n(t).find(n => (!n.disabled || !n.filtered) && h(n, r));
}
function f(t) {
  n(t).forEach(n => {
    n.active = !1;
  });
}
function i(t) {
  r(
    t,
    (function (t) {
      return n(t).find(n => n.hovered && !n.disabled && !n.filtered);
    })(t) ||
      (function (t) {
        return n(t).find(n => n.selected && !n.disabled && !n.filtered);
      })(t) ||
      o(t),
  );
}
function c(n) {
  if (u(n)) {
    let r = t(n).previousElementSibling;
    for (; r && (r.disabled || r.filtered); ) r = r.previousElementSibling;
    return Boolean(r);
  }
  return !1;
}
function a(n) {
  if (u(n)) {
    let r = t(n).nextElementSibling;
    for (; r && (r.disabled || r.filtered); ) r = r.nextElementSibling;
    return Boolean(r);
  }
  return !1;
}
function s(n) {
  r(n, o(n));
}
function l(n) {
  r(
    n,
    (function (n) {
      if (u(n)) {
        let r = t(n).nextElementSibling;
        for (; r && (r.disabled || r.filtered); ) r = r.nextElementSibling;
        return r;
      }
      return o(n);
    })(n),
  );
}
function d(n) {
  r(
    n,
    (function (n) {
      if (u(n)) {
        let r = t(n).previousElementSibling;
        for (; r && (r.disabled || r.filtered); ) r = r.previousElementSibling;
        return r;
      }
      return o(n);
    })(n),
  );
}
function m(t) {
  r(
    t,
    (function (t) {
      const r = n(t);
      let o = r[r.length - 1];
      for (; o && (o.disabled || o.filtered); ) o = o.previousElementSibling;
      return o;
    })(t),
  );
}
function B(n, r) {
  u(n) && r(t(n).value);
}
function b(n, t) {
  t(n.value);
}
let k,
  T = '';
function g(n, t) {
  clearTimeout(k),
    (T += t),
    (function (n) {
      const t = e(n, T);
      t && r(n, t);
    })(n),
    (k = setTimeout(() => {
      T = '';
    }, 1e3));
}
function h(n, t) {
  return n.textContent.trim().toLowerCase().startsWith(t.toLowerCase());
}
export { m as a, s as b, f as c, d, a as e, l as f, e as g, c as h, B as i, g as j, n as k, h as m, b as o, i as s };

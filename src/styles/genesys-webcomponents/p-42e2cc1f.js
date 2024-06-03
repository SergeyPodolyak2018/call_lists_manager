function t(t) {
  return t.split('-')[1];
}
function n(t) {
  return 'y' === t ? 'height' : 'width';
}
function e(t) {
  return t.split('-')[0];
}
function o(t) {
  return ['top', 'bottom'].includes(e(t)) ? 'x' : 'y';
}
function r(r, i, a) {
  let { reference: c, floating: s } = r;
  const l = c.x + c.width / 2 - s.width / 2,
    u = c.y + c.height / 2 - s.height / 2,
    f = o(i),
    d = n(f),
    m = c[d] / 2 - s[d] / 2,
    y = 'x' === f;
  let p;
  switch (e(i)) {
    case 'top':
      p = { x: l, y: c.y - s.height };
      break;
    case 'bottom':
      p = { x: l, y: c.y + c.height };
      break;
    case 'right':
      p = { x: c.x + c.width, y: u };
      break;
    case 'left':
      p = { x: c.x - s.width, y: u };
      break;
    default:
      p = { x: c.x, y: c.y };
  }
  switch (t(i)) {
    case 'start':
      p[f] -= m * (a && y ? -1 : 1);
      break;
    case 'end':
      p[f] += m * (a && y ? -1 : 1);
  }
  return p;
}
function i(t, n) {
  return 'function' == typeof t ? t(n) : t;
}
function a(t) {
  return 'number' != typeof t
    ? (function (t) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...t };
      })(t)
    : { top: t, right: t, bottom: t, left: t };
}
function c(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height };
}
async function s(t, n) {
  var e;
  void 0 === n && (n = {});
  const { x: o, y: r, platform: s, rects: l, elements: u, strategy: f } = t,
    {
      boundary: d = 'clippingAncestors',
      rootBoundary: m = 'viewport',
      elementContext: y = 'floating',
      altBoundary: p = !1,
      padding: h = 0,
    } = i(n, t),
    x = a(h),
    g = u[p ? ('floating' === y ? 'reference' : 'floating') : y],
    w = c(
      await s.getClippingRect({
        element:
          null == (e = await (null == s.isElement ? void 0 : s.isElement(g))) || e
            ? g
            : g.contextElement || (await (null == s.getDocumentElement ? void 0 : s.getDocumentElement(u.floating))),
        boundary: d,
        rootBoundary: m,
        strategy: f,
      }),
    ),
    v = 'floating' === y ? { ...l.floating, x: o, y: r } : l.reference,
    b = await (null == s.getOffsetParent ? void 0 : s.getOffsetParent(u.floating)),
    A = ((await (null == s.isElement ? void 0 : s.isElement(b))) &&
      (await (null == s.getScale ? void 0 : s.getScale(b)))) || { x: 1, y: 1 },
    R = c(
      s.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: v, offsetParent: b, strategy: f })
        : v,
    );
  return {
    top: (w.top - R.top + x.top) / A.y,
    bottom: (R.bottom - w.bottom + x.bottom) / A.y,
    left: (w.left - R.left + x.left) / A.x,
    right: (R.right - w.right + x.right) / A.x,
  };
}
const l = Math.min,
  u = Math.max;
function f(t, n, e) {
  return u(t, l(n, e));
}
const d = e => ({
    name: 'arrow',
    options: e,
    async fn(r) {
      const { x: c, y: s, placement: u, rects: d, platform: m, elements: y } = r,
        { element: p, padding: h = 0 } = i(e, r) || {};
      if (null == p) return {};
      const x = a(h),
        g = { x: c, y: s },
        w = o(u),
        v = n(w),
        b = await m.getDimensions(p),
        A = 'y' === w,
        R = A ? 'top' : 'left',
        S = A ? 'bottom' : 'right',
        k = A ? 'clientHeight' : 'clientWidth',
        F = d.reference[v] + d.reference[w] - g[w] - d.floating[v],
        O = g[w] - d.reference[w],
        C = await (null == m.getOffsetParent ? void 0 : m.getOffsetParent(p));
      let M = C ? C[k] : 0;
      (M && (await (null == m.isElement ? void 0 : m.isElement(C)))) || (M = y.floating[k] || d.floating[v]);
      const P = F / 2 - O / 2,
        T = M / 2 - b[v] / 2 - 1,
        z = l(x[R], T),
        B = l(x[S], T),
        D = z,
        H = M - b[v] - B,
        L = M / 2 - b[v] / 2 + P,
        E = f(D, L, H),
        I = null != t(u) && L != E && d.reference[v] / 2 - (L < D ? z : B) - b[v] / 2 < 0 ? (L < D ? D - L : H - L) : 0;
      return { [w]: g[w] - I, data: { [w]: E, centerOffset: L - E + I } };
    },
  }),
  m = ['top', 'right', 'bottom', 'left'],
  y = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function p(t) {
  return t.replace(/left|right|bottom|top/g, t => y[t]);
}
const h = { start: 'end', end: 'start' };
function x(t) {
  return t.replace(/start|end/g, t => h[t]);
}
const g = function (r) {
  return (
    void 0 === r && (r = {}),
    {
      name: 'flip',
      options: r,
      async fn(a) {
        var c;
        const { placement: l, middlewareData: u, rects: f, initialPlacement: d, platform: m, elements: y } = a,
          {
            mainAxis: h = !0,
            crossAxis: g = !0,
            fallbackPlacements: w,
            fallbackStrategy: v = 'bestFit',
            fallbackAxisSideDirection: b = 'none',
            flipAlignment: A = !0,
            ...R
          } = i(r, a),
          S = e(l),
          k = e(d) === d,
          F = await (null == m.isRTL ? void 0 : m.isRTL(y.floating)),
          O =
            w ||
            (k || !A
              ? [p(d)]
              : (function (t) {
                  const n = p(t);
                  return [x(t), n, x(n)];
                })(d));
        w ||
          'none' === b ||
          O.push(
            ...(function (n, o, r, i) {
              const a = t(n);
              let c = (function (t, n, e) {
                const o = ['left', 'right'],
                  r = ['right', 'left'],
                  i = ['top', 'bottom'],
                  a = ['bottom', 'top'];
                switch (t) {
                  case 'top':
                  case 'bottom':
                    return e ? (n ? r : o) : n ? o : r;
                  case 'left':
                  case 'right':
                    return n ? i : a;
                  default:
                    return [];
                }
              })(e(n), 'start' === r, i);
              return a && ((c = c.map(t => t + '-' + a)), o && (c = c.concat(c.map(x)))), c;
            })(d, A, b, F),
          );
        const C = [d, ...O],
          M = await s(a, R),
          P = [];
        let T = (null == (c = u.flip) ? void 0 : c.overflows) || [];
        if ((h && P.push(M[S]), g)) {
          const { main: e, cross: r } = (function (e, r, i) {
            void 0 === i && (i = !1);
            const a = t(e),
              c = o(e),
              s = n(c);
            let l = 'x' === c ? (a === (i ? 'end' : 'start') ? 'right' : 'left') : 'start' === a ? 'bottom' : 'top';
            return r.reference[s] > r.floating[s] && (l = p(l)), { main: l, cross: p(l) };
          })(l, f, F);
          P.push(M[e], M[r]);
        }
        if (((T = [...T, { placement: l, overflows: P }]), !P.every(t => t <= 0))) {
          var z, B;
          const t = ((null == (z = u.flip) ? void 0 : z.index) || 0) + 1,
            n = C[t];
          if (n) return { data: { index: t, overflows: T }, reset: { placement: n } };
          let e =
            null == (B = T.filter(t => t.overflows[0] <= 0).sort((t, n) => t.overflows[1] - n.overflows[1])[0])
              ? void 0
              : B.placement;
          if (!e)
            switch (v) {
              case 'bestFit': {
                var D;
                const t =
                  null ==
                  (D = T.map(t => [t.placement, t.overflows.filter(t => t > 0).reduce((t, n) => t + n, 0)]).sort(
                    (t, n) => t[1] - n[1],
                  )[0])
                    ? void 0
                    : D[0];
                t && (e = t);
                break;
              }
              case 'initialPlacement':
                e = d;
            }
          if (l !== e) return { reset: { placement: e } };
        }
        return {};
      },
    }
  );
};
function w(t, n) {
  return { top: t.top - n.height, right: t.right - n.width, bottom: t.bottom - n.height, left: t.left - n.width };
}
function v(t) {
  return m.some(n => t[n] >= 0);
}
const b = function (t) {
    return (
      void 0 === t && (t = {}),
      {
        name: 'hide',
        options: t,
        async fn(n) {
          const { rects: e } = n,
            { strategy: o = 'referenceHidden', ...r } = i(t, n);
          switch (o) {
            case 'referenceHidden': {
              const t = w(await s(n, { ...r, elementContext: 'reference' }), e.reference);
              return { data: { referenceHiddenOffsets: t, referenceHidden: v(t) } };
            }
            case 'escaped': {
              const t = w(await s(n, { ...r, altBoundary: !0 }), e.floating);
              return { data: { escapedOffsets: t, escaped: v(t) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  A = function (n) {
    return (
      void 0 === n && (n = 0),
      {
        name: 'offset',
        options: n,
        async fn(r) {
          const { x: a, y: c } = r,
            s = await (async function (n, r) {
              const { placement: a, platform: c, elements: s } = n,
                l = await (null == c.isRTL ? void 0 : c.isRTL(s.floating)),
                u = e(a),
                f = t(a),
                d = 'x' === o(a),
                m = ['left', 'top'].includes(u) ? -1 : 1,
                y = l && d ? -1 : 1,
                p = i(r, n);
              let {
                mainAxis: h,
                crossAxis: x,
                alignmentAxis: g,
              } = 'number' == typeof p
                ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
                : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...p };
              return (
                f && 'number' == typeof g && (x = 'end' === f ? -1 * g : g),
                d ? { x: x * y, y: h * m } : { x: h * m, y: x * y }
              );
            })(r, n);
          return { x: a + s.x, y: c + s.y, data: s };
        },
      }
    );
  },
  R = function (t) {
    return (
      void 0 === t && (t = {}),
      {
        name: 'shift',
        options: t,
        async fn(n) {
          const { x: r, y: a, placement: c } = n,
            {
              mainAxis: l = !0,
              crossAxis: u = !1,
              limiter: d = {
                fn: t => {
                  let { x: n, y: e } = t;
                  return { x: n, y: e };
                },
              },
              ...m
            } = i(t, n),
            y = { x: r, y: a },
            p = await s(n, m),
            h = o(e(c)),
            x = 'x' === h ? 'y' : 'x';
          let g = y[h],
            w = y[x];
          l && (g = f(g + p['y' === h ? 'top' : 'left'], g, g - p['y' === h ? 'bottom' : 'right'])),
            u && (w = f(w + p['y' === x ? 'top' : 'left'], w, w - p['y' === x ? 'bottom' : 'right']));
          const v = d.fn({ ...n, [h]: g, [x]: w });
          return { ...v, data: { x: v.x - r, y: v.y - a } };
        },
      }
    );
  },
  S = function (n) {
    return (
      void 0 === n && (n = {}),
      {
        name: 'size',
        options: n,
        async fn(r) {
          const { placement: a, rects: c, platform: f, elements: d } = r,
            { apply: m = () => {}, ...y } = i(n, r),
            p = await s(r, y),
            h = e(a),
            x = t(a),
            g = 'x' === o(a),
            { width: w, height: v } = c.floating;
          let b, A;
          'top' === h || 'bottom' === h
            ? ((b = h),
              (A =
                x === ((await (null == f.isRTL ? void 0 : f.isRTL(d.floating))) ? 'start' : 'end') ? 'left' : 'right'))
            : ((A = h), (b = 'end' === x ? 'top' : 'bottom'));
          const R = v - p[b],
            S = w - p[A],
            k = !r.middlewareData.shift;
          let F = R,
            O = S;
          if (g) {
            const t = w - p.left - p.right;
            O = x || k ? l(S, t) : t;
          } else {
            const t = v - p.top - p.bottom;
            F = x || k ? l(R, t) : t;
          }
          if (k && !x) {
            const t = u(p.left, 0),
              n = u(p.right, 0),
              e = u(p.top, 0),
              o = u(p.bottom, 0);
            g
              ? (O = w - 2 * (0 !== t || 0 !== n ? t + n : u(p.left, p.right)))
              : (F = v - 2 * (0 !== e || 0 !== o ? e + o : u(p.top, p.bottom)));
          }
          await m({ ...r, availableWidth: O, availableHeight: F });
          const C = await f.getDimensions(d.floating);
          return w !== C.width || v !== C.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function k(t) {
  var n;
  return (null == (n = t.ownerDocument) ? void 0 : n.defaultView) || window;
}
function F(t) {
  return k(t).getComputedStyle(t);
}
function O(t) {
  return t instanceof k(t).Node;
}
function C(t) {
  return O(t) ? (t.nodeName || '').toLowerCase() : '#document';
}
function M(t) {
  return t instanceof k(t).HTMLElement;
}
function P(t) {
  return t instanceof k(t).Element;
}
function T(t) {
  return 'undefined' != typeof ShadowRoot && (t instanceof k(t).ShadowRoot || t instanceof ShadowRoot);
}
function z(t) {
  const { overflow: n, overflowX: e, overflowY: o, display: r } = F(t);
  return /auto|scroll|overlay|hidden|clip/.test(n + o + e) && !['inline', 'contents'].includes(r);
}
function B(t) {
  return ['table', 'td', 'th'].includes(C(t));
}
function D(t) {
  const n = H(),
    e = F(t);
  return (
    'none' !== e.transform ||
    'none' !== e.perspective ||
    (!!e.containerType && 'normal' !== e.containerType) ||
    (!n && !!e.backdropFilter && 'none' !== e.backdropFilter) ||
    (!n && !!e.filter && 'none' !== e.filter) ||
    ['transform', 'perspective', 'filter'].some(t => (e.willChange || '').includes(t)) ||
    ['paint', 'layout', 'strict', 'content'].some(t => (e.contain || '').includes(t))
  );
}
function H() {
  return !('undefined' == typeof CSS || !CSS.supports) && CSS.supports('-webkit-backdrop-filter', 'none');
}
function L(t) {
  return ['html', 'body', '#document'].includes(C(t));
}
const E = Math.min,
  I = Math.max,
  q = Math.round,
  N = Math.floor,
  W = t => ({ x: t, y: t });
function $(t) {
  const n = F(t);
  let e = parseFloat(n.width) || 0,
    o = parseFloat(n.height) || 0;
  const r = M(t),
    i = r ? t.offsetWidth : e,
    a = r ? t.offsetHeight : o,
    c = q(e) !== i || q(o) !== a;
  return c && ((e = i), (o = a)), { width: e, height: o, $: c };
}
function j(t) {
  return P(t) ? t : t.contextElement;
}
function V(t) {
  const n = j(t);
  if (!M(n)) return W(1);
  const e = n.getBoundingClientRect(),
    { width: o, height: r, $: i } = $(n);
  let a = (i ? q(e.width) : e.width) / o,
    c = (i ? q(e.height) : e.height) / r;
  return (a && Number.isFinite(a)) || (a = 1), (c && Number.isFinite(c)) || (c = 1), { x: a, y: c };
}
const X = W(0);
function Y(t, n, e) {
  var o, r;
  if ((void 0 === n && (n = !0), !H())) return X;
  const i = t ? k(t) : window;
  return !e || (n && e !== i)
    ? X
    : {
        x: (null == (o = i.visualViewport) ? void 0 : o.offsetLeft) || 0,
        y: (null == (r = i.visualViewport) ? void 0 : r.offsetTop) || 0,
      };
}
function _(t, n, e, o) {
  void 0 === n && (n = !1), void 0 === e && (e = !1);
  const r = t.getBoundingClientRect(),
    i = j(t);
  let a = W(1);
  n && (o ? P(o) && (a = V(o)) : (a = V(t)));
  const s = Y(i, e, o);
  let l = (r.left + s.x) / a.x,
    u = (r.top + s.y) / a.y,
    f = r.width / a.x,
    d = r.height / a.y;
  if (i) {
    const t = k(i),
      n = o && P(o) ? k(o) : o;
    let e = t.frameElement;
    for (; e && o && n !== t; ) {
      const t = V(e),
        n = e.getBoundingClientRect(),
        o = getComputedStyle(e),
        r = n.left + (e.clientLeft + parseFloat(o.paddingLeft)) * t.x,
        i = n.top + (e.clientTop + parseFloat(o.paddingTop)) * t.y;
      (l *= t.x), (u *= t.y), (f *= t.x), (d *= t.y), (l += r), (u += i), (e = k(e).frameElement);
    }
  }
  return c({ width: f, height: d, x: l, y: u });
}
function G(t) {
  return ((O(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function J(t) {
  return P(t)
    ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
    : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function K(t) {
  return _(G(t)).left + J(t).scrollLeft;
}
function Q(t) {
  if ('html' === C(t)) return t;
  const n = t.assignedSlot || t.parentNode || (T(t) && t.host) || G(t);
  return T(n) ? n.host : n;
}
function U(t) {
  const n = Q(t);
  return L(n) ? (t.ownerDocument ? t.ownerDocument.body : t.body) : M(n) && z(n) ? n : U(n);
}
function Z(t, n) {
  var e;
  void 0 === n && (n = []);
  const o = U(t),
    r = o === (null == (e = t.ownerDocument) ? void 0 : e.body),
    i = k(o);
  return r ? n.concat(i, i.visualViewport || [], z(o) ? o : []) : n.concat(o, Z(o));
}
function tt(t, n, e) {
  let o;
  if ('viewport' === n)
    o = (function (t, n) {
      const e = k(t),
        o = G(t),
        r = e.visualViewport;
      let i = o.clientWidth,
        a = o.clientHeight,
        c = 0,
        s = 0;
      if (r) {
        (i = r.width), (a = r.height);
        const t = H();
        (!t || (t && 'fixed' === n)) && ((c = r.offsetLeft), (s = r.offsetTop));
      }
      return { width: i, height: a, x: c, y: s };
    })(t, e);
  else if ('document' === n)
    o = (function (t) {
      const n = G(t),
        e = J(t),
        o = t.ownerDocument.body,
        r = I(n.scrollWidth, n.clientWidth, o.scrollWidth, o.clientWidth),
        i = I(n.scrollHeight, n.clientHeight, o.scrollHeight, o.clientHeight);
      let a = -e.scrollLeft + K(t);
      const c = -e.scrollTop;
      return (
        'rtl' === F(o).direction && (a += I(n.clientWidth, o.clientWidth) - r), { width: r, height: i, x: a, y: c }
      );
    })(G(t));
  else if (P(n))
    o = (function (t, n) {
      const e = _(t, !0, 'fixed' === n),
        o = e.top + t.clientTop,
        r = e.left + t.clientLeft,
        i = M(t) ? V(t) : W(1);
      return { width: t.clientWidth * i.x, height: t.clientHeight * i.y, x: r * i.x, y: o * i.y };
    })(n, e);
  else {
    const e = Y(t);
    o = { ...n, x: n.x - e.x, y: n.y - e.y };
  }
  return c(o);
}
function nt(t, n) {
  const e = Q(t);
  return !(e === n || !P(e) || L(e)) && ('fixed' === F(e).position || nt(e, n));
}
function et(t, n) {
  return M(t) && 'fixed' !== F(t).position ? (n ? n(t) : t.offsetParent) : null;
}
function ot(t, n) {
  const e = k(t);
  if (!M(t)) return e;
  let o = et(t, n);
  for (; o && B(o) && 'static' === F(o).position; ) o = et(o, n);
  return o && ('html' === C(o) || ('body' === C(o) && 'static' === F(o).position && !D(o)))
    ? e
    : o ||
        (function (t) {
          let n = Q(t);
          for (; M(n) && !L(n); ) {
            if (D(n)) return n;
            n = Q(n);
          }
          return null;
        })(t) ||
        e;
}
function rt(t, n, e) {
  const o = M(n),
    r = G(n),
    i = 'fixed' === e,
    a = _(t, !0, i, n);
  let c = { scrollLeft: 0, scrollTop: 0 };
  const s = W(0);
  if (o || (!o && !i))
    if ((('body' !== C(n) || z(r)) && (c = J(n)), M(n))) {
      const t = _(n, !0, i, n);
      (s.x = t.x + n.clientLeft), (s.y = t.y + n.clientTop);
    } else r && (s.x = K(r));
  return { x: a.left + c.scrollLeft - s.x, y: a.top + c.scrollTop - s.y, width: a.width, height: a.height };
}
const it = {
  getClippingRect: function (t) {
    let { element: n, boundary: e, rootBoundary: o, strategy: r } = t;
    const i = [
        ...('clippingAncestors' === e
          ? (function (t, n) {
              const e = n.get(t);
              if (e) return e;
              let o = Z(t).filter(t => P(t) && 'body' !== C(t)),
                r = null;
              const i = 'fixed' === F(t).position;
              let a = i ? Q(t) : t;
              for (; P(a) && !L(a); ) {
                const n = F(a),
                  e = D(a);
                e || 'fixed' !== n.position || (r = null),
                  (
                    i
                      ? !e && !r
                      : (!e && 'static' === n.position && r && ['absolute', 'fixed'].includes(r.position)) ||
                        (z(a) && !e && nt(t, a))
                  )
                    ? (o = o.filter(t => t !== a))
                    : (r = n),
                  (a = Q(a));
              }
              return n.set(t, o), o;
            })(n, this._c)
          : [].concat(e)),
        o,
      ],
      a = i.reduce(
        (t, e) => {
          const o = tt(n, e, r);
          return (
            (t.top = I(o.top, t.top)),
            (t.right = E(o.right, t.right)),
            (t.bottom = E(o.bottom, t.bottom)),
            (t.left = I(o.left, t.left)),
            t
          );
        },
        tt(n, i[0], r),
      );
    return { width: a.right - a.left, height: a.bottom - a.top, x: a.left, y: a.top };
  },
  convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
    let { rect: n, offsetParent: e, strategy: o } = t;
    const r = M(e),
      i = G(e);
    if (e === i) return n;
    let a = { scrollLeft: 0, scrollTop: 0 },
      c = W(1);
    const s = W(0);
    if ((r || (!r && 'fixed' !== o)) && (('body' !== C(e) || z(i)) && (a = J(e)), M(e))) {
      const t = _(e);
      (c = V(e)), (s.x = t.x + e.clientLeft), (s.y = t.y + e.clientTop);
    }
    return {
      width: n.width * c.x,
      height: n.height * c.y,
      x: n.x * c.x - a.scrollLeft * c.x + s.x,
      y: n.y * c.y - a.scrollTop * c.y + s.y,
    };
  },
  isElement: P,
  getDimensions: function (t) {
    return $(t);
  },
  getOffsetParent: ot,
  getDocumentElement: G,
  getScale: V,
  async getElementRects(t) {
    let { reference: n, floating: e, strategy: o } = t;
    const r = this.getOffsetParent || ot,
      i = this.getDimensions;
    return { reference: rt(n, await r(e), o), floating: { x: 0, y: 0, ...(await i(e)) } };
  },
  getClientRects: t => Array.from(t.getClientRects()),
  isRTL: t => 'rtl' === F(t).direction,
};
function at(t, n, e, o) {
  void 0 === o && (o = {});
  const {
      ancestorScroll: r = !0,
      ancestorResize: i = !0,
      elementResize: a = 'function' == typeof ResizeObserver,
      layoutShift: c = 'function' == typeof IntersectionObserver,
      animationFrame: s = !1,
    } = o,
    l = j(t),
    u = r || i ? [...(l ? Z(l) : []), ...Z(n)] : [];
  u.forEach(t => {
    r && t.addEventListener('scroll', e, { passive: !0 }), i && t.addEventListener('resize', e);
  });
  const f =
    l && c
      ? (function (t, n) {
          let e,
            o = null;
          const r = G(t);
          function i() {
            clearTimeout(e), o && o.disconnect(), (o = null);
          }
          return (
            (function a(c, s) {
              void 0 === c && (c = !1), void 0 === s && (s = 1), i();
              const { left: l, top: u, width: f, height: d } = t.getBoundingClientRect();
              if ((c || n(), !f || !d)) return;
              const m = {
                rootMargin:
                  -N(u) +
                  'px ' +
                  -N(r.clientWidth - (l + f)) +
                  'px ' +
                  -N(r.clientHeight - (u + d)) +
                  'px ' +
                  -N(l) +
                  'px',
                threshold: I(0, E(1, s)) || 1,
              };
              let y = !0;
              function p(t) {
                const n = t[0].intersectionRatio;
                if (n !== s) {
                  if (!y) return a();
                  n
                    ? a(!1, n)
                    : (e = setTimeout(() => {
                        a(!1, 1e-7);
                      }, 100));
                }
                y = !1;
              }
              try {
                o = new IntersectionObserver(p, { ...m, root: r.ownerDocument });
              } catch (t) {
                o = new IntersectionObserver(p, m);
              }
              o.observe(t);
            })(!0),
            i
          );
        })(l, e)
      : null;
  let d,
    m = -1,
    y = null;
  a &&
    ((y = new ResizeObserver(t => {
      let [o] = t;
      o &&
        o.target === l &&
        y &&
        (y.unobserve(n),
        cancelAnimationFrame(m),
        (m = requestAnimationFrame(() => {
          y && y.observe(n);
        }))),
        e();
    })),
    l && !s && y.observe(l),
    y.observe(n));
  let p = s ? _(t) : null;
  return (
    s &&
      (function n() {
        const o = _(t);
        !p || (o.x === p.x && o.y === p.y && o.width === p.width && o.height === p.height) || e(),
          (p = o),
          (d = requestAnimationFrame(n));
      })(),
    e(),
    () => {
      u.forEach(t => {
        r && t.removeEventListener('scroll', e), i && t.removeEventListener('resize', e);
      }),
        f && f(),
        y && y.disconnect(),
        (y = null),
        s && cancelAnimationFrame(d);
    }
  );
}
const ct = (t, n, e) => {
  const o = new Map(),
    i = { platform: it, ...e },
    a = { ...i.platform, _c: o };
  return (async (t, n, e) => {
    const { placement: o = 'bottom', strategy: i = 'absolute', middleware: a = [], platform: c } = e,
      s = a.filter(Boolean),
      l = await (null == c.isRTL ? void 0 : c.isRTL(n));
    let u = await c.getElementRects({ reference: t, floating: n, strategy: i }),
      { x: f, y: d } = r(u, o, l),
      m = o,
      y = {},
      p = 0;
    for (let e = 0; e < s.length; e++) {
      const { name: a, fn: h } = s[e],
        {
          x,
          y: g,
          data: w,
          reset: v,
        } = await h({
          x: f,
          y: d,
          initialPlacement: o,
          placement: m,
          strategy: i,
          middlewareData: y,
          rects: u,
          platform: c,
          elements: { reference: t, floating: n },
        });
      (f = null != x ? x : f),
        (d = null != g ? g : d),
        (y = { ...y, [a]: { ...y[a], ...w } }),
        v &&
          p <= 50 &&
          (p++,
          'object' == typeof v &&
            (v.placement && (m = v.placement),
            v.rects &&
              (u = !0 === v.rects ? await c.getElementRects({ reference: t, floating: n, strategy: i }) : v.rects),
            ({ x: f, y: d } = r(u, m, l))),
          (e = -1));
    }
    return { x: f, y: d, placement: m, strategy: i, middlewareData: y };
  })(t, n, { ...i, platform: a });
};
export { at as a, d as b, ct as c, S as d, g as f, b as h, A as o, R as s };

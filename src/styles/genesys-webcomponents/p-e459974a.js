var t = 'top',
  n = 'bottom',
  e = 'right',
  r = 'left',
  o = 'auto',
  i = [t, n, e, r],
  u = 'start',
  a = 'end',
  f = 'viewport',
  c = 'popper',
  d = i.reduce(function (t, n) {
    return t.concat([n + '-' + u, n + '-' + a]);
  }, []),
  l = [].concat(i, [o]).reduce(function (t, n) {
    return t.concat([n, n + '-' + u, n + '-' + a]);
  }, []),
  p = ['beforeRead', 'read', 'afterRead', 'beforeMain', 'main', 'afterMain', 'beforeWrite', 'write', 'afterWrite'];
function s(t) {
  return t ? (t.nodeName || '').toLowerCase() : null;
}
function v(t) {
  if (null == t) return window;
  if ('[object Window]' !== t.toString()) {
    var n = t.ownerDocument;
    return (n && n.defaultView) || window;
  }
  return t;
}
function b(t) {
  return t instanceof v(t).Element || t instanceof Element;
}
function h(t) {
  return t instanceof v(t).HTMLElement || t instanceof HTMLElement;
}
function y(t) {
  return 'undefined' != typeof ShadowRoot && (t instanceof v(t).ShadowRoot || t instanceof ShadowRoot);
}
function m(t) {
  return t.split('-')[0];
}
var x = Math.max,
  w = Math.min,
  O = Math.round;
function g() {
  var t = navigator.userAgentData;
  return null != t && t.brands && Array.isArray(t.brands)
    ? t.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function j() {
  return !/^((?!chrome|android).)*safari/i.test(g());
}
function M(t, n, e) {
  void 0 === n && (n = !1), void 0 === e && (e = !1);
  var r = t.getBoundingClientRect(),
    o = 1,
    i = 1;
  n &&
    h(t) &&
    ((o = (t.offsetWidth > 0 && O(r.width) / t.offsetWidth) || 1),
    (i = (t.offsetHeight > 0 && O(r.height) / t.offsetHeight) || 1));
  var u = (b(t) ? v(t) : window).visualViewport,
    a = !j() && e,
    f = (r.left + (a && u ? u.offsetLeft : 0)) / o,
    c = (r.top + (a && u ? u.offsetTop : 0)) / i,
    d = r.width / o,
    l = r.height / i;
  return { width: d, height: l, top: c, right: f + d, bottom: c + l, left: f, x: f, y: c };
}
function k(t) {
  var n = M(t),
    e = t.offsetWidth,
    r = t.offsetHeight;
  return (
    Math.abs(n.width - e) <= 1 && (e = n.width),
    Math.abs(n.height - r) <= 1 && (r = n.height),
    { x: t.offsetLeft, y: t.offsetTop, width: e, height: r }
  );
}
function A(t, n) {
  var e = n.getRootNode && n.getRootNode();
  if (t.contains(n)) return !0;
  if (e && y(e)) {
    var r = n;
    do {
      if (r && t.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function E(t) {
  return v(t).getComputedStyle(t);
}
function q(t) {
  return ['table', 'td', 'th'].indexOf(s(t)) >= 0;
}
function B(t) {
  return ((b(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function P(t) {
  return 'html' === s(t) ? t : t.assignedSlot || t.parentNode || (y(t) ? t.host : null) || B(t);
}
function R(t) {
  return h(t) && 'fixed' !== E(t).position ? t.offsetParent : null;
}
function S(t) {
  for (var n = v(t), e = R(t); e && q(e) && 'static' === E(e).position; ) e = R(e);
  return e && ('html' === s(e) || ('body' === s(e) && 'static' === E(e).position))
    ? n
    : e ||
        (function (t) {
          var n = /firefox/i.test(g());
          if (/Trident/i.test(g()) && h(t) && 'fixed' === E(t).position) return null;
          var e = P(t);
          for (y(e) && (e = e.host); h(e) && ['html', 'body'].indexOf(s(e)) < 0; ) {
            var r = E(e);
            if (
              'none' !== r.transform ||
              'none' !== r.perspective ||
              'paint' === r.contain ||
              -1 !== ['transform', 'perspective'].indexOf(r.willChange) ||
              (n && 'filter' === r.willChange) ||
              (n && r.filter && 'none' !== r.filter)
            )
              return e;
            e = e.parentNode;
          }
          return null;
        })(t) ||
        n;
}
function W(t) {
  return ['top', 'bottom'].indexOf(t) >= 0 ? 'x' : 'y';
}
function L(t, n, e) {
  return x(t, w(n, e));
}
function T(t) {
  return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
}
function H(t, n) {
  return n.reduce(function (n, e) {
    return (n[e] = t), n;
  }, {});
}
function I(t) {
  return t.split('-')[1];
}
var z = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function C(o) {
  var i,
    u = o.popper,
    f = o.popperRect,
    c = o.placement,
    d = o.variation,
    l = o.offsets,
    p = o.position,
    s = o.gpuAcceleration,
    b = o.adaptive,
    h = o.roundOffsets,
    y = o.isFixed,
    m = l.x,
    x = void 0 === m ? 0 : m,
    w = l.y,
    g = void 0 === w ? 0 : w,
    j = 'function' == typeof h ? h({ x, y: g }) : { x, y: g };
  (x = j.x), (g = j.y);
  var M = l.hasOwnProperty('x'),
    k = l.hasOwnProperty('y'),
    A = r,
    q = t,
    P = window;
  if (b) {
    var R = S(u),
      W = 'clientHeight',
      L = 'clientWidth';
    R === v(u) &&
      'static' !== E((R = B(u))).position &&
      'absolute' === p &&
      ((W = 'scrollHeight'), (L = 'scrollWidth')),
      (c === t || ((c === r || c === e) && d === a)) &&
        ((q = n),
        (g -= (y && R === P && P.visualViewport ? P.visualViewport.height : R[W]) - f.height),
        (g *= s ? 1 : -1)),
      (c !== r && ((c !== t && c !== n) || d !== a)) ||
        ((A = e),
        (x -= (y && R === P && P.visualViewport ? P.visualViewport.width : R[L]) - f.width),
        (x *= s ? 1 : -1));
  }
  var T,
    H = Object.assign({ position: p }, b && z),
    I =
      !0 === h
        ? (function (t, n) {
            var e = t.y,
              r = n.devicePixelRatio || 1;
            return { x: O(t.x * r) / r || 0, y: O(e * r) / r || 0 };
          })({ x, y: g }, v(u))
        : { x, y: g };
  return (
    (x = I.x),
    (g = I.y),
    Object.assign(
      {},
      H,
      s
        ? (((T = {})[q] = k ? '0' : ''),
          (T[A] = M ? '0' : ''),
          (T.transform =
            (P.devicePixelRatio || 1) <= 1
              ? 'translate(' + x + 'px, ' + g + 'px)'
              : 'translate3d(' + x + 'px, ' + g + 'px, 0)'),
          T)
        : (((i = {})[q] = k ? g + 'px' : ''), (i[A] = M ? x + 'px' : ''), (i.transform = ''), i),
    )
  );
}
var D = { passive: !0 },
  F = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function U(t) {
  return t.replace(/left|right|bottom|top/g, function (t) {
    return F[t];
  });
}
var V = { start: 'end', end: 'start' };
function _(t) {
  return t.replace(/start|end/g, function (t) {
    return V[t];
  });
}
function G(t) {
  var n = v(t);
  return { scrollLeft: n.pageXOffset, scrollTop: n.pageYOffset };
}
function J(t) {
  return M(B(t)).left + G(t).scrollLeft;
}
function K(t) {
  var n = E(t);
  return /auto|scroll|overlay|hidden/.test(n.overflow + n.overflowY + n.overflowX);
}
function N(t) {
  return ['html', 'body', '#document'].indexOf(s(t)) >= 0 ? t.ownerDocument.body : h(t) && K(t) ? t : N(P(t));
}
function Q(t, n) {
  var e;
  void 0 === n && (n = []);
  var r = N(t),
    o = r === (null == (e = t.ownerDocument) ? void 0 : e.body),
    i = v(r),
    u = o ? [i].concat(i.visualViewport || [], K(r) ? r : []) : r,
    a = n.concat(u);
  return o ? a : a.concat(Q(P(u)));
}
function X(t) {
  return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
}
function Y(t, n, e) {
  return n === f
    ? X(
        (function (t, n) {
          var e = v(t),
            r = B(t),
            o = e.visualViewport,
            i = r.clientWidth,
            u = r.clientHeight,
            a = 0,
            f = 0;
          if (o) {
            (i = o.width), (u = o.height);
            var c = j();
            (c || (!c && 'fixed' === n)) && ((a = o.offsetLeft), (f = o.offsetTop));
          }
          return { width: i, height: u, x: a + J(t), y: f };
        })(t, e),
      )
    : b(n)
    ? (function (t, n) {
        var e = M(t, !1, 'fixed' === n);
        return (
          (e.top = e.top + t.clientTop),
          (e.left = e.left + t.clientLeft),
          (e.bottom = e.top + t.clientHeight),
          (e.right = e.left + t.clientWidth),
          (e.width = t.clientWidth),
          (e.height = t.clientHeight),
          (e.x = e.left),
          (e.y = e.top),
          e
        );
      })(n, e)
    : X(
        (function (t) {
          var n,
            e = B(t),
            r = G(t),
            o = null == (n = t.ownerDocument) ? void 0 : n.body,
            i = x(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
            u = x(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
            a = -r.scrollLeft + J(t),
            f = -r.scrollTop;
          return (
            'rtl' === E(o || e).direction && (a += x(e.clientWidth, o ? o.clientWidth : 0) - i),
            { width: i, height: u, x: a, y: f }
          );
        })(B(t)),
      );
}
function Z(o) {
  var i,
    f = o.reference,
    c = o.element,
    d = o.placement,
    l = d ? m(d) : null,
    p = d ? I(d) : null,
    s = f.x + f.width / 2 - c.width / 2,
    v = f.y + f.height / 2 - c.height / 2;
  switch (l) {
    case t:
      i = { x: s, y: f.y - c.height };
      break;
    case n:
      i = { x: s, y: f.y + f.height };
      break;
    case e:
      i = { x: f.x + f.width, y: v };
      break;
    case r:
      i = { x: f.x - c.width, y: v };
      break;
    default:
      i = { x: f.x, y: f.y };
  }
  var b = l ? W(l) : null;
  if (null != b) {
    var h = 'y' === b ? 'height' : 'width';
    switch (p) {
      case u:
        i[b] = i[b] - (f[h] / 2 - c[h] / 2);
        break;
      case a:
        i[b] = i[b] + (f[h] / 2 - c[h] / 2);
    }
  }
  return i;
}
function $(r, o) {
  void 0 === o && (o = {});
  var u = o.placement,
    a = void 0 === u ? r.placement : u,
    d = o.strategy,
    l = void 0 === d ? r.strategy : d,
    p = o.boundary,
    v = void 0 === p ? 'clippingParents' : p,
    y = o.rootBoundary,
    m = void 0 === y ? f : y,
    O = o.elementContext,
    g = void 0 === O ? c : O,
    j = o.altBoundary,
    k = void 0 !== j && j,
    q = o.padding,
    R = void 0 === q ? 0 : q,
    W = T('number' != typeof R ? R : H(R, i)),
    L = r.rects.popper,
    I = r.elements[k ? (g === c ? 'reference' : c) : g],
    z = (function (t, n, e, r) {
      var o =
          'clippingParents' === n
            ? (function (t) {
                var n = Q(P(t)),
                  e = ['absolute', 'fixed'].indexOf(E(t).position) >= 0 && h(t) ? S(t) : t;
                return b(e)
                  ? n.filter(function (t) {
                      return b(t) && A(t, e) && 'body' !== s(t);
                    })
                  : [];
              })(t)
            : [].concat(n),
        i = [].concat(o, [e]),
        u = i.reduce(
          function (n, e) {
            var o = Y(t, e, r);
            return (
              (n.top = x(o.top, n.top)),
              (n.right = w(o.right, n.right)),
              (n.bottom = w(o.bottom, n.bottom)),
              (n.left = x(o.left, n.left)),
              n
            );
          },
          Y(t, i[0], r),
        );
      return (u.width = u.right - u.left), (u.height = u.bottom - u.top), (u.x = u.left), (u.y = u.top), u;
    })(b(I) ? I : I.contextElement || B(r.elements.popper), v, m, l),
    C = M(r.elements.reference),
    D = Z({ reference: C, element: L, strategy: 'absolute', placement: a }),
    F = X(Object.assign({}, L, D)),
    U = g === c ? F : C,
    V = {
      top: z.top - U.top + W.top,
      bottom: U.bottom - z.bottom + W.bottom,
      left: z.left - U.left + W.left,
      right: U.right - z.right + W.right,
    },
    _ = r.modifiersData.offset;
  if (g === c && _) {
    var G = _[a];
    Object.keys(V).forEach(function (r) {
      var o = [e, n].indexOf(r) >= 0 ? 1 : -1,
        i = [t, n].indexOf(r) >= 0 ? 'y' : 'x';
      V[r] += G[i] * o;
    });
  }
  return V;
}
function tt(t, n) {
  void 0 === n && (n = {});
  var e = n.boundary,
    r = n.rootBoundary,
    o = n.padding,
    u = n.flipVariations,
    a = n.allowedAutoPlacements,
    f = void 0 === a ? l : a,
    c = I(n.placement),
    p = c
      ? u
        ? d
        : d.filter(function (t) {
            return I(t) === c;
          })
      : i,
    s = p.filter(function (t) {
      return f.indexOf(t) >= 0;
    });
  0 === s.length && (s = p);
  var v = s.reduce(function (n, i) {
    return (n[i] = $(t, { placement: i, boundary: e, rootBoundary: r, padding: o })[m(i)]), n;
  }, {});
  return Object.keys(v).sort(function (t, n) {
    return v[t] - v[n];
  });
}
const nt = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: function (i) {
    var a = i.state,
      f = i.options,
      c = i.name;
    if (!a.modifiersData[c]._skip) {
      for (
        var d = f.mainAxis,
          l = void 0 === d || d,
          p = f.altAxis,
          s = void 0 === p || p,
          v = f.fallbackPlacements,
          b = f.padding,
          h = f.boundary,
          y = f.rootBoundary,
          x = f.altBoundary,
          w = f.flipVariations,
          O = void 0 === w || w,
          g = f.allowedAutoPlacements,
          j = a.options.placement,
          M = m(j),
          k =
            v ||
            (M !== j && O
              ? (function (t) {
                  if (m(t) === o) return [];
                  var n = U(t);
                  return [_(t), n, _(n)];
                })(j)
              : [U(j)]),
          A = [j].concat(k).reduce(function (t, n) {
            return t.concat(
              m(n) === o
                ? tt(a, {
                    placement: n,
                    boundary: h,
                    rootBoundary: y,
                    padding: b,
                    flipVariations: O,
                    allowedAutoPlacements: g,
                  })
                : n,
            );
          }, []),
          E = a.rects.reference,
          q = a.rects.popper,
          B = new Map(),
          P = !0,
          R = A[0],
          S = 0;
        S < A.length;
        S++
      ) {
        var W = A[S],
          L = m(W),
          T = I(W) === u,
          H = [t, n].indexOf(L) >= 0,
          z = H ? 'width' : 'height',
          C = $(a, { placement: W, boundary: h, rootBoundary: y, altBoundary: x, padding: b }),
          D = H ? (T ? e : r) : T ? n : t;
        E[z] > q[z] && (D = U(D));
        var F = U(D),
          V = [];
        if (
          (l && V.push(C[L] <= 0),
          s && V.push(C[D] <= 0, C[F] <= 0),
          V.every(function (t) {
            return t;
          }))
        ) {
          (R = W), (P = !1);
          break;
        }
        B.set(W, V);
      }
      if (P)
        for (
          var G = function (t) {
              var n = A.find(function (n) {
                var e = B.get(n);
                if (e)
                  return e.slice(0, t).every(function (t) {
                    return t;
                  });
              });
              if (n) return (R = n), 'break';
            },
            J = O ? 3 : 1;
          J > 0 && 'break' !== G(J);
          J--
        );
      a.placement !== R && ((a.modifiersData[c]._skip = !0), (a.placement = R), (a.reset = !0));
    }
  },
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function et(t, n, e) {
  return (
    void 0 === e && (e = { x: 0, y: 0 }),
    {
      top: t.top - n.height - e.y,
      right: t.right - n.width + e.x,
      bottom: t.bottom - n.height + e.y,
      left: t.left - n.width - e.x,
    }
  );
}
function rt(o) {
  return [t, e, n, r].some(function (t) {
    return o[t] >= 0;
  });
}
function ot(t, n, e) {
  void 0 === e && (e = !1);
  var r,
    o,
    i = h(n),
    u =
      h(n) &&
      (function (t) {
        var n = t.getBoundingClientRect(),
          e = O(n.width) / t.offsetWidth || 1,
          r = O(n.height) / t.offsetHeight || 1;
        return 1 !== e || 1 !== r;
      })(n),
    a = B(n),
    f = M(t, u, e),
    c = { scrollLeft: 0, scrollTop: 0 },
    d = { x: 0, y: 0 };
  return (
    (i || (!i && !e)) &&
      (('body' !== s(n) || K(a)) &&
        (c = (r = n) !== v(r) && h(r) ? { scrollLeft: (o = r).scrollLeft, scrollTop: o.scrollTop } : G(r)),
      h(n) ? (((d = M(n, !0)).x += n.clientLeft), (d.y += n.clientTop)) : a && (d.x = J(a))),
    { x: f.left + c.scrollLeft - d.x, y: f.top + c.scrollTop - d.y, width: f.width, height: f.height }
  );
}
function it(t) {
  var n = new Map(),
    e = new Set(),
    r = [];
  function o(t) {
    e.add(t.name),
      [].concat(t.requires || [], t.requiresIfExists || []).forEach(function (t) {
        if (!e.has(t)) {
          var r = n.get(t);
          r && o(r);
        }
      }),
      r.push(t);
  }
  return (
    t.forEach(function (t) {
      n.set(t.name, t);
    }),
    t.forEach(function (t) {
      e.has(t.name) || o(t);
    }),
    r
  );
}
var ut = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function at() {
  for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) n[e] = arguments[e];
  return !n.some(function (t) {
    return !(t && 'function' == typeof t.getBoundingClientRect);
  });
}
function ft(t) {
  void 0 === t && (t = {});
  var n = t.defaultModifiers,
    e = void 0 === n ? [] : n,
    r = t.defaultOptions,
    o = void 0 === r ? ut : r;
  return function (t, n, r) {
    void 0 === r && (r = o);
    var i,
      u,
      a = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, ut, o),
        modifiersData: {},
        elements: { reference: t, popper: n },
        attributes: {},
        styles: {},
      },
      f = [],
      c = !1,
      d = {
        state: a,
        setOptions: function (r) {
          var i = 'function' == typeof r ? r(a.options) : r;
          l(),
            (a.options = Object.assign({}, o, a.options, i)),
            (a.scrollParents = { reference: b(t) ? Q(t) : t.contextElement ? Q(t.contextElement) : [], popper: Q(n) });
          var u,
            c,
            s = (function (t) {
              var n = it(t);
              return p.reduce(function (t, e) {
                return t.concat(
                  n.filter(function (t) {
                    return t.phase === e;
                  }),
                );
              }, []);
            })(
              ((u = [].concat(e, a.options.modifiers)),
              (c = u.reduce(function (t, n) {
                var e = t[n.name];
                return (
                  (t[n.name] = e
                    ? Object.assign({}, e, n, {
                        options: Object.assign({}, e.options, n.options),
                        data: Object.assign({}, e.data, n.data),
                      })
                    : n),
                  t
                );
              }, {})),
              Object.keys(c).map(function (t) {
                return c[t];
              })),
            );
          return (
            (a.orderedModifiers = s.filter(function (t) {
              return t.enabled;
            })),
            a.orderedModifiers.forEach(function (t) {
              var n = t.options,
                e = t.effect;
              if ('function' == typeof e) {
                var r = e({ state: a, name: t.name, instance: d, options: void 0 === n ? {} : n });
                f.push(r || function () {});
              }
            }),
            d.update()
          );
        },
        forceUpdate: function () {
          if (!c) {
            var t = a.elements,
              n = t.reference,
              e = t.popper;
            if (at(n, e)) {
              (a.rects = { reference: ot(n, S(e), 'fixed' === a.options.strategy), popper: k(e) }),
                (a.reset = !1),
                (a.placement = a.options.placement),
                a.orderedModifiers.forEach(function (t) {
                  return (a.modifiersData[t.name] = Object.assign({}, t.data));
                });
              for (var r = 0; r < a.orderedModifiers.length; r++)
                if (!0 !== a.reset) {
                  var o = a.orderedModifiers[r],
                    i = o.fn,
                    u = o.options;
                  'function' == typeof i &&
                    (a = i({ state: a, options: void 0 === u ? {} : u, name: o.name, instance: d }) || a);
                } else (a.reset = !1), (r = -1);
            }
          }
        },
        update:
          ((i = function () {
            return new Promise(function (t) {
              d.forceUpdate(), t(a);
            });
          }),
          function () {
            return (
              u ||
                (u = new Promise(function (t) {
                  Promise.resolve().then(function () {
                    (u = void 0), t(i());
                  });
                })),
              u
            );
          }),
        destroy: function () {
          l(), (c = !0);
        },
      };
    if (!at(t, n)) return d;
    function l() {
      f.forEach(function (t) {
        return t();
      }),
        (f = []);
    }
    return (
      d.setOptions(r).then(function (t) {
        !c && r.onFirstUpdate && r.onFirstUpdate(t);
      }),
      d
    );
  };
}
var ct = ft({
  defaultModifiers: [
    {
      name: 'eventListeners',
      enabled: !0,
      phase: 'write',
      fn: function () {},
      effect: function (t) {
        var n = t.state,
          e = t.instance,
          r = t.options,
          o = r.scroll,
          i = void 0 === o || o,
          u = r.resize,
          a = void 0 === u || u,
          f = v(n.elements.popper),
          c = [].concat(n.scrollParents.reference, n.scrollParents.popper);
        return (
          i &&
            c.forEach(function (t) {
              t.addEventListener('scroll', e.update, D);
            }),
          a && f.addEventListener('resize', e.update, D),
          function () {
            i &&
              c.forEach(function (t) {
                t.removeEventListener('scroll', e.update, D);
              }),
              a && f.removeEventListener('resize', e.update, D);
          }
        );
      },
      data: {},
    },
    {
      name: 'popperOffsets',
      enabled: !0,
      phase: 'read',
      fn: function (t) {
        var n = t.state;
        n.modifiersData[t.name] = Z({
          reference: n.rects.reference,
          element: n.rects.popper,
          strategy: 'absolute',
          placement: n.placement,
        });
      },
      data: {},
    },
    {
      name: 'computeStyles',
      enabled: !0,
      phase: 'beforeWrite',
      fn: function (t) {
        var n = t.state,
          e = t.options,
          r = e.gpuAcceleration,
          o = void 0 === r || r,
          i = e.adaptive,
          u = void 0 === i || i,
          a = e.roundOffsets,
          f = void 0 === a || a,
          c = {
            placement: m(n.placement),
            variation: I(n.placement),
            popper: n.elements.popper,
            popperRect: n.rects.popper,
            gpuAcceleration: o,
            isFixed: 'fixed' === n.options.strategy,
          };
        null != n.modifiersData.popperOffsets &&
          (n.styles.popper = Object.assign(
            {},
            n.styles.popper,
            C(
              Object.assign({}, c, {
                offsets: n.modifiersData.popperOffsets,
                position: n.options.strategy,
                adaptive: u,
                roundOffsets: f,
              }),
            ),
          )),
          null != n.modifiersData.arrow &&
            (n.styles.arrow = Object.assign(
              {},
              n.styles.arrow,
              C(
                Object.assign({}, c, {
                  offsets: n.modifiersData.arrow,
                  position: 'absolute',
                  adaptive: !1,
                  roundOffsets: f,
                }),
              ),
            )),
          (n.attributes.popper = Object.assign({}, n.attributes.popper, { 'data-popper-placement': n.placement }));
      },
      data: {},
    },
    {
      name: 'applyStyles',
      enabled: !0,
      phase: 'write',
      fn: function (t) {
        var n = t.state;
        Object.keys(n.elements).forEach(function (t) {
          var e = n.styles[t] || {},
            r = n.attributes[t] || {},
            o = n.elements[t];
          h(o) &&
            s(o) &&
            (Object.assign(o.style, e),
            Object.keys(r).forEach(function (t) {
              var n = r[t];
              !1 === n ? o.removeAttribute(t) : o.setAttribute(t, !0 === n ? '' : n);
            }));
        });
      },
      effect: function (t) {
        var n = t.state,
          e = {
            popper: { position: n.options.strategy, left: '0', top: '0', margin: '0' },
            arrow: { position: 'absolute' },
            reference: {},
          };
        return (
          Object.assign(n.elements.popper.style, e.popper),
          (n.styles = e),
          n.elements.arrow && Object.assign(n.elements.arrow.style, e.arrow),
          function () {
            Object.keys(n.elements).forEach(function (t) {
              var r = n.elements[t],
                o = n.attributes[t] || {},
                i = Object.keys(n.styles.hasOwnProperty(t) ? n.styles[t] : e[t]).reduce(function (t, n) {
                  return (t[n] = ''), t;
                }, {});
              h(r) &&
                s(r) &&
                (Object.assign(r.style, i),
                Object.keys(o).forEach(function (t) {
                  r.removeAttribute(t);
                }));
            });
          }
        );
      },
      requires: ['computeStyles'],
    },
    {
      name: 'offset',
      enabled: !0,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: function (n) {
        var o = n.state,
          i = n.name,
          u = n.options.offset,
          a = void 0 === u ? [0, 0] : u,
          f = l.reduce(function (n, i) {
            return (
              (n[i] = (function (n, o, i) {
                var u = m(n),
                  a = [r, t].indexOf(u) >= 0 ? -1 : 1,
                  f = 'function' == typeof i ? i(Object.assign({}, o, { placement: n })) : i,
                  c = f[0],
                  d = f[1];
                return (c = c || 0), (d = (d || 0) * a), [r, e].indexOf(u) >= 0 ? { x: d, y: c } : { x: c, y: d };
              })(i, o.rects, a)),
              n
            );
          }, {}),
          c = f[o.placement],
          d = c.y;
        null != o.modifiersData.popperOffsets &&
          ((o.modifiersData.popperOffsets.x += c.x), (o.modifiersData.popperOffsets.y += d)),
          (o.modifiersData[i] = f);
      },
    },
    nt,
    {
      name: 'preventOverflow',
      enabled: !0,
      phase: 'main',
      fn: function (o) {
        var i = o.state,
          a = o.options,
          f = o.name,
          c = a.mainAxis,
          d = void 0 === c || c,
          l = a.altAxis,
          p = void 0 !== l && l,
          s = a.tether,
          v = void 0 === s || s,
          b = a.tetherOffset,
          h = void 0 === b ? 0 : b,
          y = $(i, {
            boundary: a.boundary,
            rootBoundary: a.rootBoundary,
            padding: a.padding,
            altBoundary: a.altBoundary,
          }),
          O = m(i.placement),
          g = I(i.placement),
          j = !g,
          M = W(O),
          A = 'x' === M ? 'y' : 'x',
          E = i.modifiersData.popperOffsets,
          q = i.rects.reference,
          B = i.rects.popper,
          P = 'function' == typeof h ? h(Object.assign({}, i.rects, { placement: i.placement })) : h,
          R = 'number' == typeof P ? { mainAxis: P, altAxis: P } : Object.assign({ mainAxis: 0, altAxis: 0 }, P),
          T = i.modifiersData.offset ? i.modifiersData.offset[i.placement] : null,
          H = { x: 0, y: 0 };
        if (E) {
          if (d) {
            var z,
              C = 'y' === M ? t : r,
              D = 'y' === M ? n : e,
              F = 'y' === M ? 'height' : 'width',
              U = E[M],
              V = U + y[C],
              _ = U - y[D],
              G = v ? -B[F] / 2 : 0,
              J = g === u ? q[F] : B[F],
              K = g === u ? -B[F] : -q[F],
              N = i.elements.arrow,
              Q = v && N ? k(N) : { width: 0, height: 0 },
              X = i.modifiersData['arrow#persistent']
                ? i.modifiersData['arrow#persistent'].padding
                : { top: 0, right: 0, bottom: 0, left: 0 },
              Y = X[C],
              Z = X[D],
              tt = L(0, q[F], Q[F]),
              nt = j ? q[F] / 2 - G - tt - Y - R.mainAxis : J - tt - Y - R.mainAxis,
              et = j ? -q[F] / 2 + G + tt + Z + R.mainAxis : K + tt + Z + R.mainAxis,
              rt = i.elements.arrow && S(i.elements.arrow),
              ot = null != (z = null == T ? void 0 : T[M]) ? z : 0,
              it = U + et - ot,
              ut = L(
                v ? w(V, U + nt - ot - (rt ? ('y' === M ? rt.clientTop || 0 : rt.clientLeft || 0) : 0)) : V,
                U,
                v ? x(_, it) : _,
              );
            (E[M] = ut), (H[M] = ut - U);
          }
          if (p) {
            var at,
              ft = E[A],
              ct = 'y' === A ? 'height' : 'width',
              dt = ft + y['x' === M ? t : r],
              lt = ft - y['x' === M ? n : e],
              pt = -1 !== [t, r].indexOf(O),
              st = null != (at = null == T ? void 0 : T[A]) ? at : 0,
              vt = pt ? dt : ft - q[ct] - B[ct] - st + R.altAxis,
              bt = pt ? ft + q[ct] + B[ct] - st - R.altAxis : lt,
              ht =
                v && pt
                  ? (function (t, n, e) {
                      var r = L(t, n, e);
                      return r > e ? e : r;
                    })(vt, ft, bt)
                  : L(v ? vt : dt, ft, v ? bt : lt);
            (E[A] = ht), (H[A] = ht - ft);
          }
          i.modifiersData[f] = H;
        }
      },
      requiresIfExists: ['offset'],
    },
    {
      name: 'arrow',
      enabled: !0,
      phase: 'main',
      fn: function (o) {
        var u,
          a = o.state,
          f = o.name,
          c = o.options,
          d = a.elements.arrow,
          l = a.modifiersData.popperOffsets,
          p = m(a.placement),
          s = W(p),
          v = [r, e].indexOf(p) >= 0 ? 'height' : 'width';
        if (d && l) {
          var b = (function (t, n) {
              return T(
                'number' !=
                  typeof (t = 'function' == typeof t ? t(Object.assign({}, n.rects, { placement: n.placement })) : t)
                  ? t
                  : H(t, i),
              );
            })(c.padding, a),
            h = k(d),
            y = 'y' === s ? t : r,
            x = 'y' === s ? n : e,
            w = a.rects.reference[v] + a.rects.reference[s] - l[s] - a.rects.popper[v],
            O = l[s] - a.rects.reference[s],
            g = S(d),
            j = g ? ('y' === s ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
            M = j / 2 - h[v] / 2 + (w / 2 - O / 2),
            A = L(b[y], M, j - h[v] - b[x]);
          a.modifiersData[f] = (((u = {})[s] = A), (u.centerOffset = A - M), u);
        }
      },
      effect: function (t) {
        var n = t.state,
          e = t.options.element,
          r = void 0 === e ? '[data-popper-arrow]' : e;
        null != r &&
          ('string' != typeof r || (r = n.elements.popper.querySelector(r))) &&
          A(n.elements.popper, r) &&
          (n.elements.arrow = r);
      },
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow'],
    },
    {
      name: 'hide',
      enabled: !0,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: function (t) {
        var n = t.state,
          e = t.name,
          r = n.rects.reference,
          o = n.rects.popper,
          i = n.modifiersData.preventOverflow,
          u = $(n, { elementContext: 'reference' }),
          a = $(n, { altBoundary: !0 }),
          f = et(u, r),
          c = et(a, o, i),
          d = rt(f),
          l = rt(c);
        (n.modifiersData[e] = {
          referenceClippingOffsets: f,
          popperEscapeOffsets: c,
          isReferenceHidden: d,
          hasPopperEscaped: l,
        }),
          (n.attributes.popper = Object.assign({}, n.attributes.popper, {
            'data-popper-reference-hidden': d,
            'data-popper-escaped': l,
          }));
      },
    },
  ],
});
export { ct as c };

let e,
  t,
  n,
  l = !1,
  o = !1,
  s = !1,
  i = !1,
  c = !1;
const r = e => {
    const t = new URL(e, he.t);
    return t.origin !== $e.location.origin ? t.href : t.pathname;
  },
  f = {},
  a = e => 'object' == (e = typeof e) || 'function' === e;
function u(e) {
  var t, n, l;
  return null !==
    (l =
      null === (n = null === (t = e.head) || void 0 === t ? void 0 : t.querySelector('meta[name="csp-nonce"]')) ||
      void 0 === n
        ? void 0
        : n.getAttribute('content')) && void 0 !== l
    ? l
    : void 0;
}
const d = (e, t, ...n) => {
    let l = null,
      o = null,
      s = null,
      i = !1,
      c = !1;
    const r = [],
      f = t => {
        for (let n = 0; n < t.length; n++)
          (l = t[n]),
            Array.isArray(l)
              ? f(l)
              : null != l &&
                'boolean' != typeof l &&
                ((i = 'function' != typeof e && !a(l)) && (l += ''),
                i && c ? (r[r.length - 1].l += l) : r.push(i ? p(null, l) : l),
                (c = i));
      };
    if ((f(n), t)) {
      t.key && (o = t.key), t.name && (s = t.name);
      {
        const e = t.className || t.class;
        e &&
          (t.class =
            'object' != typeof e
              ? e
              : Object.keys(e)
                  .filter(t => e[t])
                  .join(' '));
      }
    }
    if ('function' == typeof e) return e(null === t ? {} : t, r, m);
    const u = p(e, null);
    return (u.o = t), r.length > 0 && (u.i = r), (u.u = o), (u.p = s), u;
  },
  p = (e, t) => ({ $: 0, m: e, l: t, h: null, i: null, o: null, u: null, p: null }),
  $ = {},
  m = { forEach: (e, t) => e.map(h).forEach(t), map: (e, t) => e.map(h).map(t).map(y) },
  h = e => ({ vattrs: e.o, vchildren: e.i, vkey: e.u, vname: e.p, vtag: e.m, vtext: e.l }),
  y = e => {
    if ('function' == typeof e.vtag) {
      const t = Object.assign({}, e.vattrs);
      return e.vkey && (t.key = e.vkey), e.vname && (t.name = e.vname), d(e.vtag, t, ...(e.vchildren || []));
    }
    const t = p(e.vtag, e.vtext);
    return (t.o = e.vattrs), (t.i = e.vchildren), (t.u = e.vkey), (t.p = e.vname), t;
  },
  b = e => ie(e).v,
  v = (e, t, n) => {
    const l = b(e);
    return { emit: e => w(l, t, { bubbles: !!(4 & n), composed: !!(2 & n), cancelable: !!(1 & n), detail: e }) };
  },
  w = (e, t, n) => {
    const l = he.ce(t, n);
    return e.dispatchEvent(l), l;
  },
  g = new WeakMap(),
  k = e => 'sc-' + e.g,
  j = (e, t, n, l, o, s) => {
    if (n !== l) {
      let i = fe(e, t),
        c = t.toLowerCase();
      if ('class' === t) {
        const t = e.classList,
          o = O(n),
          s = O(l);
        t.remove(...o.filter(e => e && !s.includes(e))), t.add(...s.filter(e => e && !o.includes(e)));
      } else if ('style' === t) {
        for (const t in n) (l && null != l[t]) || (t.includes('-') ? e.style.removeProperty(t) : (e.style[t] = ''));
        for (const t in l)
          (n && l[t] === n[t]) || (t.includes('-') ? e.style.setProperty(t, l[t]) : (e.style[t] = l[t]));
      } else if ('key' === t);
      else if ('ref' === t) l && l(e);
      else if (i || 'o' !== t[0] || 'n' !== t[1]) {
        const c = a(l);
        if ((i || (c && null !== l)) && !o)
          try {
            if (e.tagName.includes('-')) e[t] = l;
            else {
              const o = null == l ? '' : l;
              'list' === t ? (i = !1) : (null != n && e[t] == o) || (e[t] = o);
            }
          } catch (e) {}
        null == l || !1 === l
          ? (!1 === l && '' !== e.getAttribute(t)) || e.removeAttribute(t)
          : (!i || 4 & s || o) && !c && e.setAttribute(t, (l = !0 === l ? '' : l));
      } else
        (t = '-' === t[2] ? t.slice(3) : fe($e, c) ? c.slice(2) : c[2] + t.slice(3)),
          n && he.rel(e, t, n, !1),
          l && he.ael(e, t, l, !1);
    }
  },
  S = /\s/,
  O = e => (e ? e.split(S) : []),
  C = (e, t, n, l) => {
    const o = 11 === t.h.nodeType && t.h.host ? t.h.host : t.h,
      s = (e && e.o) || f,
      i = t.o || f;
    for (l in s) l in i || j(o, l, s[l], void 0, n, t.$);
    for (l in i) j(o, l, s[l], i[l], n, t.$);
  },
  M = (o, c, r, f) => {
    const a = c.i[r];
    let u,
      d,
      p,
      $ = 0;
    if ((l || ((s = !0), 'slot' === a.m && (e && f.classList.add(e + '-s'), (a.$ |= a.i ? 2 : 1))), null !== a.l))
      u = a.h = me.createTextNode(a.l);
    else if (1 & a.$) u = a.h = me.createTextNode('');
    else {
      if (
        (i || (i = 'svg' === a.m),
        (u = a.h =
          me.createElementNS(
            i ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml',
            2 & a.$ ? 'slot-fb' : a.m,
          )),
        i && 'foreignObject' === a.m && (i = !1),
        C(null, a, i),
        null != e && u['s-si'] !== e && u.classList.add((u['s-si'] = e)),
        a.i)
      )
        for ($ = 0; $ < a.i.length; ++$) (d = M(o, a, $, u)), d && u.appendChild(d);
      'svg' === a.m ? (i = !1) : 'foreignObject' === u.tagName && (i = !0);
    }
    return (
      (u['s-hn'] = n),
      3 & a.$ &&
        ((u['s-sr'] = !0),
        (u['s-cr'] = t),
        (u['s-sn'] = a.p || ''),
        (p = o && o.i && o.i[r]),
        p && p.m === a.m && o.h && R(o.h, !1)),
      u
    );
  },
  R = (e, t) => {
    he.$ |= 1;
    const l = e.childNodes;
    for (let e = l.length - 1; e >= 0; e--) {
      const o = l[e];
      o['s-hn'] !== n && o['s-ol'] && (E(o).insertBefore(o, T(o)), o['s-ol'].remove(), (o['s-ol'] = void 0), (s = !0)),
        t && R(o, t);
    }
    he.$ &= -2;
  },
  x = (e, t, l, o, s, i) => {
    let c,
      r = (e['s-cr'] && e['s-cr'].parentNode) || e;
    for (r.shadowRoot && r.tagName === n && (r = r.shadowRoot); s <= i; ++s)
      o[s] && ((c = M(null, l, s, e)), c && ((o[s].h = c), r.insertBefore(c, T(t))));
  },
  L = (e, t, n, l, s) => {
    for (; t <= n; ++t)
      (l = e[t]) && ((s = l.h), A(l), (o = !0), s['s-ol'] ? s['s-ol'].remove() : R(s, !0), s.remove());
  },
  P = (e, t) => e.m === t.m && ('slot' === e.m ? e.p === t.p : e.u === t.u),
  T = e => (e && e['s-ol']) || e,
  E = e => (e['s-ol'] ? e['s-ol'] : e).parentNode,
  N = (e, t) => {
    const n = (t.h = e.h),
      l = e.i,
      o = t.i,
      s = t.m,
      c = t.l;
    let r;
    null === c
      ? ((i = 'svg' === s || ('foreignObject' !== s && i)),
        'slot' === s || C(e, t, i),
        null !== l && null !== o
          ? ((e, t, n, l) => {
              let o,
                s,
                i = 0,
                c = 0,
                r = 0,
                f = 0,
                a = t.length - 1,
                u = t[0],
                d = t[a],
                p = l.length - 1,
                $ = l[0],
                m = l[p];
              for (; i <= a && c <= p; )
                if (null == u) u = t[++i];
                else if (null == d) d = t[--a];
                else if (null == $) $ = l[++c];
                else if (null == m) m = l[--p];
                else if (P(u, $)) N(u, $), (u = t[++i]), ($ = l[++c]);
                else if (P(d, m)) N(d, m), (d = t[--a]), (m = l[--p]);
                else if (P(u, m))
                  ('slot' !== u.m && 'slot' !== m.m) || R(u.h.parentNode, !1),
                    N(u, m),
                    e.insertBefore(u.h, d.h.nextSibling),
                    (u = t[++i]),
                    (m = l[--p]);
                else if (P(d, $))
                  ('slot' !== u.m && 'slot' !== m.m) || R(d.h.parentNode, !1),
                    N(d, $),
                    e.insertBefore(d.h, u.h),
                    (d = t[--a]),
                    ($ = l[++c]);
                else {
                  for (r = -1, f = i; f <= a; ++f)
                    if (t[f] && null !== t[f].u && t[f].u === $.u) {
                      r = f;
                      break;
                    }
                  r >= 0
                    ? ((s = t[r]),
                      s.m !== $.m ? (o = M(t && t[c], n, r, e)) : (N(s, $), (t[r] = void 0), (o = s.h)),
                      ($ = l[++c]))
                    : ((o = M(t && t[c], n, c, e)), ($ = l[++c])),
                    o && E(u.h).insertBefore(o, T(u.h));
                }
              i > a ? x(e, null == l[p + 1] ? null : l[p + 1].h, n, l, c, p) : c > p && L(t, i, a);
            })(n, l, t, o)
          : null !== o
          ? (null !== e.l && (n.textContent = ''), x(n, null, t, o, 0, o.length - 1))
          : null !== l && L(l, 0, l.length - 1),
        i && 'svg' === s && (i = !1))
      : (r = n['s-cr'])
      ? (r.parentNode.textContent = c)
      : e.l !== c && (n.data = c);
  },
  U = e => {
    const t = e.childNodes;
    let n, l, o, s, i, c;
    for (l = 0, o = t.length; l < o; l++)
      if (((n = t[l]), 1 === n.nodeType)) {
        if (n['s-sr'])
          for (i = n['s-sn'], n.hidden = !1, s = 0; s < o; s++)
            if (((c = t[s].nodeType), t[s]['s-hn'] !== n['s-hn'] || '' !== i)) {
              if (1 === c && i === t[s].getAttribute('slot')) {
                n.hidden = !0;
                break;
              }
            } else if (1 === c || (3 === c && '' !== t[s].textContent.trim())) {
              n.hidden = !0;
              break;
            }
        U(n);
      }
  },
  W = [],
  D = e => {
    let t,
      n,
      l,
      s,
      i,
      c,
      r = 0;
    const f = e.childNodes,
      a = f.length;
    for (; r < a; r++) {
      if (((t = f[r]), t['s-sr'] && (n = t['s-cr']) && n.parentNode))
        for (l = n.parentNode.childNodes, s = t['s-sn'], c = l.length - 1; c >= 0; c--)
          (n = l[c]),
            n['s-cn'] ||
              n['s-nr'] ||
              n['s-hn'] === t['s-hn'] ||
              (F(n, s)
                ? ((i = W.find(e => e.k === n)),
                  (o = !0),
                  (n['s-sn'] = n['s-sn'] || s),
                  i ? (i.j = t) : W.push({ j: t, k: n }),
                  n['s-sr'] &&
                    W.map(e => {
                      F(e.k, n['s-sn']) && ((i = W.find(e => e.k === n)), i && !e.j && (e.j = i.j));
                    }))
                : W.some(e => e.k === n) || W.push({ k: n }));
      1 === t.nodeType && D(t);
    }
  },
  F = (e, t) =>
    1 === e.nodeType
      ? (null === e.getAttribute('slot') && '' === t) || e.getAttribute('slot') === t
      : e['s-sn'] === t || '' === t,
  A = e => {
    e.o && e.o.ref && e.o.ref(null), e.i && e.i.map(A);
  },
  H = (e, t) => {
    t && !e.S && t['s-p'] && t['s-p'].push(new Promise(t => (e.S = t)));
  },
  q = (e, t) => {
    if (((e.$ |= 16), !(4 & e.$))) return H(e, e.O), Ce(() => V(e, t));
    e.$ |= 512;
  },
  V = (e, t) => {
    const n = e.C;
    let l;
    return (
      t && ((e.$ |= 256), e.M && (e.M.map(([e, t]) => J(n, e, t)), (e.M = null)), (l = J(n, 'componentWillLoad'))),
      (l = K(l, () => J(n, 'componentWillRender'))),
      K(l, () => _(e, n, t))
    );
  },
  _ = async (e, t, n) => {
    const l = e.v,
      o = l['s-rc'];
    n &&
      (e => {
        const t = e.R,
          n = e.v,
          l = t.$,
          o = ((e, t) => {
            var n;
            let l = k(t);
            const o = pe.get(l);
            if (((e = 11 === e.nodeType ? e : me), o))
              if ('string' == typeof o) {
                let t,
                  s = g.get((e = e.head || e));
                if ((s || g.set(e, (s = new Set())), !s.has(l))) {
                  {
                    (t = me.createElement('style')), (t.innerHTML = o);
                    const l = null !== (n = he.L) && void 0 !== n ? n : u(me);
                    null != l && t.setAttribute('nonce', l), e.insertBefore(t, e.querySelector('link'));
                  }
                  s && s.add(l);
                }
              } else e.adoptedStyleSheets.includes(o) || (e.adoptedStyleSheets = [...e.adoptedStyleSheets, o]);
            return l;
          })(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t);
        10 & l && ((n['s-sc'] = o), n.classList.add(o + '-h'));
      })(e);
    z(e, t), o && (o.map(e => e()), (l['s-rc'] = void 0));
    {
      const t = l['s-p'],
        n = () => B(e);
      0 === t.length ? n() : (Promise.all(t).then(n), (e.$ |= 4), (t.length = 0));
    }
  },
  z = (i, c) => {
    try {
      (c = c.render()),
        (i.$ &= -17),
        (i.$ |= 2),
        ((i, c) => {
          const r = i.v,
            f = i.R,
            a = i.P || p(null, null),
            u = (e => e && e.m === $)(c) ? c : d(null, null, c);
          if (
            ((n = r.tagName),
            f.T && ((u.o = u.o || {}), f.T.map(([e, t]) => (u.o[t] = r[e]))),
            (u.m = null),
            (u.$ |= 4),
            (i.P = u),
            (u.h = a.h = r.shadowRoot || r),
            (e = r['s-sc']),
            (t = r['s-cr']),
            (l = 0 != (1 & f.$)),
            (o = !1),
            N(a, u),
            (he.$ |= 1),
            s)
          ) {
            let e, t, n, l, o, s;
            D(u.h);
            let i = 0;
            for (; i < W.length; i++)
              (e = W[i]),
                (t = e.k),
                t['s-ol'] ||
                  ((n = me.createTextNode('')), (n['s-nr'] = t), t.parentNode.insertBefore((t['s-ol'] = n), t));
            for (i = 0; i < W.length; i++)
              if (((e = W[i]), (t = e.k), e.j)) {
                for (l = e.j.parentNode, o = e.j.nextSibling, n = t['s-ol']; (n = n.previousSibling); )
                  if (
                    ((s = n['s-nr']),
                    s && s['s-sn'] === t['s-sn'] && l === s.parentNode && ((s = s.nextSibling), !s || !s['s-nr']))
                  ) {
                    o = s;
                    break;
                  }
                ((!o && l !== t.parentNode) || t.nextSibling !== o) &&
                  t !== o &&
                  (!t['s-hn'] && t['s-ol'] && (t['s-hn'] = t['s-ol'].parentNode.nodeName), l.insertBefore(t, o));
              } else 1 === t.nodeType && (t.hidden = !0);
          }
          o && U(u.h), (he.$ &= -2), (W.length = 0);
        })(i, c);
    } catch (e) {
      ae(e, i.v);
    }
    return null;
  },
  B = e => {
    const t = e.v,
      n = e.C,
      l = e.O;
    J(n, 'componentDidRender'),
      64 & e.$ ? J(n, 'componentDidUpdate') : ((e.$ |= 64), Q(t), J(n, 'componentDidLoad'), e.N(t), l || I()),
      e.U(t),
      e.S && (e.S(), (e.S = void 0)),
      512 & e.$ && Se(() => q(e, !1)),
      (e.$ &= -517);
  },
  G = e => {
    {
      const t = ie(e),
        n = t.v.isConnected;
      return n && 2 == (18 & t.$) && q(t, !1), n;
    }
  },
  I = () => {
    Q(me.documentElement), Se(() => w($e, 'appload', { detail: { namespace: 'genesys-webcomponents' } }));
  },
  J = (e, t, n) => {
    if (e && e[t])
      try {
        return e[t](n);
      } catch (e) {
        ae(e);
      }
  },
  K = (e, t) => (e && e.then ? e.then(t) : t()),
  Q = e => e.setAttribute('hydrated', ''),
  X = (e, t, n) => {
    if (t.W) {
      e.watchers && (t.D = e.watchers);
      const l = Object.entries(t.W),
        o = e.prototype;
      if (
        (l.map(([e, [l]]) => {
          31 & l || (2 & n && 32 & l)
            ? Object.defineProperty(o, e, {
                get() {
                  return ((e, t) => ie(this).F.get(t))(0, e);
                },
                set(n) {
                  ((e, t, n, l) => {
                    const o = ie(e),
                      s = o.v,
                      i = o.F.get(t),
                      c = o.$,
                      r = o.C;
                    if (
                      ((n = ((e, t) =>
                        null == e || a(e)
                          ? e
                          : 4 & t
                          ? 'false' !== e && ('' === e || !!e)
                          : 2 & t
                          ? parseFloat(e)
                          : 1 & t
                          ? e + ''
                          : e)(n, l.W[t][0])),
                      (!(8 & c) || void 0 === i) &&
                        n !== i &&
                        (!Number.isNaN(i) || !Number.isNaN(n)) &&
                        (o.F.set(t, n), r))
                    ) {
                      if (l.D && 128 & c) {
                        const e = l.D[t];
                        e &&
                          e.map(e => {
                            try {
                              r[e](n, i, t);
                            } catch (e) {
                              ae(e, s);
                            }
                          });
                      }
                      2 == (18 & c) && q(o, !1);
                    }
                  })(this, e, n, t);
                },
                configurable: !0,
                enumerable: !0,
              })
            : 1 & n &&
              64 & l &&
              Object.defineProperty(o, e, {
                value(...t) {
                  const n = ie(this);
                  return n.A.then(() => n.C[e](...t));
                },
              });
        }),
        1 & n)
      ) {
        const n = new Map();
        (o.attributeChangedCallback = function (e, t, l) {
          he.jmp(() => {
            const t = n.get(e);
            if (this.hasOwnProperty(t)) (l = this[t]), delete this[t];
            else if (o.hasOwnProperty(t) && 'number' == typeof this[t] && this[t] == l) return;
            this[t] = (null !== l || 'boolean' != typeof this[t]) && l;
          });
        }),
          (e.observedAttributes = l
            .filter(([e, t]) => 15 & t[0])
            .map(([e, l]) => {
              const o = l[1] || e;
              return n.set(o, e), 512 & l[0] && t.T.push([e, o]), o;
            }));
      }
    }
    return e;
  },
  Y = e => {
    J(e, 'connectedCallback');
  },
  Z = (e, t = {}) => {
    var n;
    const l = [],
      o = t.exclude || [],
      s = $e.customElements,
      i = me.head,
      c = i.querySelector('meta[charset]'),
      r = me.createElement('style'),
      f = [];
    let a,
      d = !0;
    Object.assign(he, t),
      (he.t = new URL(t.resourcesUrl || './', me.baseURI).href),
      e.map(e => {
        e[1].map(t => {
          const n = { $: t[0], g: t[1], W: t[2], H: t[3] };
          (n.W = t[2]), (n.H = t[3]), (n.T = []), (n.D = {});
          const i = n.g,
            c = class extends HTMLElement {
              constructor(e) {
                super(e), re((e = this), n), 1 & n.$ && e.attachShadow({ mode: 'open', delegatesFocus: !!(16 & n.$) });
              }
              connectedCallback() {
                a && (clearTimeout(a), (a = null)),
                  d
                    ? f.push(this)
                    : he.jmp(() =>
                        (e => {
                          if (0 == (1 & he.$)) {
                            const t = ie(e),
                              n = t.R,
                              l = () => {};
                            if (1 & t.$) ee(e, t, n.H), Y(t.C);
                            else {
                              (t.$ |= 1),
                                12 & n.$ &&
                                  (e => {
                                    const t = (e['s-cr'] = me.createComment(''));
                                    (t['s-cn'] = !0), e.insertBefore(t, e.firstChild);
                                  })(e);
                              {
                                let n = e;
                                for (; (n = n.parentNode || n.host); )
                                  if (n['s-p']) {
                                    H(t, (t.O = n));
                                    break;
                                  }
                              }
                              n.W &&
                                Object.entries(n.W).map(([t, [n]]) => {
                                  if (31 & n && e.hasOwnProperty(t)) {
                                    const n = e[t];
                                    delete e[t], (e[t] = n);
                                  }
                                }),
                                (async (e, t, n, l, o) => {
                                  if (0 == (32 & t.$)) {
                                    {
                                      if (((t.$ |= 32), (o = de(n)).then)) {
                                        const e = () => {};
                                        (o = await o), e();
                                      }
                                      o.isProxied || ((n.D = o.watchers), X(o, n, 2), (o.isProxied = !0));
                                      const e = () => {};
                                      t.$ |= 8;
                                      try {
                                        new o(t);
                                      } catch (e) {
                                        ae(e);
                                      }
                                      (t.$ &= -9), (t.$ |= 128), e(), Y(t.C);
                                    }
                                    if (o.style) {
                                      let e = o.style;
                                      const t = k(n);
                                      if (!pe.has(t)) {
                                        const l = () => {};
                                        ((e, t, n) => {
                                          let l = pe.get(e);
                                          be && n
                                            ? ((l = l || new CSSStyleSheet()),
                                              'string' == typeof l ? (l = t) : l.replaceSync(t))
                                            : (l = t),
                                            pe.set(e, l);
                                        })(t, e, !!(1 & n.$)),
                                          l();
                                      }
                                    }
                                  }
                                  const s = t.O,
                                    i = () => q(t, !0);
                                  s && s['s-rc'] ? s['s-rc'].push(i) : i();
                                })(0, t, n);
                            }
                            l();
                          }
                        })(this),
                      );
              }
              disconnectedCallback() {
                he.jmp(() =>
                  (() => {
                    if (0 == (1 & he.$)) {
                      const e = ie(this),
                        t = e.C;
                      e.q && (e.q.map(e => e()), (e.q = void 0)), J(t, 'disconnectedCallback');
                    }
                  })(),
                );
              }
              componentOnReady() {
                return ie(this).V;
              }
            };
          (n._ = e[0]), o.includes(i) || s.get(i) || (l.push(i), s.define(i, X(c, n, 1)));
        });
      });
    {
      (r.innerHTML = l + '{visibility:hidden}[hydrated]{visibility:inherit}'), r.setAttribute('data-styles', '');
      const e = null !== (n = he.L) && void 0 !== n ? n : u(me);
      null != e && r.setAttribute('nonce', e), i.insertBefore(r, c ? c.nextSibling : i.firstChild);
    }
    (d = !1), f.length ? f.map(e => e.connectedCallback()) : he.jmp(() => (a = setTimeout(I, 30)));
  },
  ee = (e, t, n) => {
    n &&
      n.map(([n, l, o]) => {
        const s = ne(e, n),
          i = te(t, o),
          c = le(n);
        he.ael(s, l, i, c), (t.q = t.q || []).push(() => he.rel(s, l, i, c));
      });
  },
  te = (e, t) => n => {
    try {
      256 & e.$ ? e.C[t](n) : (e.M = e.M || []).push([t, n]);
    } catch (e) {
      ae(e);
    }
  },
  ne = (e, t) => (8 & t ? $e : e),
  le = e => 0 != (2 & e),
  oe = e => (he.L = e),
  se = new WeakMap(),
  ie = e => se.get(e),
  ce = (e, t) => se.set((t.C = e), t),
  re = (e, t) => {
    const n = { $: 0, v: e, R: t, F: new Map() };
    return (
      (n.A = new Promise(e => (n.U = e))),
      (n.V = new Promise(e => (n.N = e))),
      (e['s-p'] = []),
      (e['s-rc'] = []),
      ee(e, n, t.H),
      se.set(e, n)
    );
  },
  fe = (e, t) => t in e,
  ae = (e, t) => (0, console.error)(e, t),
  ue = new Map(),
  de = e => {
    const t = e.g.replace(/-/g, '_'),
      n = e._,
      l = ue.get(n);
    return l ? l[t] : import(`./${n}.entry.js`).then(e => (ue.set(n, e), e[t]), ae);
    /*!__STENCIL_STATIC_IMPORT_SWITCH__*/
  },
  pe = new Map(),
  $e = 'undefined' != typeof window ? window : {},
  me = $e.document || { head: {} },
  he = {
    $: 0,
    t: '',
    jmp: e => e(),
    raf: e => requestAnimationFrame(e),
    ael: (e, t, n, l) => e.addEventListener(t, n, l),
    rel: (e, t, n, l) => e.removeEventListener(t, n, l),
    ce: (e, t) => new CustomEvent(e, t),
  },
  ye = e => Promise.resolve(e),
  be = (() => {
    try {
      return new CSSStyleSheet(), 'function' == typeof new CSSStyleSheet().replaceSync;
    } catch (e) {}
    return !1;
  })(),
  ve = [],
  we = [],
  ge = (e, t) => n => {
    e.push(n), c || ((c = !0), t && 4 & he.$ ? Se(je) : he.raf(je));
  },
  ke = e => {
    for (let t = 0; t < e.length; t++)
      try {
        e[t](performance.now());
      } catch (e) {
        ae(e);
      }
    e.length = 0;
  },
  je = () => {
    ke(ve), ke(we), (c = ve.length > 0) && he.raf(je);
  },
  Se = e => ye().then(e),
  Oe = ge(ve, !1),
  Ce = ge(we, !0);
export { $ as H, r as a, Z as b, v as c, Oe as d, G as f, b as g, d as h, ye as p, ce as r, oe as s, Ce as w };

function t(t) {
  const e = t.closest('fieldset');
  return t.disabled || (null == e ? void 0 : e.disabled);
}
function e(e, n) {
  const s = e.closest('fieldset'),
    i = new MutationObserver(s => {
      s.forEach(s => {
        'disabled' === s.attributeName && n(t(e));
      });
    });
  return i.observe(e, { attributes: !0 }), s && i.observe(s, { attributes: !0 }), i;
}
export { t as c, e as o };

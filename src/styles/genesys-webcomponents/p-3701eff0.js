function t(t, e) {
  const r = new MutationObserver(r => {
    r.forEach(() => {
      e(t.hidden);
    });
  });
  return r.observe(t, { attributes: !0, attributeFilter: ['hidden'] }), r;
}
function e(t, e) {
  const r = new MutationObserver(r => {
    r.forEach(r => {
      'disabled' === r.attributeName && e(t.disabled);
    });
  });
  return r.observe(t, { attributes: !0 }), r;
}
function r(t, e) {
  const r = new MutationObserver(r => {
    r.forEach(r => {
      'required' === r.attributeName && e(t.required);
    });
  });
  return r.observe(t, { attributes: !0 }), r;
}
export { e as a, t as b, r as o };

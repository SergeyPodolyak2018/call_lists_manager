function t(t, e, r = {}) {
  const n = new MutationObserver(e);
  return n.observe(t, Object.assign({ attributes: !0, childList: !0, subtree: !0 }, r)), n;
}
export { t as o };

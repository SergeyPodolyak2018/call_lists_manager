function n(n, t = this) {
  return (function t(r) {
    if (!r || r === document || r === window) return null;
    r.assignedSlot && (r = r.assignedSlot);
    return r.closest(n) || t(r.getRootNode().host);
  })(t);
}
export { n as g };

function o(o, n) {
  let e,
    l = null,
    r = o.getRootNode();
  for (; r && r !== l && !e; ) {
    const o =
      (t = r).nodeType === Node.DOCUMENT_NODE || t.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? t : t.ownerDocument;
    (e = null == o ? void 0 : o.getElementById(n)), (l = r), (r = r.getRootNode());
  }
  var t;
  return e;
}
export { o as f };

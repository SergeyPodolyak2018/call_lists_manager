function n(n, r) {
  const t = r.currentTarget;
  let e = r.target;
  for (; e !== t && null !== e; ) {
    if (e.matches(n)) return !0;
    e = e.parentElement;
  }
  return !1;
}
export { n as e };

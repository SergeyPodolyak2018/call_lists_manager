function n(n, r, t) {
  const l = r.currentTarget;
  let u = r.target;
  for (; u !== l && null !== u; ) {
    if (u.matches(n)) return t(u);
    u = u.parentElement;
  }
  return null;
}
export { n as w };

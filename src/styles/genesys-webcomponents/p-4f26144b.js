function n(n) {
  const t = (n.getMonth() + 1).toString().padStart(2, '0'),
    r = n.getDate().toString().padStart(2, '0');
  return `${n.getFullYear()}-${t}-${r}`;
}
function t(t, r) {
  const [s, e] = [t, r].sort((n, t) => (n < t ? -1 : 1));
  return `${n(s)}/${n(e)}`;
}
function r(n) {
  const [t, r, s] = n.split('-'),
    e = parseInt(t, 10),
    a = parseInt(r, 10) - 1,
    c = parseInt(s, 10);
  return new Date(e, a, c);
}
function s(n) {
  const [t, s] = n.split('/');
  return [r(t), r(s)];
}
export { t as a, n as b, s as c, r as f };

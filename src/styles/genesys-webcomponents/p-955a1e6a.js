function n(n, t) {
  return `${n}-${t}`;
}
function t(n) {
  const [t, r] = n.split('-');
  return { year: t, month: r };
}
function r() {
  const t = new Date();
  return n(t.getFullYear().toString(), (t.getMonth() + 1).toString().padStart(2, '0'));
}
export { n as a, r as b, t as g };

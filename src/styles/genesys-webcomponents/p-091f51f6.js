function e(e) {
  requestAnimationFrame(() => requestAnimationFrame(e));
}
function t(e, t = 100) {
  return setTimeout(e, t);
}
export { t as a, e as b };

function a(a, t = -1 / 0, N = 1 / 0) {
  return isNaN(a) ? NaN : Math.min(Math.max(a, t), N);
}
export { a as c };

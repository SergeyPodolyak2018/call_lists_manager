const n = /[ +]/g,
  e = new Map(),
  t = new Map();
function r(t, r) {
  let u = e.get(t);
  return (
    u ||
      ((u = (function (e) {
        const t = e.split(n).map(i);
        if (1 === t.length) return new RegExp(t[0], 'i');
        let r = '(';
        return (
          t.forEach((n, e) => {
            (r += n + ').*'), e !== t.length - 1 && (r += '(');
          }),
          new RegExp(r + '$', 'i')
        );
      })(t)),
      e.set(t, u)),
    u.test(r)
  );
}
function u(e) {
  return e
    .split(n)
    .map(i)
    .map(n => {
      let e = t.get(n);
      return e || ((e = new RegExp(n, 'i')), t.set(n, e)), e;
    });
}
function i(n) {
  return n.replace(/[\^$*+?.(){}[\]\\]/g, '\\$&');
}
export { u as g, r as m };

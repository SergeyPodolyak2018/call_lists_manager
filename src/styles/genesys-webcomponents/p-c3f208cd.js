import { g as n } from './p-9031eb6a.js';
function t() {
  return (t, e) => {
    const { connectedCallback: i, disconnectedCallback: s } = t,
      c = new Map();
    (t.connectedCallback = function () {
      const t = new ResizeObserver(this[e].bind(this));
      return (
        (function (t, e, i) {
          t.has(e) && t.get(e).disconnect(), t.set(e, i), i.observe(n(e));
        })(c, this, t),
        i && i.call(this)
      );
    }),
      (t.disconnectedCallback = function () {
        return (
          (function (n, t) {
            n.has(t) && n.get(t).disconnect(), n.delete(t);
          })(c, this),
          s && s.call(this)
        );
      });
  };
}
export { t as O };

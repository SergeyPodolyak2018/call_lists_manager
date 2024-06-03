import { g as n } from './p-9031eb6a.js';
function t(t) {
  return (i, c) => {
    const { connectedCallback: e, disconnectedCallback: o } = i,
      s = new Map();
    (i.connectedCallback = function () {
      const i = new MutationObserver(this[c].bind(this));
      return (
        (function (t, i, c, e) {
          t.has(i) && t.get(i).disconnect(), t.set(i, c), c.observe(n(i), e);
        })(s, this, i, t),
        e && e.call(this)
      );
    }),
      (i.disconnectedCallback = function () {
        return (
          (function (n, t) {
            n.has(t) && n.get(t).disconnect(), n.delete(t);
          })(s, this),
          o && o.call(this)
        );
      });
  };
}
export { t as O };

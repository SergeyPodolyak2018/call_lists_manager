import { g as t } from './p-9031eb6a.js';
const n = { triggerEvents: 'click', exclude: '' };
function c(c = n) {
  return (o, r) => {
    const { connectedCallback: u, disconnectedCallback: s } = o;
    (o.connectedCallback = function () {
      return (
        (function (t, c, o, r = n) {
          const u = (function (t) {
            if (t.exclude)
              try {
                return Array.from(document.querySelectorAll(t.exclude));
              } catch (n) {
                console.warn(
                  `@OnClickOutside: Exclude: '${t.exclude}' will not be evaluated. Check your exclude selector syntax.`,
                  n,
                );
              }
          })(r);
          i(r).forEach(n => {
            window.addEventListener(
              n,
              n => {
                e(n, t, c, o, u);
              },
              !1,
            );
          });
        })(this, t(this), this[r], c),
        u && u.call(this)
      );
    }),
      (o.disconnectedCallback = function () {
        return (
          (function (t, c, o, r = n) {
            i(r).forEach(n => {
              window.removeEventListener(
                n,
                n => {
                  e(n, t, c, o);
                },
                !1,
              );
            });
          })(this, t(this), this[r], c),
          s && s.call(this)
        );
      });
  };
}
function e(t, n, c, e, i) {
  const o = t.composedPath();
  o.includes(c) ||
    (function (t, n) {
      return !(!t || !n) && n.some(n => t.includes(n));
    })(o, i) ||
    !c.isConnected ||
    e.call(n, t);
}
function i(t) {
  return t.triggerEvents ? t.triggerEvents.split(',').map(t => t.trim()) : ['click'];
}
export { c as O };

const e = '3.107.0',
  t = [
    (function (e) {
      const [t, n, ...o] = e.split('.');
      return {
        name: 'spark-library',
        metadata: { fullVersion: `${t}.${n}.${o.join('.')}`, majorVersion: t, minorVersion: `${t}.${n}` },
      };
    })(e),
  ];
function n() {
  const e = window.newrelic;
  if (e) {
    for (let o = 0; o < 20; o++) {
      if (0 == t.length) return void setTimeout(n, 3e4);
      const o = t.shift();
      e.addPageAction(o.name, Object.assign(Object.assign({}, o.metadata), { queueDepth: t.length }));
    }
    setTimeout(n, 3e4);
  }
}
let o = !1;
function i(i, r) {
  window.newrelic &&
    (o || ((o = !0), n()),
    document.contains(i) &&
      t.push({
        name: 'spark-component',
        metadata: Object.assign(Object.assign({}, r), { component: i.tagName.toLowerCase(), version: e }),
      }));
}
export { i as t };

const n = 250;
function o(n, o) {
  switch (n.key) {
    case 'ArrowUp':
      n.stopPropagation(),
        n.preventDefault(),
        (function (n) {
          const o = n.previousElementSibling;
          o ? o.guxFocus() : c(n);
        })(o);
      break;
    case 'ArrowDown':
      n.stopPropagation(),
        n.preventDefault(),
        (function (n) {
          const o = n.nextElementSibling;
          o ? o.guxFocus() : t(n);
        })(o);
      break;
    case 'ArrowRight':
    case 'ArrowLeft':
      n.preventDefault();
      break;
    case 'Home':
      n.stopPropagation(), n.preventDefault(), t(o);
      break;
    case 'End':
      n.stopPropagation(), n.preventDefault(), c(o);
  }
}
function t(n) {
  const o = (function (n) {
    let o = n;
    for (; null !== o.previousElementSibling; ) o = o.previousElementSibling;
    return o;
  })(n);
  o && o.guxFocus();
}
function c(n) {
  const o = (function (n) {
    let o = n;
    for (; null !== o.nextElementSibling; ) o = o.nextElementSibling;
    return o;
  })(n);
  o && o.guxFocus();
}
export { n as h, o as m };

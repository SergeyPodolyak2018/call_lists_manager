function n(n, e) {
  switch (e) {
    case 'change':
      return n.dispatchEvent(new InputEvent('change', { bubbles: !0 }));
    case 'input':
      return n.dispatchEvent(new InputEvent('input', { bubbles: !0 }));
  }
}
export { n as s };

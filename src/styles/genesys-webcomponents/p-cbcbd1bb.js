function r(r = 'gux') {
  return `${r}-${Math.random().toString(36).substr(2, 10)}`;
}
export { r };

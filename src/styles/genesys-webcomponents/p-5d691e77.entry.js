import { r, h as s, g as t } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
const a = class {
  constructor(s) {
    r(this, s), (this.screenreaderText = void 0);
  }
  componentWillLoad() {
    e(this.root);
  }
  render() {
    return s('gux-radial-loading', {
      class: 'gux-spinner',
      'screenreader-text': this.screenreaderText,
      context: 'full-page',
    });
  }
  get root() {
    return t(this);
  }
};
a.style = ':host{display:flex}.gux-spinner{margin:auto}';
export { a as gux_page_loading_spinner };

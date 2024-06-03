import { r as t, h as s, g as i } from './p-9031eb6a.js';
import { m as r, g as n } from './p-5ac4e2cf.js';
import { t as h } from './p-6a46bf1b.js';
const e = class {
  constructor(s) {
    t(this, s), (this.text = void 0), (this.highlight = void 0), (this.strategy = 'start');
  }
  componentWillLoad() {
    h(this.root);
  }
  render() {
    if (this.highlight && this.text)
      switch (this.strategy) {
        case 'start':
          return this.renderStartsWith();
        case 'contains':
          return this.renderContains();
        case 'fuzzy':
          return this.renderFuzzy();
      }
    return s('span', null, this.text);
  }
  renderStartsWith() {
    if (this.text.toLowerCase().startsWith(this.highlight.toLowerCase())) {
      const t = this.text.substring(0, this.highlight.length),
        i = this.text.substring(this.highlight.length);
      return s('span', null, s('mark', null, t), i);
    }
    return s('span', null, this.text);
  }
  renderContains() {
    const t = { highlighted: '', remaining: this.text };
    for (; t.remaining.toLowerCase().includes(this.highlight.toLowerCase()); ) {
      const s = t.remaining.toLowerCase().indexOf(this.highlight.toLowerCase()),
        i = t.remaining.substring(0, s),
        r = t.remaining.substring(s, s + this.highlight.length);
      (t.highlighted += i + `<mark>${r}</mark>`), (t.remaining = t.remaining.substring(s + r.length));
    }
    return s('span', { innerHTML: t.highlighted + t.remaining });
  }
  renderFuzzy() {
    if (r(this.highlight, this.text)) {
      const t = n(this.highlight).reduce(
        (t, s) => {
          const { 0: i, index: r, input: n } = t.remaining.match(s),
            h = n.substring(0, r);
          return { highlighted: `${t.highlighted + h}<mark>${i}</mark>`, remaining: n.substring(r + i.length) };
        },
        { highlighted: '', remaining: this.text },
      );
      return s('span', { innerHTML: t.highlighted + t.remaining });
    }
    return s('span', null, this.text);
  }
  get root() {
    return i(this);
  }
};
export { e as gux_text_highlight };

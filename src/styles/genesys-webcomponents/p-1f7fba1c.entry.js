import { r as e, h as t, g as i } from './p-9031eb6a.js';
import { O as r } from './p-f222d4b1.js';
import { r as n } from './p-cbcbd1bb.js';
import { a } from './p-d0805f56.js';
import { o as s } from './p-3701eff0.js';
import { p as o } from './p-c10e41a9.js';
import { t as l } from './p-6a46bf1b.js';
const u = class {
  constructor(t) {
    e(this, t),
      (this.errorId = n('gux-form-field-error')),
      (this.labelId = n('gux-form-field-label')),
      (this.defaultInputId = n('gux-form-field')),
      (this.clearable = void 0),
      (this.resize = void 0),
      (this.displayUnits = void 0),
      (this.valueInTooltip = void 0),
      (this.labelPosition = void 0),
      (this.slottedElementType = void 0),
      (this.computedLabelPosition = 'above'),
      (this.required = !0),
      (this.hasError = !1);
  }
  onMutation() {
    this.hasError = Boolean(this.root.querySelector('[slot="error"]'));
  }
  componentWillLoad() {
    (this.input = this.root.querySelector('input[slot="input"], select[slot="input"], textarea[slot="input"]')),
      (this.label = this.root.querySelector('label[slot="label"]')),
      (this.slottedElementType = this.input.tagName.toLowerCase()),
      (this.required = this.input.required),
      (this.requiredObserver = s(this.input, e => {
        this.required = e;
      })),
      o(this.input);
    const e = this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
    if ('input' === this.slottedElementType) {
      const t = this.input.getAttribute('type');
      l(this.root, { variant: `${this.slottedElementType}-${t}-${e}` });
    } else l(this.root, { variant: `${this.slottedElementType}-${e}` });
  }
  componentWillRender() {
    (this.computedLabelPosition = this.getComputedLabelPosition(this.label, this.labelPosition)),
      this.validateFormIds();
  }
  disconnectedCallback() {
    this.requiredObserver && this.requiredObserver.disconnect();
  }
  renderInputCheckbox(e) {
    return t(
      'div',
      null,
      t(
        'gux-input-checkbox',
        { class: { 'gux-input-error': e } },
        t('slot', { name: 'input' }),
        t('slot', { name: 'label' }),
      ),
      this.renderError(e),
    );
  }
  renderInputRadio() {
    return t('gux-input-radio', null, t('slot', { name: 'input' }), t('slot', { name: 'label' }));
  }
  renderInputColor(e) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t(
          'gux-input-color',
          {
            'gux-label-describedby': this.labelId,
            'gux-error-describedby': this.errorId,
            'gux-required': this.required,
            class: { 'gux-input-error': e },
          },
          t('slot', { name: 'input' }),
        ),
        this.renderError(e),
      ),
    );
  }
  renderInputRange(e, i) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t('gux-input-range', { 'display-units': e, 'value-in-tooltip': i }, t('slot', { name: 'input' })),
    );
  }
  renderInputNumber(e, i) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t(
          'gux-input-number',
          { class: { 'gux-input-error': i }, slot: 'input', clearable: e },
          t('slot', { name: 'input' }),
        ),
        this.renderError(i),
      ),
    );
  }
  renderInputSelect(e) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t('gux-input-select', { slot: 'input', class: { 'gux-input-error': e } }, t('slot', { name: 'input' })),
        this.renderError(e),
      ),
    );
  }
  renderInputTextLike(e, i) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t(
          'gux-input-text-like',
          { class: { 'gux-input-error': i }, slot: 'input', clearable: e },
          t('slot', { name: 'input' }),
        ),
        this.renderError(i),
      ),
    );
  }
  renderInputSearch(e) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t('gux-input-search', null, t('slot', { name: 'input' })),
        this.renderError(e),
      ),
    );
  }
  renderInputTextArea(e) {
    return t(
      'div',
      { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` },
      this.renderLabel(this.required),
      t(
        'div',
        { class: 'gux-input-and-error-container' },
        t(
          'gux-input-textarea',
          { class: { 'gux-input-error': e }, slot: 'input', resize: this.resize },
          t('slot', { name: 'input' }),
        ),
        this.renderError(e),
      ),
    );
  }
  render() {
    const e = this.input.getAttribute('type');
    switch (this.slottedElementType) {
      case 'input':
        switch (e) {
          case 'checkbox':
            return this.renderInputCheckbox(this.hasError);
          case 'radio':
            return this.renderInputRadio();
          case 'color':
            return this.renderInputColor(this.hasError);
          case 'range':
            return this.renderInputRange(this.displayUnits, this.valueInTooltip);
          case 'email':
          case 'password':
          case 'text':
            return this.renderInputTextLike(this.clearable, this.hasError);
          case 'number':
            return this.renderInputNumber(this.clearable, this.hasError);
          case 'search':
            return this.renderInputSearch(this.hasError);
          default:
            return t(
              'div',
              null,
              t('slot', { name: 'label' }),
              t('slot', { name: 'input' }),
              t('slot', { name: 'error' }),
            );
        }
      case 'select':
        return this.renderInputSelect(this.hasError);
      case 'textarea':
        return this.renderInputTextArea(this.hasError);
      default:
        return t('div', null, t('slot', { name: 'label' }), t('slot', { name: 'input' }), t('slot', { name: 'error' }));
    }
  }
  validateFormIds() {
    if (this.label) {
      if ('color' === this.input.getAttribute('type'))
        return (
          this.label.getAttribute('id') && (this.labelId = this.label.getAttribute('id')),
          void this.label.setAttribute('id', this.labelId)
        );
      const e = !!this.input.hasAttribute('id'),
        t = !!this.label.hasAttribute('for');
      if (!e && t)
        a(
          this.root,
          'A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.',
        );
      else if (e)
        if (e && !t) {
          const e = this.input.getAttribute('id');
          this.label.setAttribute('for', e);
        } else
          e &&
            t &&
            this.input.getAttribute('id') !== this.label.getAttribute('for') &&
            a(this.root, 'The input id and label for attribute should match.');
      else this.input.setAttribute('id', this.defaultInputId), this.label.setAttribute('for', this.defaultInputId);
    } else
      a(
        this.root,
        'A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.',
      );
    this.hasErrorSlot()
      ? this.input.setAttribute('aria-describedby', this.errorId)
      : this.input.getAttribute('aria-describedby') &&
        this.input.getAttribute('aria-describedby').startsWith('gux-form-field-error') &&
        this.input.removeAttribute('aria-describedby');
  }
  getComputedLabelPosition(e, t) {
    if (e)
      return ['above', 'beside', 'screenreader'].includes(t)
        ? t
        : e.offsetWidth > 1 && e.offsetWidth < 40
        ? 'beside'
        : 'above';
  }
  hasErrorSlot() {
    return !!this.root.querySelector('[slot="error"]');
  }
  renderLabel(e) {
    return t(
      'div',
      { class: { 'gux-label-container': !0, 'gux-required': e } },
      t('slot', { name: 'label', slot: 'label' }),
    );
  }
  renderError(e) {
    return t(
      'div',
      { id: this.errorId, class: { 'gux-error': !0, 'gux-show': e } },
      t('gux-error-message-beta', null, t('slot', { name: 'error' })),
    );
  }
  get root() {
    return i(this);
  }
};
(function (e, t, i, r) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, i)) : r;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, r);
  else for (var o = e.length - 1; o >= 0; o--) (n = e[o]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, i, s) : n(t, i)) || s);
  a > 3 && s && Object.defineProperty(t, i, s);
})([r({ childList: !0, subtree: !0 })], u.prototype, 'onMutation', null),
  (u.style =
    "gux-form-field-legacy{display:block;color:#2e394c}gux-form-field-legacy .gux-label-and-input-and-error-container{margin:16px 0}gux-form-field-legacy .gux-label-and-input-and-error-container label{font-size:12px;font-weight:bold;line-height:20px}gux-form-field-legacy .gux-label-and-input-and-error-container input,gux-form-field-legacy .gux-label-and-input-and-error-container select{width:100%;font-size:12px}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-container input{overflow:hidden;text-overflow:ellipsis}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-error .gux-input-container{border-color:#ea0b0b}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-error textarea{border-color:#ea0b0b}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-error .gux-input-color-main-element{border-color:#ea0b0b}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-and-error-container{flex-grow:1}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside{display:flex;flex-direction:row}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside .gux-label-container{position:relative;top:7px;width:fit-content;min-width:45px;margin-right:8px}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-range,gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-select,gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-text-like,gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-search{flex:1 1 auto}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-screenreader label{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}gux-form-field-legacy .gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}gux-form-field-legacy .gux-error{display:none;margin:4px 0}gux-form-field-legacy .gux-error.gux-show{display:block}");
export { u as gux_form_field_legacy };

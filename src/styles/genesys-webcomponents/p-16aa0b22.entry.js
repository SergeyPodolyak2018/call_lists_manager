import { r as s, c as t } from './p-9031eb6a.js';
const i = class {
  constructor(i) {
    s(this, i),
      (this.press = t(this, 'press', 7)),
      (this.text = ''),
      (this.details = ''),
      (this.common = !1),
      (this.recent = !1),
      (this.shortcut = '');
  }
  async invokePress() {
    this.press.emit();
  }
  render() {
    return '';
  }
};
export { i as gux_command_action };

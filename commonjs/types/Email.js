"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Email;
exports.isEmail = isEmail;
var _InvalidError = _interopRequireDefault(require("./InvalidError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Email(value) {
  if (typeof value === 'string') {
    if (isEmail(value)) {
      return value;
    }
    throw new _InvalidError["default"]('not_an_email');
  }
  throw new _InvalidError["default"]('not_a_string');
}
var regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
function isEmail(value) {
  return regexp.test(value);
}
//# sourceMappingURL=Email.js.map
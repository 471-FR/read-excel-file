"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Integer;
exports.isInteger = isInteger;
var _InvalidError = _interopRequireDefault(require("./InvalidError.js"));
var _Number = _interopRequireDefault(require("./Number.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Integer(value) {
  value = (0, _Number["default"])(value);
  if (!isInteger(value)) {
    throw new _InvalidError["default"]('not_an_integer');
  }
  return value;
}
function isInteger(x) {
  // https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  return (x | 0) === x;
}
//# sourceMappingURL=Integer.js.map
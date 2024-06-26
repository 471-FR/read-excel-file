"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BooleanType;
var _InvalidError = _interopRequireDefault(require("./InvalidError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function BooleanType(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  throw new _InvalidError["default"]('not_a_boolean');
}
//# sourceMappingURL=Boolean.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NumberType;
var _InvalidError = _interopRequireDefault(require("./InvalidError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function NumberType(value) {
  // An XLSX file editing software might not always correctly
  // detect numeric values in string-type cells. Users won't bother
  // manually selecting a cell type, so the editing software has to guess
  // based on the user's input. One can assume that such auto-detection
  // might not always work.
  //
  // So, if a cell is supposed to be a numeric one, convert a string value to a number.
  //
  if (typeof value === 'string') {
    var stringifiedValue = value;
    value = Number(value);
    if (String(value) !== stringifiedValue) {
      throw new _InvalidError["default"]('not_a_number');
    }
  }
  if (typeof value !== 'number') {
    throw new _InvalidError["default"]('not_a_number');
  }
  if (isNaN(value)) {
    throw new _InvalidError["default"]('invalid_number');
  }
  // At this point, `value` can only be a number.
  //
  // The global `isFinite()` function filters out:
  // * NaN
  // * -Infinity
  // * Infinity
  //
  // All other values pass (including non-numbers).
  //
  if (!isFinite(value)) {
    throw new _InvalidError["default"]('out_of_bounds');
  }
  return value;
}
//# sourceMappingURL=Number.js.map
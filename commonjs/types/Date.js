"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DateType;
var _parseDate = _interopRequireDefault(require("../read/parseDate.js"));
var _InvalidError = _interopRequireDefault(require("./InvalidError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function DateType(value, _ref) {
  var properties = _ref.properties;
  // XLSX has no specific format for dates.
  // Sometimes a date can be heuristically detected.
  // https://github.com/catamphetamine/read-excel-file/issues/3#issuecomment-395770777
  if (value instanceof Date) {
    if (isNaN(value.valueOf())) {
      throw new _InvalidError["default"]('out_of_bounds');
    }
    return value;
  }
  if (typeof value === 'number') {
    if (isNaN(value)) {
      throw new _InvalidError["default"]('invalid_number');
    }
    if (!isFinite(value)) {
      throw new _InvalidError["default"]('out_of_bounds');
    }
    var date = (0, _parseDate["default"])(value, properties);
    if (isNaN(date.valueOf())) {
      throw new _InvalidError["default"]('out_of_bounds');
    }
    return date;
  }
  throw new _InvalidError["default"]('not_a_date');
}
//# sourceMappingURL=Date.js.map
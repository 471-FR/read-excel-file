"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = readSheetNames;
var _readXlsxFileNode = _interopRequireDefault(require("./readXlsxFileNode.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Reads the list of sheet names in an XLSX file in Node.js.
 * @param  {(string|Stream|Buffer)} input - A Node.js readable stream or a `Buffer` or a path to a file.
 * @return {Promise} Resolves to an array of objects of shape `{ name: string }`.
 */
function readSheetNames(input) {
  return (0, _readXlsxFileNode["default"])(input, {
    getSheets: true
  }).then(function (sheets) {
    return sheets.map(function (sheet) {
      return sheet.name;
    });
  });
}
//# sourceMappingURL=readSheetNamesNode.js.map
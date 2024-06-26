"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = readSheetNames;
var _readXlsxFileWebWorker = _interopRequireDefault(require("./readXlsxFileWebWorker.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Reads the list of sheet names in an XLSX file in a Web Worker.
 * @param  {file} file - The file.
 * @return {Promise} Resolves to an array of objects of shape `{ name: string }`.
 */
function readSheetNames(file) {
  return (0, _readXlsxFileWebWorker["default"])(file, {
    getSheets: true
  }).then(function (sheets) {
    return sheets.map(function (sheet) {
      return sheet.name;
    });
  });
}
//# sourceMappingURL=readSheetNamesWebWorker.js.map
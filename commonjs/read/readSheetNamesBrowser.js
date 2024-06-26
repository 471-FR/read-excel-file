"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = readSheetNames;
var _readXlsxFileBrowser = _interopRequireDefault(require("./readXlsxFileBrowser.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Reads the list of sheet names in an XLSX file in a web browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @return {Promise} Resolves to an array of objects of shape `{ name: string }`.
 */
function readSheetNames(file) {
  return (0, _readXlsxFileBrowser["default"])(file, {
    getSheets: true
  }).then(function (sheets) {
    return sheets.map(function (sheet) {
      return sheet.name;
    });
  });
}
//# sourceMappingURL=readSheetNamesBrowser.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = readXlsxFile;
var _xml = _interopRequireDefault(require("../xml/xml.js"));
var _unpackXlsxFileBrowser = _interopRequireDefault(require("./unpackXlsxFileBrowser.js"));
var _readXlsxFileContents = _interopRequireDefault(require("./readXlsxFileContents.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Reads XLSX file into a 2D array of cells in a web worker.
 * @param  {file} file - The file.
 * @param  {object?} options
 * @param  {(number|string)?} options.sheet - Excel document sheet to read. Defaults to `1`. Will only read this sheet and skip others.
 * @return {Promise} Resolves to a 2D array of cells: an array of rows, each row being an array of cells.
 */
function readXlsxFile(file) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _unpackXlsxFileBrowser["default"])(file).then(function (entries) {
    return (0, _readXlsxFileContents["default"])(entries, _xml["default"], options);
  });
}
//# sourceMappingURL=readXlsxFileWebWorker.js.map
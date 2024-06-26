"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = readXlsxFile;
var _xml = _interopRequireDefault(require("../xml/xml.js"));
var _unpackXlsxFileNode = _interopRequireDefault(require("./unpackXlsxFileNode.js"));
var _readXlsxFileContents = _interopRequireDefault(require("./readXlsxFileContents.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Reads XLSX file into a 2D array of cells in a browser.
 * @param  {(string|Stream|Buffer)} input - A Node.js readable stream or a `Buffer` or a path to a file.
 * @param  {object?} options
 * @param  {(number|string)?} options.sheet - Excel document sheet to read. Defaults to `1`. Will only read this sheet and skip others.
 * @return {Promise} Resolves to a 2D array of cells: an array of rows, each row being an array of cells.
 */
function readXlsxFile(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _unpackXlsxFileNode["default"])(input).then(function (entries) {
    return (0, _readXlsxFileContents["default"])(entries, _xml["default"], options);
  });
}
//# sourceMappingURL=readXlsxFileNode.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseSheet;
var _parseCells = _interopRequireDefault(require("./parseCells.js"));
var _parseDimensions = _interopRequireDefault(require("./parseDimensions.js"));
var _coordinates = require("./coordinates.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function parseSheet(content, xml, values, styles, properties, options) {
  var sheet = xml.createDocument(content);
  var cells = (0, _parseCells["default"])(sheet, xml, values, styles, properties, options);

  // `dimensions` defines the spreadsheet area containing all non-empty cells.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sheetdimension?view=openxml-2.8.1
  var dimensions = (0, _parseDimensions["default"])(sheet) || (0, _coordinates.calculateDimensions)(cells);
  return {
    cells: cells,
    dimensions: dimensions
  };
}
//# sourceMappingURL=parseSheet.js.map
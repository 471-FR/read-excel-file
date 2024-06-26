"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCells;
var _parseCell = _interopRequireDefault(require("./parseCell.js"));
var _xlsx = require("../xml/xlsx.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function parseCells(sheet, xml, values, styles, properties, options) {
  var cells = (0, _xlsx.getCells)(sheet);
  if (cells.length === 0) {
    return [];
  }

  // const mergedCells = getMergedCells(sheet)
  // for (const mergedCell of mergedCells) {
  //   const [from, to] = mergedCell.split(':').map(parseCellCoordinates)
  //   console.log('Merged Cell.', 'From:', from, 'To:', to)
  // }

  return cells.map(function (node) {
    return (0, _parseCell["default"])(node, sheet, xml, values, styles, properties, options);
  });
}
//# sourceMappingURL=parseCells.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCell;
var _parseCellValue = _interopRequireDefault(require("./parseCellValue.js"));
var _coordinates = require("./coordinates.js");
var _xlsx = require("../xml/xlsx.js");
var _dom = require("../xml/dom.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Example of a `<c/>`ell element:
//
// <c>
//    <f>string</f> — formula.
//    <v>string</v> — formula pre-computed value.
//    <is>
//       <t>string</t> — an `inlineStr` string (rather than a "common string" from a dictionary).
//       <r>
//          <rPr>
//            ...
//          </rPr>
//          <t>string</t>
//       </r>
//       <rPh sb="1" eb="1">
//          <t>string</t>
//       </rPh>
//       <phoneticPr fontId="1"/>
//    </is>
//    <extLst>
//       <ext>
//          <!--any element-->
//       </ext>
//    </extLst>
// </c>
//
function parseCell(node, sheet, xml, values, styles, properties, options) {
  var coords = (0, _coordinates.parseCellCoordinates)(node.getAttribute('r'));
  var valueElement = (0, _xlsx.getCellValue)(sheet, node);

  // For `xpath`, `value` can be `undefined` while for native `DOMParser` it's `null`.
  // So using `value && ...` instead of `if (value !== undefined) { ... }` here
  // for uniform compatibility with both `xpath` and native `DOMParser`.
  var value = valueElement && valueElement.textContent;
  var type;
  if (node.hasAttribute('t')) {
    type = node.getAttribute('t');
  }
  return {
    row: coords[0],
    column: coords[1],
    value: (0, _parseCellValue["default"])(value, type, {
      getInlineStringValue: function getInlineStringValue() {
        return (0, _xlsx.getCellInlineStringValue)(sheet, node);
      },
      getInlineStringXml: function getInlineStringXml() {
        return (0, _dom.getOuterXml)(node);
      },
      getStyleId: function getStyleId() {
        return node.getAttribute('s');
      },
      styles: styles,
      values: values,
      properties: properties,
      options: options
    })
  };
}
//# sourceMappingURL=parseCell.js.map
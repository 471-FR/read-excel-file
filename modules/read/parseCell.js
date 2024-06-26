import parseCellValue from './parseCellValue.js';
import { parseCellCoordinates } from './coordinates.js';
import { getCellValue, getCellInlineStringValue } from '../xml/xlsx.js';
import { getOuterXml } from '../xml/dom.js';

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
export default function parseCell(node, sheet, xml, values, styles, properties, options) {
  var coords = parseCellCoordinates(node.getAttribute('r'));
  var valueElement = getCellValue(sheet, node);

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
    value: parseCellValue(value, type, {
      getInlineStringValue: function getInlineStringValue() {
        return getCellInlineStringValue(sheet, node);
      },
      getInlineStringXml: function getInlineStringXml() {
        return getOuterXml(node);
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
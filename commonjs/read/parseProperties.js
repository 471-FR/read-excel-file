"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseProperties;
var _xlsx = require("../xml/xlsx.js");
// I guess `xl/workbook.xml` file should always be present inside the *.xlsx archive.
function parseProperties(content, xml) {
  var book = xml.createDocument(content);
  var properties = {};

  // Read `<workbookPr/>` element to detect whether dates are 1900-based or 1904-based.
  // https://support.microsoft.com/en-gb/help/214330/differences-between-the-1900-and-the-1904-date-system-in-excel
  // http://webapp.docx4java.org/OnlineDemo/ecma376/SpreadsheetML/workbookPr.html

  var workbookProperties = (0, _xlsx.getWorkbookProperties)(book);
  if (workbookProperties && workbookProperties.getAttribute('date1904') === '1') {
    properties.epoch1904 = true;
  }

  // Get sheets info (indexes, names, if they're available).
  // Example:
  // <sheets>
  //   <sheet
  //     xmlns:ns="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  //     name="Sheet1"
  //     sheetId="1"
  //     ns:id="rId3"/>
  // </sheets>
  // http://www.datypic.com/sc/ooxml/e-ssml_sheet-1.html

  properties.sheets = [];
  var addSheetInfo = function addSheetInfo(sheet) {
    if (sheet.getAttribute('name')) {
      properties.sheets.push({
        id: sheet.getAttribute('sheetId'),
        name: sheet.getAttribute('name'),
        relationId: sheet.getAttribute('r:id')
      });
    }
  };
  (0, _xlsx.getSheets)(book).forEach(addSheetInfo);
  return properties;
}
//# sourceMappingURL=parseProperties.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseStyles = getBaseStyles;
exports.getCellInlineStringValue = getCellInlineStringValue;
exports.getCellStyles = getCellStyles;
exports.getCellValue = getCellValue;
exports.getCells = getCells;
exports.getDimensions = getDimensions;
exports.getMergedCells = getMergedCells;
exports.getNumberFormats = getNumberFormats;
exports.getRelationships = getRelationships;
exports.getSharedStrings = getSharedStrings;
exports.getSheets = getSheets;
exports.getWorkbookProperties = getWorkbookProperties;
var _xpathNode = _interopRequireDefault(require("./xpathNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Turns out IE11 doesn't support XPath, so not using `./xpathBrowser` for browsers.
// https://github.com/catamphetamine/read-excel-file/issues/26
// The inclusion of `xpath` package in `./xpathNode`
// increases the bundle size by about 100 kilobytes.
// IE11 is a wide-spread browser and it's unlikely that
// anyone would ignore it for now.
// There could be a separate export `read-excel-file/ie11`
// for using `./xpathNode` instead of `./xpathBrowser`
// but this library has been migrated to not using `xpath` anyway.
// This code is just alternative/historical now, it seems.

var namespaces = {
  a: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
  // This one seems to be for `r:id` attributes on `<sheet>`s.
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  // This one seems to be for `<Relationships/>` file.
  rr: 'http://schemas.openxmlformats.org/package/2006/relationships'
};
function getCells(document) {
  return (0, _xpathNode["default"])(document, null, '/a:worksheet/a:sheetData/a:row/a:c', namespaces);
}
function getMergedCells(document) {
  return (0, _xpathNode["default"])(document, null, '/a:worksheet/a:mergedCells/a:mergedCell/@ref', namespaces);
}
function getCellValue(document, node) {
  return (0, _xpathNode["default"])(document, node, './a:v', namespaces)[0];
}
function getCellInlineStringValue(document, node) {
  return (0, _xpathNode["default"])(document, node, './a:is/a:t', namespaces)[0].textContent;
}
function getDimensions(document) {
  var dimensions = (0, _xpathNode["default"])(document, null, '/a:worksheet/a:dimension/@ref', namespaces)[0];
  if (dimensions) {
    return dimensions.textContent;
  }
}
function getBaseStyles(document) {
  return (0, _xpathNode["default"])(document, null, '/a:styleSheet/a:cellStyleXfs/a:xf', namespaces);
}
function getCellStyles(document) {
  return (0, _xpathNode["default"])(document, null, '/a:styleSheet/a:cellXfs/a:xf', namespaces);
}
function getNumberFormats(document) {
  return (0, _xpathNode["default"])(document, null, '/a:styleSheet/a:numFmts/a:numFmt', namespaces);
}
function getSharedStrings(document) {
  // An `<si/>` element can contain a `<t/>` (simplest case) or a set of `<r/>` ("rich formatting") elements having `<t/>`.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sharedstringitem?redirectedfrom=MSDN&view=openxml-2.8.1
  // http://www.datypic.com/sc/ooxml/e-ssml_si-1.html

  // The ".//a:t[not(ancestor::a:rPh)]" selector means:
  // "select all `<t/>` that are not children of `<rPh/>`". 
  // https://stackoverflow.com/questions/42773772/xpath-span-what-does-the-dot-mean
  // `<rPh><t></t></rPh>` seems to be some "phonetic data" added for languages like Japanese that should be ignored.
  // https://github.com/doy/spreadsheet-parsexlsx/issues/72
  return (0, _xpathNode["default"])(document, null, '/a:sst/a:si', namespaces).map(function (string) {
    return (0, _xpathNode["default"])(document, string, './/a:t[not(ancestor::a:rPh)]', namespaces).map(function (_) {
      return _.textContent;
    }).join('');
  });
}
function getWorkbookProperties(document) {
  return (0, _xpathNode["default"])(document, null, '/a:workbook/a:workbookPr', namespaces)[0];
}
function getRelationships(document) {
  return (0, _xpathNode["default"])(document, null, '/rr:Relationships/rr:Relationship', namespaces);
}
function getSheets(document) {
  return (0, _xpathNode["default"])(document, null, '/a:workbook/a:sheets/a:sheet', namespaces);
}
//# sourceMappingURL=xlsx-xpath.js.map
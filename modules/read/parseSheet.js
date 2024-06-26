import parseCells from './parseCells.js';
import parseDimensions from './parseDimensions.js';
import { calculateDimensions } from './coordinates.js';
export default function parseSheet(content, xml, values, styles, properties, options) {
  var sheet = xml.createDocument(content);
  var cells = parseCells(sheet, xml, values, styles, properties, options);

  // `dimensions` defines the spreadsheet area containing all non-empty cells.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sheetdimension?view=openxml-2.8.1
  var dimensions = parseDimensions(sheet) || calculateDimensions(cells);
  return {
    cells: cells,
    dimensions: dimensions
  };
}
//# sourceMappingURL=parseSheet.js.map
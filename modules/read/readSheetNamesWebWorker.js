import readXlsxFile from './readXlsxFileWebWorker.js';

/**
 * Reads the list of sheet names in an XLSX file in a Web Worker.
 * @param  {file} file - The file.
 * @return {Promise} Resolves to an array of objects of shape `{ name: string }`.
 */
export default function readSheetNames(file) {
  return readXlsxFile(file, {
    getSheets: true
  }).then(function (sheets) {
    return sheets.map(function (sheet) {
      return sheet.name;
    });
  });
}
//# sourceMappingURL=readSheetNamesWebWorker.js.map
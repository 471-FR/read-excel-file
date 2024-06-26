import readXlsxFile from './readXlsxFileBrowser.js';

/**
 * Reads the list of sheet names in an XLSX file in a web browser.
 * @param  {file} file - A file being uploaded in the browser.
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
//# sourceMappingURL=readSheetNamesBrowser.js.map
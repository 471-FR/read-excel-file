"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unpackXlsxFile;
var _fflate = require("fflate");
/**
 * Reads XLSX file in a browser.
 * @param  {(File|Blob|ArrayBuffer)} input - A `File` or an `ArrayBuffer`.
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */
function unpackXlsxFile(input) {
  if (input instanceof File) {
    return input.arrayBuffer().then(unpackXlsxArrayBuffer);
  }
  if (input instanceof Blob) {
    return input.arrayBuffer().then(unpackXlsxArrayBuffer);
  }
  return unpackXlsxArrayBuffer(input);
}

/**
 * Reads XLSX file in a browser from an `ArrayBuffer`.
 * @param  {ArrayBuffer} input
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */
function unpackXlsxArrayBuffer(arrayBuffer) {
  var archive = new Uint8Array(arrayBuffer);
  var contents = (0, _fflate.unzipSync)(archive);
  return Promise.resolve(getContents(contents));
  // return new Promise((resolve, reject) => {
  // 	unzip(archive, (error, contents) => {
  // 		if (error) {
  // 			return reject(error)
  // 		}
  // 		return resolve(getContents(contents))
  // 	})
  // })
}

function getContents(contents) {
  var unzippedFiles = [];
  for (var _i = 0, _Object$keys = Object.keys(contents); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    unzippedFiles[key] = (0, _fflate.strFromU8)(contents[key]);
  }
  return unzippedFiles;
}
//# sourceMappingURL=unpackXlsxFileBrowser.js.map
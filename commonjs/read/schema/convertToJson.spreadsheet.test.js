"use strict";

var _convertToJson3 = _interopRequireDefault(require("./convertToJson.js"));
var _convertToJsonSpreadsheet = _interopRequireDefault(require("./convertToJson.spreadsheet.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function convertToJson(data, schema, options) {
  return (0, _convertToJsonSpreadsheet["default"])(_convertToJson3["default"], data, schema, options);
}
describe('convertToJson (spreadsheet behavior)', function () {
  it('should handle missing columns / empty cells (`schemaPropertyValueForMissingColumn: null`) (`required: false`)', function () {
    var _convertToJson = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
        COLUMN_1: {
          prop: 'column1',
          type: String,
          required: false
        },
        COLUMN_2: {
          prop: 'column2',
          type: String,
          required: false
        },
        COLUMN_4: {
          prop: 'column4',
          type: String,
          required: false
        },
        COLUMN_5: {
          prop: 'column5',
          type: String,
          required: false
        }
      }, {
        schemaPropertyValueForMissingColumn: null
      }),
      rows = _convertToJson.rows,
      errors = _convertToJson.errors;
    errors.should.deep.equal([]);
    rows.should.deep.equal([{
      column1: null,
      column2: '12',
      column4: '14',
      column5: null
    }, {
      column1: null,
      column2: '22',
      // column4: undefined,
      column5: null
    }]);
  });
  it('should handle missing columns / empty cells (`schemaPropertyValueForEmptyCell: null`) (`required: false`)', function () {
    var _convertToJson2 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
        COLUMN_1: {
          prop: 'column1',
          type: String,
          required: false
        },
        COLUMN_2: {
          prop: 'column2',
          type: String,
          required: false
        },
        COLUMN_4: {
          prop: 'column4',
          type: String,
          required: false
        },
        COLUMN_5: {
          prop: 'column5',
          type: String,
          required: false
        }
      }, {
        schemaPropertyValueForEmptyCell: null
      }),
      rows = _convertToJson2.rows,
      errors = _convertToJson2.errors;
    errors.should.deep.equal([]);
    rows.should.deep.equal([{
      // column1: undefined,
      column2: '12',
      column4: '14'
      // column5: undefined
    }, {
      // column1: undefined,
      column2: '22',
      column4: null
      // column5: undefined
    }]);
  });
});
//# sourceMappingURL=convertToJson.spreadsheet.test.js.map
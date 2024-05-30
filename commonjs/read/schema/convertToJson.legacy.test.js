"use strict";

var _convertToJsonLegacy = _interopRequireDefault(require("./convertToJson.legacy.js"));
var _Integer = _interopRequireDefault(require("../../types/Integer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('convertToJson (legacy behavior)', function () {
  it('should include `null` values when `includeNullValues: true` option is passed', function () {
    var _convertToJson = (0, _convertToJsonLegacy["default"])([['A', 'B', 'CA', 'CB'], ['a', 'b', 'ca', null], ['a', null]], {
        A: {
          prop: 'a',
          type: String
        },
        B: {
          prop: 'b',
          type: String
        },
        C: {
          prop: 'c',
          type: {
            CA: {
              prop: 'a',
              type: String
            },
            CB: {
              prop: 'b',
              type: String
            }
          }
        }
      }, {
        includeNullValues: true
      }),
      rows = _convertToJson.rows;
    rows.should.deep.equal([{
      a: 'a',
      b: 'b',
      c: {
        a: 'ca',
        b: null
      }
    }, {
      a: 'a',
      b: null,
      c: null
    }]);
  });
  it('should handle missing columns / empty cells (default) (`required: false`)', function () {
    var _convertToJson2 = (0, _convertToJsonLegacy["default"])([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
      }),
      rows = _convertToJson2.rows,
      errors = _convertToJson2.errors;
    errors.should.deep.equal([]);

    // Legacy behavior.
    rows.should.deep.equal([{
      column2: '12',
      column4: '14'
    }, {
      column2: '22'
    }]);
  });
  it('should handle missing columns / empty cells (`includeNullValues: true`) (`required: false`)', function () {
    var _convertToJson3 = (0, _convertToJsonLegacy["default"])([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
        includeNullValues: true
      }),
      rows = _convertToJson3.rows,
      errors = _convertToJson3.errors;
    errors.should.deep.equal([]);
    rows.should.deep.equal([{
      column1: null,
      column2: '12',
      column4: '14',
      column5: null
    }, {
      column1: null,
      column2: '22',
      column4: null,
      column5: null
    }]);
  });
  it('should require fields when cell value is empty', function () {
    var _convertToJson4 = (0, _convertToJsonLegacy["default"])([['NUMBER', 'STRING'], [null, 'abc']], {
        NUMBER: {
          prop: 'number',
          type: Number,
          required: true
        },
        STRING: {
          prop: 'string',
          type: String,
          required: true
        }
      }),
      rows = _convertToJson4.rows,
      errors = _convertToJson4.errors;
    errors.should.deep.equal([{
      error: 'required',
      row: 2,
      column: 'NUMBER',
      type: Number,
      // value: null,
      value: undefined
    }]);
    rows.should.deep.equal([{
      string: 'abc'
    }]);
  });
  it('shouldn\'t require fields when cell value is empty and object is empty too', function () {
    var _convertToJson5 = (0, _convertToJsonLegacy["default"])([['NUMBER'], [null]], {
        NUMBER: {
          prop: 'number',
          type: Number,
          required: true
        }
      }),
      rows = _convertToJson5.rows,
      errors = _convertToJson5.errors;
    rows.should.deep.equal([]);
  });
  it('should parse arrays (and remove `null` empty objects from result)', function () {
    var _convertToJson6 = (0, _convertToJsonLegacy["default"])([['NAMES'], ['Barack Obama, "String, with, colons", Donald Trump'], [null]], {
        NAMES: {
          prop: 'names',
          type: [String]
        }
      }),
      rows = _convertToJson6.rows,
      errors = _convertToJson6.errors;
    errors.should.deep.equal([]);
    rows.should.deep.equal([{
      names: ['Barack Obama', 'String, with, colons', 'Donald Trump']
    }]);
  });
  it('should parse integers (and drop `null` errored objects from result)', function () {
    var _convertToJson7 = (0, _convertToJsonLegacy["default"])([['INTEGER'], ['1'], ['1.2']], {
        INTEGER: {
          prop: 'value',
          type: _Integer["default"]
        }
      }),
      rows = _convertToJson7.rows,
      errors = _convertToJson7.errors;
    errors.length.should.equal(1);
    errors[0].should.deep.equal({
      error: 'invalid',
      reason: 'not_an_integer',
      row: 3,
      column: 'INTEGER',
      type: _Integer["default"],
      value: '1.2'
    });
    rows.should.deep.equal([{
      value: 1
    }]);
  });
  it('should not include `null` values by default (and set `null` for an "empty" object)', function () {
    var _convertToJson8 = (0, _convertToJsonLegacy["default"])([['A', 'B', 'CA', 'CB'], ['a', 'b', 'ca', null], ['a', null]], {
        A: {
          prop: 'a',
          type: String
        },
        B: {
          prop: 'b',
          type: String
        },
        C: {
          prop: 'c',
          type: {
            CA: {
              prop: 'a',
              type: String
            },
            CB: {
              prop: 'b',
              type: String
            }
          }
        }
      }),
      rows = _convertToJson8.rows;
    rows.should.deep.equal([{
      a: 'a',
      b: 'b',
      c: {
        a: 'ca'
      }
    }, {
      a: 'a'
    }]);
  });
});
//# sourceMappingURL=convertToJson.legacy.test.js.map
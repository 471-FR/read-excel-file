import convertToJson, { parseArray, getBlock } from './convertToJson.js';
import Integer from '../../types/Integer.js';
import URL from '../../types/URL.js';
import Email from '../../types/Email.js';
var date = convertToUTCTimezone(new Date(2018, 3 - 1, 24));
describe('convertToJson', function () {
  it('should parse arrays', function () {
    getBlock('abc"de,f"g,h', ',', 0).should.deep.equal(['abcde,fg', 10]);
    parseArray(' abc"de,f"g  , h ', ',').should.deep.equal(['abcde,fg', 'h']);
  });
  it('should convert to json', function () {
    var _convertToJson = convertToJson([['DATE', 'NUMBER', 'BOOLEAN', 'STRING', 'PHONE', 'PHONE_TYPE'], [new Date(Date.parse('03/24/2018') - new Date().getTimezoneOffset() * 60 * 1000),
      // '43183', // '03/24/2018',
      '123', true, 'abc', '(123) 456-7890', '(123) 456-7890']], {
        DATE: {
          prop: 'date',
          type: Date
        },
        NUMBER: {
          prop: 'number',
          type: Number
        },
        BOOLEAN: {
          prop: 'boolean',
          type: Boolean
        },
        STRING: {
          prop: 'string',
          type: String
        },
        PHONE: {
          prop: 'phone',
          parse: function parse(value) {
            return '+11234567890';
          }
        },
        PHONE_TYPE: {
          prop: 'phoneType',
          type: function type(value) {
            return '+11234567890';
          }
        }
      }),
      rows = _convertToJson.rows,
      errors = _convertToJson.errors;
    errors.should.deep.equal([]);

    // Convert `Date` to `String` for equality check.
    rows[0].date = rows[0].date.toISOString();
    rows.should.deep.equal([{
      date: date.toISOString(),
      number: 123,
      phone: '+11234567890',
      phoneType: '+11234567890',
      "boolean": true,
      string: 'abc'
    }]);
  });
  it('should support schema entries with no `type`s', function () {
    var _convertToJson2 = convertToJson([['DATE', 'NUMBER', 'BOOLEAN', 'STRING'], [new Date(Date.parse('03/24/2018') - new Date().getTimezoneOffset() * 60 * 1000),
      // '43183', // '03/24/2018',
      123, true, 'abc']], {
        DATE: {
          prop: 'date'
        },
        NUMBER: {
          prop: 'number'
        },
        BOOLEAN: {
          prop: 'boolean'
        },
        STRING: {
          prop: 'string'
        }
      }),
      rows = _convertToJson2.rows,
      errors = _convertToJson2.errors;
    errors.should.deep.equal([]);

    // Convert `Date` to `String` for equality check.
    rows[0].date = rows[0].date.toISOString();
    rows.should.deep.equal([{
      date: date.toISOString(),
      number: 123,
      "boolean": true,
      string: 'abc'
    }]);
  });
  it('should require fields when cell value is empty', function () {
    var _convertToJson3 = convertToJson([['NUMBER', 'STRING'], [null, 'abc']], {
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
      rows = _convertToJson3.rows,
      errors = _convertToJson3.errors;
    errors.should.deep.equal([{
      error: 'required',
      row: 2,
      column: 'NUMBER',
      type: Number,
      value: null
    }]);
    rows.should.deep.equal([{
      number: null,
      string: 'abc'
    }]);
  });
  it('shouldn\'t require fields when cell value is empty and object is empty too', function () {
    var _convertToJson4 = convertToJson([['NUMBER'], [null]], {
        NUMBER: {
          prop: 'number',
          type: Number,
          required: true
        }
      }),
      rows = _convertToJson4.rows,
      errors = _convertToJson4.errors;
    rows.should.deep.equal([null]);
  });
  it('should parse arrays', function () {
    var _convertToJson5 = convertToJson([['NAMES'], ['Barack Obama, "String, with, colons", Donald Trump'], [null]], {
        NAMES: {
          prop: 'names',
          type: [String]
        }
      }),
      rows = _convertToJson5.rows,
      errors = _convertToJson5.errors;
    errors.should.deep.equal([]);
    rows.should.deep.equal([{
      names: ['Barack Obama', 'String, with, colons', 'Donald Trump']
    }, null]);
  });
  it('should parse integers', function () {
    var _convertToJson6 = convertToJson([['INTEGER'], ['1'], ['1.2']], {
        INTEGER: {
          prop: 'value',
          type: Integer
        }
      }),
      rows = _convertToJson6.rows,
      errors = _convertToJson6.errors;
    errors.length.should.equal(1);
    errors[0].should.deep.equal({
      error: 'invalid',
      reason: 'not_an_integer',
      row: 3,
      column: 'INTEGER',
      type: Integer,
      value: '1.2'
    });
    rows.should.deep.equal([{
      value: 1
    }, null]);
  });
  it('should parse URLs', function () {
    var _convertToJson7 = convertToJson([['URL'], ['https://kremlin.ru'], ['kremlin.ru']], {
        URL: {
          prop: 'value',
          type: URL
        }
      }),
      rows = _convertToJson7.rows,
      errors = _convertToJson7.errors;
    errors.length.should.equal(1);
    errors[0].row.should.equal(3);
    errors[0].column.should.equal('URL');
    errors[0].error.should.equal('invalid');
    rows.should.deep.equal([{
      value: 'https://kremlin.ru'
    }, null]);
  });
  it('should parse Emails', function () {
    var _convertToJson8 = convertToJson([['EMAIL'], ['vladimir.putin@kremlin.ru'], ['123']], {
        EMAIL: {
          prop: 'value',
          type: Email
        }
      }),
      rows = _convertToJson8.rows,
      errors = _convertToJson8.errors;
    errors.length.should.equal(1);
    errors[0].row.should.equal(3);
    errors[0].column.should.equal('EMAIL');
    errors[0].error.should.equal('invalid');
    rows.should.deep.equal([{
      value: 'vladimir.putin@kremlin.ru'
    }, null]);
  });
  it('should call .validate()', function () {
    var _convertToJson9 = convertToJson([['NAME'], ['George Bush']], {
        NAME: {
          prop: 'name',
          type: String,
          required: true,
          validate: function validate(value) {
            if (value === 'George Bush') {
              throw new Error('custom-error');
            }
          }
        }
      }),
      rows = _convertToJson9.rows,
      errors = _convertToJson9.errors;
    errors.should.deep.equal([{
      error: 'custom-error',
      row: 2,
      column: 'NAME',
      type: String,
      value: 'George Bush'
    }]);
    rows.should.deep.equal([null]);
  });
  it('should validate numbers', function () {
    var _convertToJson10 = convertToJson([['NUMBER'], ['123abc']], {
        NUMBER: {
          prop: 'number',
          type: Number,
          required: true
        }
      }),
      rows = _convertToJson10.rows,
      errors = _convertToJson10.errors;
    errors.should.deep.equal([{
      error: 'invalid',
      reason: 'not_a_number',
      row: 2,
      column: 'NUMBER',
      type: Number,
      value: '123abc'
    }]);
    rows.should.deep.equal([null]);
  });
  it('should validate booleans', function () {
    var _convertToJson11 = convertToJson([['TRUE', 'FALSE', 'INVALID'], [true, false, 'TRUE']], {
        TRUE: {
          prop: 'true',
          type: Boolean,
          required: true
        },
        FALSE: {
          prop: 'false',
          type: Boolean,
          required: true
        },
        INVALID: {
          prop: 'invalid',
          type: Boolean,
          required: true
        }
      }),
      rows = _convertToJson11.rows,
      errors = _convertToJson11.errors;
    errors.should.deep.equal([{
      error: 'invalid',
      reason: 'not_a_boolean',
      row: 2,
      column: 'INVALID',
      type: Boolean,
      value: 'TRUE'
    }]);
    rows.should.deep.equal([{
      "true": true,
      "false": false
    }]);
  });
  it('should validate dates', function () {
    var _convertToJson12 = convertToJson([['DATE', 'INVALID'], [43183,
      // 03/24/2018',
      '-'], [date,
      // 03/24/2018',,
      '-']], {
        DATE: {
          prop: 'date',
          type: Date,
          required: true
        },
        INVALID: {
          prop: 'invalid',
          type: Date,
          required: true
        }
      }),
      rows = _convertToJson12.rows,
      errors = _convertToJson12.errors;
    errors.should.deep.equal([{
      error: 'invalid',
      reason: 'not_a_date',
      row: 2,
      column: 'INVALID',
      type: Date,
      value: '-'
    }, {
      error: 'invalid',
      reason: 'not_a_date',
      row: 3,
      column: 'INVALID',
      type: Date,
      value: '-'
    }]);
    rows.should.deep.equal([{
      date: date
    }, {
      date: date
    }]);
  });
  it('should throw parse() errors', function () {
    var _convertToJson13 = convertToJson([['PHONE', 'PHONE_TYPE'], ['123', '123']], {
        PHONE: {
          prop: 'phone',
          parse: function parse() {
            throw new Error('invalid');
          }
        },
        PHONE_TYPE: {
          prop: 'phoneType',
          parse: function parse() {
            throw new Error('invalid');
          }
        }
      }),
      rows = _convertToJson13.rows,
      errors = _convertToJson13.errors;
    errors.should.deep.equal([{
      error: 'invalid',
      row: 2,
      column: 'PHONE',
      value: '123'
    }, {
      error: 'invalid',
      row: 2,
      column: 'PHONE_TYPE',
      value: '123'
    }]);
    rows.should.deep.equal([null]);
  });
  it('should map row numbers', function () {
    var _convertToJson14 = convertToJson([['NUMBER'], ['123abc']], {
        NUMBER: {
          prop: 'number',
          type: Number
        }
      }, {
        rowIndexMap: [2, 5]
      }),
      rows = _convertToJson14.rows,
      errors = _convertToJson14.errors;
    errors.should.deep.equal([{
      error: 'invalid',
      reason: 'not_a_number',
      row: 6,
      column: 'NUMBER',
      type: Number,
      value: '123abc'
    }]);
  });
  it('should validate "oneOf" (valid)', function () {
    var _convertToJson15 = convertToJson([['STATUS'], ['STARTED']], {
        STATUS: {
          prop: 'status',
          type: String,
          oneOf: ['STARTED', 'FINISHED']
        }
      }),
      rows = _convertToJson15.rows,
      errors = _convertToJson15.errors;
    errors.length.should.equal(0);
  });
  it('should validate "oneOf" (not valid)', function () {
    var _convertToJson16 = convertToJson([['STATUS'], ['SCHEDULED']], {
        STATUS: {
          prop: 'status',
          type: String,
          oneOf: ['STARTED', 'FINISHED']
        }
      }),
      rows = _convertToJson16.rows,
      errors = _convertToJson16.errors;
    errors.should.deep.equal([{
      error: 'invalid',
      reason: 'unknown',
      row: 2,
      column: 'STATUS',
      type: String,
      value: 'SCHEDULED'
    }]);
  });
  it('should not include `null` values by default', function () {
    var _convertToJson17 = convertToJson([['A', 'B', 'CA', 'CB'], ['a', 'b', 'ca', null], ['a', null]], {
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
      rows = _convertToJson17.rows;
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
    var _convertToJson18 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
      rows = _convertToJson18.rows,
      errors = _convertToJson18.errors;
    errors.should.deep.equal([]);

    // Legacy behavior.
    rows.should.deep.equal([{
      column2: '12',
      column4: '14'
    }, {
      column2: '22',
      column4: null
    }]);
  });
  it('should handle missing columns / empty cells (`schemaPropertyValueForMissingColumn: null`) (`required: false`)', function () {
    var _convertToJson19 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
      rows = _convertToJson19.rows,
      errors = _convertToJson19.errors;
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
  it('should handle missing columns / empty cells (`schemaPropertyValueForNullCellValue: null`) (`required: false`)', function () {
    var _convertToJson20 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
        schemaPropertyValueForNullCellValue: null
      }),
      rows = _convertToJson20.rows,
      errors = _convertToJson20.errors;
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

  it('should handle missing columns / empty cells (`schemaPropertyValueForMissingColumn: null` and `schemaPropertyValueForNullCellValue: null`) (`required: false`)', function () {
    var _convertToJson21 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
        schemaPropertyValueForMissingColumn: null,
        schemaPropertyValueForNullCellValue: null
      }),
      rows = _convertToJson21.rows,
      errors = _convertToJson21.errors;
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
  it('should handle missing columns / empty cells (`schemaPropertyValueForMissingColumn: null` and `schemaPropertyValueForNullCellValue: null` and `schemaPropertyShouldSkipRequiredValidationForMissingColumn()` not specified) (`required: true`)', function () {
    var _convertToJson22 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
          required: true
        }
      }, {
        schemaPropertyValueForMissingColumn: null,
        schemaPropertyValueForNullCellValue: null
      }),
      rows = _convertToJson22.rows,
      errors = _convertToJson22.errors;
    errors.should.deep.equal([{
      column: 'COLUMN_5',
      error: 'required',
      row: 2,
      type: String,
      value: null
    }, {
      column: 'COLUMN_5',
      error: 'required',
      row: 3,
      type: String,
      value: null
    }]);
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
  it('should handle missing columns / empty cells (`schemaPropertyValueForMissingColumn: null` and `schemaPropertyValueForNullCellValue: null` and `schemaPropertyShouldSkipRequiredValidationForMissingColumn: () => false`) (`required: true`)', function () {
    var _convertToJson23 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
          required: true
        }
      }, {
        schemaPropertyValueForMissingColumn: null,
        schemaPropertyValueForNullCellValue: null,
        schemaPropertyShouldSkipRequiredValidationForMissingColumn: function schemaPropertyShouldSkipRequiredValidationForMissingColumn() {
          return false;
        }
      }),
      rows = _convertToJson23.rows,
      errors = _convertToJson23.errors;
    errors.should.deep.equal([{
      column: 'COLUMN_5',
      error: 'required',
      row: 2,
      type: String,
      value: null
    }, {
      column: 'COLUMN_5',
      error: 'required',
      row: 3,
      type: String,
      value: null
    }]);
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
  it('should handle missing columns / empty cells (`schemaPropertyValueForMissingColumn: null` and `schemaPropertyValueForNullCellValue: null` and `schemaPropertyShouldSkipRequiredValidationForMissingColumn: () => true`) (`required: true`)', function () {
    var _convertToJson24 = convertToJson([['COLUMN_2', 'COLUMN_3', 'COLUMN_4'], ['12', '13', '14'], ['22', '23', null]], {
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
          required: true
        }
      }, {
        schemaPropertyValueForMissingColumn: null,
        schemaPropertyValueForNullCellValue: null,
        schemaPropertyShouldSkipRequiredValidationForMissingColumn: function schemaPropertyShouldSkipRequiredValidationForMissingColumn() {
          return true;
        }
      }),
      rows = _convertToJson24.rows,
      errors = _convertToJson24.errors;
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
});

// Converts timezone to UTC while preserving the same time
function convertToUTCTimezone(date) {
  // Doesn't account for leap seconds but I guess that's ok
  // given that javascript's own `Date()` does not either.
  // https://www.timeanddate.com/time/leap-seconds-background.html
  //
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
  //
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
//# sourceMappingURL=convertToJson.test.js.map
import { createRequire } from "module";
const require = createRequire(".../src/api/api.js");

var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it(`should return -1 when the value is not present${import.meta.url}`, function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
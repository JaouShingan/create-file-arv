const util = require('../bin/utils');

console.log(util.toBigCamelCase('abcDdd-123'));
console.log(util.toBigCamelCase('abc-ddd-123'));
console.log(util.toBigCamelCase('_abc-ddd-123'));
console.log(util.toBigCamelCase('&&&abc-1ddd-123'));
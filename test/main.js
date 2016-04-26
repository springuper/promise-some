var assert = require('assert');
var Promise = require('es6-promise').Promise;
var promiseSome = require('..');

describe('PromiseSome', function () {
  it('should resolve when the first valid item found', function (done) {
    var counter = 0;
    var promiseFactories = [5, 1, 2, 3, 4].map(function (item) {
      return function () {
        return new Promise(function (resolve) {
          counter++;
          setTimeout(function () {
            resolve(item % 3 === 0);
          }, 100);
        });
      };
    });
    promiseSome(promiseFactories).then(function (index) {
      assert.equal(index, 3);
      assert.equal(counter, 4);
      done();
    }).catch(done);
  });

  it('should reject when no valid item found', function (done) {
    var counter = 0;
    var promiseFactories = [5, 1, 2, 3, 4].map(function (item) {
      return function () {
        return new Promise(function (resolve) {
          counter++;
          setTimeout(function () {
            resolve(item > 9);
          }, 100);
        });
      };
    });
    promiseSome(promiseFactories).then(function (index) {
      done(index);
    }).catch(function (reason) {
      assert.equal(reason.message, 'no valid item.');
      assert.equal(counter, 5);
      done();
    }).catch(done);
  });

  it('should automatically convert arguments', function (done) {
    var list = [5, 1, 2, 3, 4];
    promiseSome(list, function (item) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(item % 3 === 0);
        }, 100);
      });
    }).then(function (index) {
      assert.equal(index, 3);
      done();
    }).catch(done);
  });

  it('should reject empty list', function (done) {
    promiseSome([]).catch(function (reason) {
      assert.equal(reason.message, 'promise list is empty.');
      done();
    }).catch(done);
  });
});

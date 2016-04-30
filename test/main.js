const assert = require('assert');
const promiseSome = require('..');

describe('PromiseSome', () => {
  it('should resolve when the first valid item found', done => {
    let counter = 0;
    const promiseFactories = [5, 1, 2, 3, 4].map(item => () => (
      new Promise(resolve => {
        counter++;
        setTimeout(() => {
          resolve(item % 3 === 0);
        }, 100);
      })
    ));
    promiseSome(promiseFactories).then(index => {
      assert.equal(index, 3);
      assert.equal(counter, 4);
      done();
    }).catch(done);
  });

  it('should reject when no valid item found', done => {
    let counter = 0;
    const promiseFactories = [5, 1, 2, 3, 4].map(item => () => (
      new Promise(resolve => {
        counter++;
        setTimeout(() => {
          resolve(item > 9);
        }, 100);
      })
    ));
    promiseSome(promiseFactories).then(index => {
      done(index);
    }).catch(reason => {
      assert.equal(reason.message, 'no valid item.');
      assert.equal(counter, 5);
      done();
    }).catch(done);
  });

  it('should automatically convert arguments', done => {
    const list = [5, 1, 2, 3, 4];
    promiseSome(list, item => new Promise(resolve => {
      setTimeout(() => {
        resolve(item % 3 === 0);
      }, 100);
    })).then(index => {
      assert.equal(index, 3);
      done();
    }).catch(done);
  });

  it('should reject empty list', done => {
    promiseSome([]).catch(reason => {
      assert.equal(reason.message, 'promise list is empty.');
      done();
    }).catch(done);
  });
});

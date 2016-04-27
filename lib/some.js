var Promise = require('es6-promise').Promise;

module.exports = function (promiseFactories) {
  if (promiseFactories.length === 0) {
    return Promise.reject(new Error('promise list is empty.'));
  }
  // sugar argument conversion
  if (arguments.length === 2 && typeof arguments[1] === 'function') {
    var promiseConversion = arguments[1];
    promiseFactories = promiseFactories.map(function (item) {
      return function () {
        return promiseConversion(item);
      }
    });
  }

  return new Promise(function (resolve, reject) {
    var len = promiseFactories.length;
    function next(i) {
      if (i === len) {
        return reject(new Error('no valid item.'));
      }
      promiseFactories[i]().then(function (result) {
        if (result) {
          resolve(i);
        } else {
          next(++i);
        }
      }).catch(function () {
        next(++i);
      });
    }
    next(0);
  });
};

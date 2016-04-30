module.exports = function (promiseFactories) {
  if (promiseFactories.length === 0) {
    return Promise.reject(new Error('promise list is empty.'));
  }
  // sugar argument conversion
  if (arguments.length === 2 && typeof arguments[1] === 'function') {
    const promiseConversion = arguments[1];
    promiseFactories = promiseFactories.map(item => () => promiseConversion(item));
  }

  return new Promise((resolve, reject) => {
    const len = promiseFactories.length;
    function next(i) {
      if (i === len) {
        reject(new Error('no valid item.'));
        return;
      }
      promiseFactories[i]().then(result => {
        if (result === false) {
          next(++i);
        } else {
          resolve(i);
        }
      }).catch(() => {
        next(++i);
      });
    }
    next(0);
  });
};

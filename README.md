# promise-some2

[![Build Status](https://travis-ci.org/springuper/promise-some.svg?branch=master)](https://travis-ci.org/springuper/promise-some)

enhance promise with functionality like array some method.

## Installation

```
npm install promise-some2
```

## Example

The most common use case:

```js
var promiseSome = require('promise-some2');
var promiseFactories = [5, 4, 3, 2, 1].map(function (item) {
  return function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(item % 3 === 0);
      }, 100);
    });
  };
});
promiseSome(promiseFactories).then(function (index) {
  console.log(index); // => 2
}).catch(function () {
  console.log('no valid item');
});
```

and a sugar use case:

```js
var promiseSome = require('promise-some2');
promiseSome([5, 4, 3, 2, 1], function (item) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(item % 3 === 0);
    }, 100);
  });
}).then(function (index) {
    console.log(value); // => 2
});
```

## License

MIT

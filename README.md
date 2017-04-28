npm-user-service
=======

<!--[![NPM version][npm-image]][npm-url]-->
[![build status][travis-image]][travis-url]
<!--[![Test coverage][coveralls-image]][coveralls-url]-->


[npm-image]: https://img.shields.io/npm/v/npm-user-service.svg?style=flat
[npm-url]: https://npmjs.org/package/npm-user-service
[travis-image]: https://travis-ci.org/ltchronus/npm-user-service.svg?style=flat
[travis-url]: https://travis-ci.org/ltchronus/npm-user-service
[coveralls-image]: https://img.shields.io/coveralls/cnpm/npm-user-service.svg?style=flat
[coveralls-url]: https://coveralls.io/r/cnpm/npm-user-service?branch=master


[npm] user service for [cnpmjs.org] with gitlab auth(https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization)

## Install

```bash
$ npm install npm-user-service --save
```

## Usage

Set `userService` on [cnpmjs.org/config/config.js](https://github.com/cnpm/cnpmjs.org/blob/master/config/index.js)

```js
var NpmUserService = require('npm-user-service');

config.userService = new NpmUserService();
```

## License

MIT


[npm]: https://npmjs.org

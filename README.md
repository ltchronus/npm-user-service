npm-user-service
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/npm-user-service.svg?style=flat
[npm-url]: https://npmjs.org/package/npm-user-service
[travis-image]: https://img.shields.io/travis/cnpm/npm-user-service.svg?style=flat
[travis-url]: https://travis-ci.org/cnpm/npm-user-service
[coveralls-image]: https://img.shields.io/coveralls/cnpm/npm-user-service.svg?style=flat
[coveralls-url]: https://coveralls.io/r/cnpm/npm-user-service?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/cnpm/npm-user-service.svg?style=flat
[david-url]: https://david-dm.org/cnpm/npm-user-service

[npm] user service for [cnpmjs.org](https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization)

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

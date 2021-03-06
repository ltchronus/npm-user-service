npm-user-service
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
<!--[![Test coverage][coveralls-image]][coveralls-url]-->


[npm-image]: https://img.shields.io/npm/v/npm-user-service.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cnpm-user-service-gitlab
[travis-image]: https://travis-ci.org/ltchronus/npm-user-service.svg?style=flat
[travis-url]: https://travis-ci.org/ltchronus/npm-user-service
[coveralls-image]: https://img.shields.io/coveralls/cnpm/npm-user-service.svg?style=flat
[coveralls-url]: https://coveralls.io/r/cnpm/npm-user-service?branch=master


[npm] user service for [cnpmjs.org] with gitlab auth(https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization)

## Install

```bash
$ npm install cnpm-user-service-gitlab --save
```

## Usage

Set `userService` on [cnpmjs.org/config/config.js](https://github.com/cnpm/cnpmjs.org/blob/master/config/index.js)

```js
var NpmUserService = require('cnpm-user-service-gitlab');

config.userService = new NpmUserService();
```

### requirements
- gitlab v3 api
- gitlab admin accesskey

## License

MIT


[npm]: https://npmjs.org

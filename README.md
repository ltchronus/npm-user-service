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

npm user service for [cnpmjs.org](https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization)

## Install

```bash
$ npm install npm-user-service --save
```

## Usage

```js
var NpmUserService = require('npm-user-service');

config.userService = new NpmUserService();
```

## License

(The MIT License)

Copyright (c) 2014 fengmk2 &lt;fengmk2@gmail.com&gt; and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

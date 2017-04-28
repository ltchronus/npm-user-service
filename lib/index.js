'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function formatUser(data) {
  if (!data) {
    return data;
  }

  return {
    login: data.username,
    email: data.email,
    name: data.name,
    html_url: data.web_url || '',
    avatar_url: data.avatar || '',
    im_url: '',
    // site_admin: data.site_admin,
    // scopes: [],
    _raw: data
  };
}

var handles = {
  parseJSON: function parseJSON(res) {
    return res.json();
  },
  checkStatus: function checkStatus(res) {
    var status = res.status;

    if (status >= 200 && status < 300) {
      return Promise.resolve(res);
    }
    var err = new Error(res.statusText);
    err.status = status;
    err.headers = res.headers;
    if (status >= 400 && status < 500) {
      err.name = 'gitlabClientError';
    } else {
      err.name = 'gitlabServerError';
    }
    throw err;
  }
};

var UserService = function () {
  function UserService() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UserService);

    var api = opts.api,
        privateToken = opts.privateToken;

    this.api = api;
    this.privateToken = privateToken;
  }

  /**
   * Auth user with login name and password
   * @param  {String} login    login name
   * @param  {String} password login password
   * @return {User}
   */


  _createClass(UserService, [{
    key: 'auth',
    value: function auth(login, password) {
      return this._request('POST', 'session', { login: login, password: password }).then(formatUser);
    }

    /**
     * Get user by login name
     * @param  {String} login  login name
     * @return {User}
     */

  }, {
    key: 'get',
    value: function get(login) {
      var url = 'users?username=' + login;
      return this._request('get', url).then(function (users) {
        return users[0];
      }).then(formatUser);
    }

    /**
     * List users
     * @param  {Array<String>} logins  login names
     * @return {Array<User>}
     */

  }, {
    key: 'list',
    value: function list(logins) {
      var that = this;
      var usersPromises = logins.map(function (name) {
        return that.get(name);
      });
      return Promise.all(usersPromises).then(function (users) {
        return users.filter(function (user) {
          return !!user;
        });
      });
    }

    /**
     * Search users
     * @param  {String} query  query keyword
     * @param  {Object} [options] optional query params
     *  - {Number} limit match users count, default is `20`
     * @return {Array<User>}
     */
    // eslint-disable-next-line

  }, {
    key: 'search',
    value: function search(query, options) {}
  }, {
    key: '_request',
    value: function _request(method, url, data) {
      var newUrl = this.api + '/' + url;
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'PRIVATE-TOKEN': this.privateToken
      };

      return (0, _nodeFetch2.default)(newUrl, {
        method: method,
        body: JSON.stringify(data),
        headers: headers
      }).then(handles.checkStatus).then(handles.parseJSON);
    }
  }]);

  return UserService;
}();

exports.default = UserService;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const handles = {
  parseJSON: res => res.json(),
  checkStatus(res) {
    const { status } = res;
    if (status >= 200 && status < 300) {
      return Promise.resolve(res);
    }
    const err = new Error(res.statusText);
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

class UserService {
  constructor(opts = {}) {
    const {
      api,
      privateToken
    } = opts;
    this.api = api;
    this.privateToken = privateToken;
  }

  /**
   * Auth user with login name and password
   * @param  {String} login    login name
   * @param  {String} password login password
   * @return {User}
   */
  *auth(login, password) {
    const form = new _formData2.default();
    form.append('login', login);
    form.append('password', password);
    const user = yield this._request('POST', 'session', form).then(formatUser);
    return user;
  }

  /**
   * Get user by login name
   * @param  {String} login  login name
   * @return {User}
   */
  *get(login) {
    const url = `users?username=${login}`;
    const user = yield this._request('get', url).then(users => users[0]).then(formatUser);
    return user;
  }

  /**
   * List users
   * @param  {Array<String>} logins  login names
   * @return {Array<User>}
   */
  *list(logins) {
    const that = this;
    const users = yield logins.map(name => that.get(name));
    return users.filter(user => !!user);
  }

  /**
   * Search users
   * @param  {String} query  query keyword
   * @param  {Object} [options] optional query params
   *  - {Number} limit match users count, default is `20`
   * @return {Array<User>}
   */
  // eslint-disable-next-line
  search(query, options) {}

  _request(method, url, formData) {
    const newUrl = `${this.api}/${url}`;
    const headers = {
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
      'PRIVATE-TOKEN': this.privateToken
    };
    let opts = {
      method,
      headers
    };

    if (method === 'POST') {
      opts = Object.assign({}, opts, { body: formData });
    }
    // console.log(newUrl, opts, 'newUrl');
    return (0, _nodeFetch2.default)(newUrl, opts).then(handles.checkStatus).then(handles.parseJSON);
  }
}

exports.default = UserService;
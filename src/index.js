import fetch from 'node-fetch';
import FormData from 'form-data';

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
    _raw: data,
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
  },
};

class UserService {
  constructor(opts = {}) {
    const {
      api,
      privateToken,
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
  auth(login, password) {
    const form = new FormData();
    form.append('login', login);
    form.append('password', password);
    return this._request('POST', 'session', form)
      .then(formatUser);
  }

  /**
   * Get user by login name
   * @param  {String} login  login name
   * @return {User}
   */
  get(login) {
    const url = `users?username=${login}`;
    return this._request('get', url)
      .then(users => users[0])
      .then(formatUser);
  }

  /**
   * List users
   * @param  {Array<String>} logins  login names
   * @return {Array<User>}
   */
  list(logins) {
    const that = this;
    const usersPromises = logins
      .map(name => that.get(name));
    return Promise.all(usersPromises)
      .then(users => users.filter(user => !!user))
      .catch(() => {
        console.log(22222);
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
  search(query, options) {

  }

  _request(method, url, formData) {
    const newUrl = `${this.api}/${url}`;
    const headers = {
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
      'PRIVATE-TOKEN': this.privateToken,
    };
    let opts = {
      method,
      headers,
    };

    if (method === 'POST') {
      opts = Object.assign({}, opts, { body: formData });
    }
    // console.log(newUrl, opts, 'newUrl');
    return fetch(newUrl, opts).then(handles.checkStatus)
    .then(handles.parseJSON);
  }
}

export default UserService;

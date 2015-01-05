/**!
 * npm-user-service - lib/user.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var urllib = require('urllib');

module.exports = UserService;

function UserService(options) {
  options = options || {};
  this.registry = options.registry || 'https://registry.npmjs.com';
}

var proto = UserService.prototype;

/**
 * Auth user with login name and password
 * @param  {String} login    login name
 * @param  {String} password login password
 * @return {User}
 */
proto.auth = function* (login, password) {
  // GET https://registry.npmjs.com/-/user/org.couchdb.user:npm-user-service-testuser?write=true
  var url = '/-/user/org.couchdb.user:' + login + '?write=true';
  var user = yield this._request('GET', url, {
    username: login,
    password: password
  });
  return formatUser(user);
};

/**
 * Get user by login name
 * @param  {String} login  login name
 * @return {User}
 */
proto.get = function* (login) {
  var url = '/-/user/org.couchdb.user:' + login;
  var user = yield this._request('GET', url);
  return formatUser(user);
};

/**
 * List users
 * @param  {Array<String>} logins  login names
 * @return {Array<User>}
 */
proto.list = function* (logins) {
  var that = this;
  var users = yield logins.map(function (name) {
    return that.get(name);
  });
  return users.filter(function (user) {
    return !!user;
  });
};

/**
 * Search users
 * @param  {String} query  query keyword
 * @param  {Object} [options] optional query params
 *  - {Number} limit match users count, default is `20`
 * @return {Array<User>}
 */
proto.search = function* (query, options) {
  
};

proto._request = function* (method, url, auth) {
  var baseauth;
  if (auth) {
    baseauth = auth.username + ':' + auth.password;
  }
  url = this.registry + url;
  var result = yield urllib.request(url, {
    method: method,
    dataType: 'json',
    auth: baseauth,
  });
  var status = result.status || -1;
  if (status >= 200 && status < 300) {
    return result.data;
  }

  if (status === 404) {
    return null;
  }

  var data = result.data || {};
  var message = data.reason || 'status ' + status;
  var err = new Error(message);
  err.status = status;
  err.headers = result.headers;
  err.raw = data;
  if (status >= 400 && status < 500) {
    err.name = 'NpmClientError';
  } else {
    err.name = 'NpmServerError';
  }
  throw err;
};

function formatUser(data) {
  if (!data) {
    return data;
  }

  return {
    login: data.name,
    email: data.email,
    name: data.fullname || data.name,
    html_url: data.homepage || 'https://npmjs.org/~' + data.name,
    avatar_url: data.avatar || '',
    im_url: '',
    // site_admin: data.site_admin,
    // scopes: [],
    _raw: data
  };
}

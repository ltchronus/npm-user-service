/**!
 * npm-user-service - test/user.test.js
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

var should = require('should');
var UserService = require('../');

describe('user.test.js', function () {
  var username = 'npm-user-service-testuser';
  var password = '123456';
  var email = 'fengmk2@gmail.com';
  var userservice = new UserService();

  describe('auth()', function () {
    it('should auth pass and return user', function* () {
      var user = yield userservice.auth(username, password, email);
      user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      user.login.should.equal('npm-user-service-testuser');
    });

    it('should throw error when auth fail', function* () {
      try {
        var user = yield userservice.auth(username, 'password', email);
        console.log(user);
        throw new Error('should not run this');
      } catch (err) {
        err.name.should.equal('NpmClientError');
        err.message.should.equal('Name or password is incorrect.');
        err.status.should.equal(401);
        // console.log(err);
      }
    });
  });

  describe('get()', function () {
    it('should return exists user', function* () {
      var user = yield userservice.get('fengmk2');
      user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      user.login.should.equal('fengmk2');
      user.email.should.equal('fengmk2@gmail.com');
    });

    it('should return null when user not exists', function* () {
      var user = yield userservice.get('fengmk2-not-exists');
      should.not.exist(user);
    });
  });

  describe('list()', function () {
    it('should return multi users', function* () {
      var users = yield userservice.list(['fengmk2', 'dead-horse']);
      users.should.be.an.Array;
      users.should.length(2);
      users.forEach(function (user) {
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      });
    });

    it('should work with some users not exists', function* () {
      var users = yield userservice.list(['fengmk2', 'dead-horse-not-exists']);
      users.should.be.an.Array;
      users.should.length(1);
      users.forEach(function (user) {
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      });
    });

    it('should return [] when all users not exists', function* () {
      var users = yield userservice.list(['fengmk2-not-exists', 'dead-horse-not-exists']);
      users.should.be.an.Array;
      users.should.length(0);
    });
  });
});

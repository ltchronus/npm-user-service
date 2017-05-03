"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var UserService = require('../');

var username = process.env.NAME;
var password = process.env.PW;
var email = process.env.EMAIL;
var privateToken = process.env.TOKEN;
var api = process.env.API;
var userservice = new UserService({
  privateToken: privateToken,
  api: api
});

describe('user.test.js', function () {

  describe('auth()', function () {
    it('should auth pass and return user', function* () {
      var user = yield* userservice.auth(username, password, email)
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
        user.login.should.equal('ltchronus');
    });

    it('should throw error when auth fail', function* () {

      try {
         var user = yield userservice.auth(username, 'password', email);
         throw new Error('should not run this');
      } catch (err) {
        err.name.should.equal('gitlabClientError');
        err.message.should.equal('Unauthorized');
        err.status.should.equal(401);
      }

    });
  });

  describe('get()', function () {
    it('should return exists user', function* () {
      var user = yield userservice.get('ltchronus')
      user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      user.login.should.equal('ltchronus');

    });

    it('should return null when user not exists', function* () {
      var user = yield userservice.get('name-not-exists')
      should.not.exist(user);

    });
  });

  describe('list()', function () {
    it('should return multi users', function* () {
      var users = yield userservice.list(['ltchronus', 'chenglong'])
      users.should.be.an.Array;
      users.should.length(2);
      users.forEach(function (user) {
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      });
    });

    it('should work with some users not exists', function* () {
      var users = yield userservice.list(['ltchronus', 'dead-horse-not-exists'])
      users.should.be.an.Array;
      users.should.length(1);
      users.forEach(function (user) {
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
      });
    });

    it('should return [] when all users not exists', function* () {
      var users = yield userservice.list(['name-not-exists', 'dead-horse-not-exists'])
      users.should.be.an.Array;
      users.should.length(0);
    });
  });
});

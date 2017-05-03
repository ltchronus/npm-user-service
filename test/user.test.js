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
    it('should auth pass and return user', function (done) {
      userservice.auth(username, password, email).then((user) => {
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
        user.login.should.equal('ltchronus');
        done()
      }).catch((err) => {
        done(err)
      });
    });

    it('should throw error when auth fail', function (done) {

      userservice.auth(username, 'password', email).then((user) => {
        throw new Error('should not run this');
        done()
      }).catch((err) => {
        err.name.should.equal('gitlabClientError');
        err.message.should.equal('Unauthorized');
        err.status.should.equal(401);
        done()
      });

    });
  });

  describe('get()', function () {
    it('should return exists user', function (done) {
      userservice.get('ltchronus').then((user) => {
        user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
        user.login.should.equal('ltchronus');
        done()
      }).catch((err) => {
        done(err)
      });
    });

    it('should return null when user not exists', function (done) {
      userservice.get('name-not-exists').then((user) => {
        should.not.exist(user);
        done()
      }).catch((err) => {
        done(err)
      });
    });
  });

  describe('list()', function () {
    it('should return multi users', function (done) {
      userservice.list(['ltchronus', 'chenglong']).then((users) => {
        users.should.be.an.Array;
        users.should.length(2);
        users.forEach(function (user) {
          user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
        });
        done()
      }).catch((err) => {
        done(err)
      });

    });

    it('should work with some users not exists', function (done) {
      userservice.list(['ltchronus', 'dead-horse-not-exists']).then((users) => {
        users.should.be.an.Array;
        users.should.length(1);
        users.forEach(function (user) {
          user.should.have.keys('login', 'email', 'name', 'html_url', 'avatar_url', 'im_url', '_raw');
        });
        done()
      }).catch((err) => {
        done(err)
      });

    });

    it('should return [] when all users not exists', function () {
      userservice.list(['name-not-exists', 'dead-horse-not-exists']).then((users) => {
        users.should.be.an.Array;
        users.should.length(0);
        done()
      }).catch((err) => {
        done(err)
      });

    });
  });
});

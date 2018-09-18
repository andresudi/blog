process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/user");
const url = "http://localhost:3000";
require("dotenv").config();

chai.use(chaiHttp);

describe("User", function() {
  this.timeout(5000000);
  beforeEach(function(done) {
    mongoose
      .connect(
        process.env.dbTest,
        { useNewUrlParser: true }
      )
      .then(function() {
        User.create({
          name: "helboi",
          email: "helboi@mail.com",
          password: "123456"
        })
          .then(function() {
            done();
          })
          .catch(function() {
            done();
          });
      });
  });

  afterEach(function(done) {
    User.remove({})
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  it("POST /users/register should return new obj user", function(done) {
    chai
      .request(url)
      .post("/users/register")
      .send({
        name: "huhahuhu",
        email: "huhahuhu@mail.com",
        password: "123456"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property("name");
        expect(res.body.data).to.have.property("email");
        expect(res.body.data).to.have.property("password");
        expect(res.body.data.name).to.equal("huhahuhu");
        expect(res.body.data.email).to.equal("huhahuhu@mail.com");
        expect(res.body.data.password).to.not.equal("123456");
        done();
      });
  });

  it("POST /users/login should return new obj token", function(done) {
    chai
      .request(url)
      .post("/users/login")
      .send({
        email: "helboi@mail.com",
        password: "123456"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.equal("Successfully login");
        expect(res.body.token).to.not.equal("");
        expect(res.body).to.have.all.keys('token', 'message')
        done();
      });
  });

  it("POST /users/login should email is invalid", function(done) {
    chai
      .request(url)
      .post("/users/login")
      .send({
        email: "",
        password: ""
      })
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

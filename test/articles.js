const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/user");
const Article = require("../models/article");
const url = "http://localhost:3000";
const jwt = require("jsonwebtoken");
require("dotenv").config();
let userId = "";
let articleId = "";
let token = "";

chai.use(chaiHttp);
describe("Article", function() {
  this.timeout(5000000);
  before(function(done) {
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
          .then(function(user) {
            User.findOne({ email: user.email })
              .then(function(dataUser) {
                authorId = dataUser._id;
                token = jwt.sign(
                  {
                    id: dataUser._id,
                    name: dataUser.name,
                    email: dataUser.email
                  },
                  process.env.jwt_secret
                );
                done();
              })
              .catch(function(err) {
                console.log(err);
                done();
              });
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
      });
  });
  after(function(done) {
    User.remove({}).then(function() {
      Article.remove({}).then(function() {
        done();
      });
    });
  });
  it("POST /articles to crate article and should return new obj article", function(done) {
    chai
      .request(url)
      .post("/articles")
      .send({
        title: "test title",
        description: "umaga",
        userId: userId,
        image: "http://www.eschoolnews.com/files/2014/08/online_testing.3.jpg"
      })
      .set("token", token)
      .end(function(err, res) {
        articleId = res.body.data._id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body.data).to.be.a("object");
        expect(res.body.message).to.equal("successfully create article");
        expect(res.body.data).to.have.property("_id");
        expect(res.body.data).to.have.property("title");
        expect(res.body.data).to.have.property("description");
        expect(res.body.data).to.have.property("userId");
        expect(res.body.data).to.have.property("image");
        expect(res.body.data).to.have.property("createdAt");
        expect(res.body.data.title).to.equal("test title");
        expect(res.body.data.description).to.equal("umaga");
        done();
      });
  });
  it("GET /articles should return array of object all articles", function(done) {
    chai
      .request(url)
      .get(`/articles`)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.equal("List of all articles");
        expect(res.body.data).to.be.a("array");
        expect(res.body.data[0]).to.be.a("object");
        expect(res.body.data[0]).to.have.property("_id");
        expect(res.body.data[0]).to.have.property("title");
        expect(res.body.data[0]).to.have.property("description");
        expect(res.body.data[0]).to.have.property("userId");
        expect(res.body.data[0]).to.have.property("image");
        expect(res.body.data[0].title).to.equal("test title");
        expect(res.body.data[0].description).to.equal("umaga");
        done();
      });
  });

  it("GET /articles/:id should return of object article by article id", function(done) {
    chai
      .request(url)
      .get(`/articles/${articleId}`)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.equal(`articles with id ${articleId}`);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("_id");
        expect(res.body.data).to.have.property("title");
        expect(res.body.data).to.have.property("description");
        expect(res.body.data).to.have.property("userId");
        expect(res.body.data).to.have.property("image");
        expect(res.body.data).to.have.property("createdAt");
        expect(res.body.data.title).to.equal("test title");
        expect(res.body.data.description).to.equal("umaga");
        done();
      });
  });
  it("GET /articles/myarticle should return array of object articles by userId", function(done) {
    chai
      .request(url)
      .get(`/articles/myarticle`)
      .set("token", token)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.equal("my articles");
        expect(res.body.data).to.be.a("array");
        expect(res.body.data[0]).to.be.a("object");
        expect(res.body.data[0]).to.have.property("_id");
        expect(res.body.data[0]).to.have.property("title");
        expect(res.body.data[0]).to.have.property("description");
        expect(res.body.data[0]).to.have.property("userId");
        expect(res.body.data[0]).to.have.property("image");
        expect(res.body.data[0]).to.have.property("createdAt");
        expect(res.body.data[0].title).to.equal("test title");
        expect(res.body.data[0].description).to.equal("umaga");
        done();
      });
  });
  it("DELETE /articles/:id should delete article with article id", function(done) {
    chai
      .request(url)
      .delete(`/articles/${articleId}`)
      .set("token", token)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        done();
      });
  });
});

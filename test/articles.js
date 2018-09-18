// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const mongoose = require('mongoose')
// const User = require('../models/user')
// const Article = require('../models/article')
// const url = 'http://localhost:3000'
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// let userId = ""
// let articleId = ""
// let token = ""
//  chai.use(chaiHttp)
//  describe('Article', function () {
//     this.timeout(5000000)
//      before(function (done) {
//         mongoose.connect(process.env.MONGO_TESTING_URI, { useNewUrlParser: true }).then(function () {
//             User.create({
//                 name: 'tester',
//                 email: 'tester@mail.com',
//                 password: '123456'
//             })
//                 .then(function (user) {
//                      User.findOne({ email: user.email })
//                         .then(function (dataUser) {
//                             authorId = dataUser._id
//                              token = jwt.sign({
//                                 id: dataUser._id,
//                                 name: dataUser.name,
//                                 email: dataUser.email
//                             }, process.env.JWT_KEY)
//                             done()
//                         })
//                         .catch(function (err) {
//                             console.log(err);
//                             done()
//                         })
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                     done()
//                 })
//         })
//     })
//      after(function (done) {
//         // console.log('masuuk after');
//         User.remove({})
//             .then(function () {
//                 Article.remove({})
//                     .then(function () {
//                         done()
//                     })
//             })
//     })
//      it('POST /articles should return new obj article', function (done) {
//          chai.request(url)
//             .post('/articles')
//             .send({
//                 title: "test title",
//                 description: "test description",
//                 content: "test content",
//                 authorId: authorId,
//                 imageUrl: 'http://www.eschoolnews.com/files/2014/08/online_testing.3.jpg'
//             })
//             .set('token', token)
//             .end(function (err, res) {
//                 // console.log(res.body, 'booodyyyy');
//                 articleId = res.body.data._id
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.data).to.be.a('object')
//                 expect(res.body.message).to.equal('create article success')
//                 expect(res.body.data).to.have.property('_id')
//                 expect(res.body.data).to.have.property('title')
//                 expect(res.body.data).to.have.property('description')
//                 expect(res.body.data).to.have.property('content')
//                 expect(res.body.data).to.have.property('authorId')
//                 expect(res.body.data).to.have.property('imageUrl')
//                 expect(res.body.data).to.have.property('createdAt')
//                  expect(res.body.data.title).to.equal('test title')
//                 expect(res.body.data.description).to.equal('test description')
//                 expect(res.body.data.content).to.equal('test content')
//                 done()
//             })
//     })
//      it('GET /articles should return array of object articles', function (done) {
//         chai.request(url)
//             .get(`/articles`)
//             .end(function (err, res) {
//                 // console.log(res.body, 'ppppp');
//                  expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.message).to.equal('Articles found')
//                 expect(res.body.data).to.be.a('array')
//                 expect(res.body.data[0]).to.be.a('object')
//                 expect(res.body.data[0]).to.have.property('_id')
//                 expect(res.body.data[0]).to.have.property('title')
//                 expect(res.body.data[0]).to.have.property('description')
//                 expect(res.body.data[0]).to.have.property('content')
//                 expect(res.body.data[0]).to.have.property('authorId')
//                 expect(res.body.data[0]).to.have.property('imageUrl')
//                 expect(res.body.data[0]).to.have.property('createdAt')
//                 // expect(res.body.data).to.have.property('_id'))
//                  expect(res.body.data[0].title).to.equal('test title')
//                 expect(res.body.data[0].description).to.equal('test description')
//                 expect(res.body.data[0].content).to.equal('test content')
//                  done()
//             })
//     })
//      // it('PUT /articles/:id should be able to update article by article id an return message', function (done) {
//      //     chai.request(url)
//     //         .put(`/articles/${articleId}`)
//     //         .set('token', token)
//     //         .send({
//     //             title: "new title",
//     //             description: "new description",
//     //             content: "new content",
//     //         })
//     //         .end(function (err, res) {
//     //             console.log(res.body, 'ppppp');
//      //             expect(res).to.have.status(200)
//     //             expect(res.body).to.be.a('object')
//     //             // expect(res.body.message).to.equal('Articles found')
//     //             expect(res.body.data).to.be.a('object')
//     //             // expect(res.body.data).to.have.property('_id'))
//      //             done()
//     //         })
//     // })
//      it('GET /articles/:id should return of object article by article id', function (done) {
//         chai.request(url)
//             .get(`/articles/${articleId}`)
//             .end(function (err, res) {
//                 // console.log(res.body, 'ppppp');
//                  expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.message).to.equal('Article found')
//                 expect(res.body.data).to.be.a('object')
//                 expect(res.body.data).to.have.property('_id')
//                 expect(res.body.data).to.have.property('title')
//                 expect(res.body.data).to.have.property('description')
//                 expect(res.body.data).to.have.property('content')
//                 expect(res.body.data).to.have.property('authorId')
//                 expect(res.body.data).to.have.property('imageUrl')
//                 expect(res.body.data).to.have.property('createdAt')
//                  expect(res.body.data.title).to.equal('test title')
//                 expect(res.body.data.description).to.equal('test description')
//                 expect(res.body.data.content).to.equal('test content')
//                  done()
//             })
//     })
//      it('GET /articles/user should return array of object articles by user id', function (done) {
//         chai.request(url)
//             .get(`/articles/user`)
//             .set('token', token)
//             .end(function (err, res) {
//                 // console.log(res.body, 'ppppp');
//                  expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.message).to.equal('Articles found')
//                 expect(res.body.data).to.be.a('array')
//                 expect(res.body.data[0]).to.be.a('object')
//                 expect(res.body.data[0]).to.have.property('_id')
//                 expect(res.body.data[0]).to.have.property('title')
//                 expect(res.body.data[0]).to.have.property('description')
//                 expect(res.body.data[0]).to.have.property('content')
//                 expect(res.body.data[0]).to.have.property('authorId')
//                 expect(res.body.data[0]).to.have.property('imageUrl')
//                 expect(res.body.data[0]).to.have.property('createdAt')
//                 // expect(res.body.data).to.have.property('_id'))
//                  expect(res.body.data[0].title).to.equal('test title')
//                 expect(res.body.data[0].description).to.equal('test description')
//                 expect(res.body.data[0].content).to.equal('test content')
//                  done()
//             })
//     })
//      it('DELETE /articles/:id should be able to delete article by article id and return message', function (done) {
//         chai.request(url)
//             .delete(`/articles/${articleId}`)
//             .set('token', token)
//             .end(function (err, res) {
//                 // console.log(res.body, 'booodyyyy');
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.be.a('object')
//                 expect(res.body.message).to.equal('delete article success')
//                 done()
//             })
//     })
//  }) 
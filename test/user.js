// const chai = require("chai");
// const expect = chai.expect;
// const chaiHttp = require("chai-http");
// const User = require("../models/user");
// const app = require("../app.js");

// chai.use(chaiHttp);

// let registerUser = {
//   name: "wahyu",
//   email: "wahyudi@mail.com",
//   password: "123456"
// };
// let signinUser = {
//   email: registerUser.email,
//   password: registerUser.password
// };

// describe("/POST creating a user", () => {
//   it("it should create a users", done => {
//     chai
//       .request(app)
//       .post("/users/register")
//       .send(registerUser)
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body.data).to.have.property("name");
//         expect(res.body.data).to.have.property("email");
//         expect(res.body.data).to.have.property("password");
//         expect(res.body.data.name).to.equal("wahyu");
//         expect(res.body.data.email).to.equal("wahyudi@mail.com");
//         let isTrue = bcrypt.compareSync(
//           registerUser.password,
//           res.body.password
//         );
//         expect(isTrue).to.equal(true);

//         done();
//       });
//   });
// });

// describe("/POST login", () => {
//   it("it should login and check token", done => {
//     chai
//       .request(app)
//       .post("/users/login")
//       .send(signinUser)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an("object");
//         expect(res.body).to.have.all.keys("message","token", "id");
//         done();
//       });
//   });

//   after(function(done) {
//     User.remove({})
//       .then(data => {
//         console.log(data);
//         done();
//       })
//       .catch(err => {
//         console.log(err);
//         done();
//       });
//   });
// });
process.env.NODE_ENV = "test";
const User = require("../models/user");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("User", () => {
  beforeEach(function(done) {
    User.create({
      name: "helboi",
      email: "helboi@mail.com",
      password: 123456
    }).then(user => {
      userObj = user;
      done();
    });
  });

  it("GET /users to show all users", done => {
    chai
      .request("http://localhost:3000")
      .get("/users")
      .end((err, res) => {
        console.log(res.body.data[0]);
        expect(res).to.have.status(200)
        expect(res.body.data[0]).to.have.property("name");
        expect(res.body.data[0]).to.have.property("email");
        done();
      });
  });

  it("should get login succesfully and get token", done => {
    chai
      .request("http://localhost:3000")
      .post("/users/login")
      .send({
        email: "rexxar@mail.com",
        password: "123"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return email is invalid", done => {
    chai
      .request("http://localhost:3000")
      .post("/users/login")
      .send({
        email: "",
        password: ""
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("article", () => {
  it("GET /article to show all article", done => {
    chai
      .request("http://localhost:3000")
      .get("/articles")
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.data).to.have.status(200);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data.title).to.be.a("string");
        expect(res.body.data.description).to.be.a("string");
        done();
      });
  });

  it("POST /article to new create article and should return object data types", done => {
    chai
      .request("http://localhost:3000")
      .post("/articles")
      .send({
        title: "one piece",
        description: "best manga ever"
      })
      .end((err, res) => {
        // console.log(res.body)
        expect(res.body.data).to.be.null;
        expect(res.body.data).to.have.status(200);
        expect(res.body.data).to.have.property("title");
        expect(res.body.data).to.have.property("description");
        done();
      });
  });

  it("PUT /article to update a specific article", done => {
    chai.request("http://localhost:3000").put(`/articles/${req.params.id}`);
    send({
      title: "test",
      description: "hehehehe"
    }).end((err, res) => {
      // console.log(res)
      expect(res.body.data).to.be.null;
      expect(res.body.data).to.have.status(200);
      expect(res.body.data).to.have.header("token");
      done();
    });
  });

  it("DELETE /article to a specific article", done => {
    chai
      .request("http://localhost:3000")
      .delete(`articles/${req.params.id}`)
      .end((err, res) => {
        expect(res.body.data).to.be.null;
        expect(res.body.data).to.have.status(200);
        expect(res.body.data).to.have.header("token");
        done();
      });
  });

  afterEach(function(done) {
    User.remove({})
      .then(data => {
        console.log(data);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

});

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getAllUser = (req, res) => {
  User.find({})
    .then(data => {
      if (data.length == 0) {
        res.status(400).json({
          message: `cannot get users data`,
          data
        });
      } else {
        res.status(200).json({
          message: `succes get all users`,
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `Something is wrong`,
        err
      });
    });
};

const getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(data => {
      res.status(200).json({
        message: `get user data with id ${req.params.id}`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `cannot get a user data`,
        err
      });
    });
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(data => {
      res.status(200).json({
        message: `User succesfully deleted`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        err
      });
    });
};

const register = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user || user == undefined) {
        User.create({
          name: name,
          email: email,
          password: password
        })
          .then(data => {
            res.status(200).json({
              message: `success add new user`,
              data
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });
      } else {
        res.status(400).json({
          message: "email is already exist"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(data => {
      if (data) {
        let passwordCheck = bcrypt.compareSync(password, data.password);
        if (passwordCheck) {
          let token = jwt.sign(
            {
              id: data._id,
              name: data.name,
              email: data.email
            },
            process.env.jwt_secret
          );
          res.status(200).json({
            message: `Successfully login`,
            token
          });
        } else {
          res.status(400).json({
            message: `password is invalid`
          });
        }
      } else {
        res.status(400).json({
          message: `email is invalid`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  getAllUser,
  getOneUser,
  deleteUser,
  register,
  login
};

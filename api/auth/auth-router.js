const router = require('express').Router();
const { 
  validateBody, 
  checkUsernameFree,
  validateUsername,
  } = require('../middleware/restricted');
  const { JWT_SECRET } = require('../../secrets/index');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const Users = require('./auth-model');

router.post('/register', validateBody, checkUsernameFree, async (req, res, next) => {
  const { username, password } = req.body
  try {
  const hash = bcrypt.hashSync(password, 8)
  const user = { username, password: hash }
  const registeredUser = await Users.add(user)
  res.status(201).json({
    registeredUser
  })
  } catch (error) {
    next(error)
  }
});

router.post('/login', validateBody, validateUsername, (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;

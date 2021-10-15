const { JWT_SECRET } = require('../../secrets/index');
const jwt = require('jsonwebtoken');
const { findBy } = require('../auth/auth-model');

const restrict = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    return next({
      status: 401,
      message: "token required"
    })
  } jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err) {
      next({
        status: 401,
        message: "token invalid"
      })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
};

const validateBody = (req, res, next) => {
  const { username, password } = req.body
  if(username === undefined || typeof username !== 'string' || 
    !username.trim() || password === undefined || 
    typeof password !== 'string' || !password.trim()
    ){
      next({
        status: 400,
        message: "username and password required"
      })
    }else {
      next()
    }
};

const checkUsernameFree = async(req, res, next) => {
  const { username } = req.body
  const user = await findBy({ username: username})
  if(user.length){
    next({
      status: 422,
      message: "username taken"
    })
  } else {
    next()
  }
};

const validateUsername = async(req, res, next) => {
  const { username } = req.body
  const user = await findBy({ username: username })
  if(!user){
    next({
      status: 401,
      message: "invalid credentials"
    })
  } else {
    next()
  }
}


module.exports = {
  restrict,
  validateBody,
  checkUsernameFree,
  validateUsername
};



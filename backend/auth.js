const argon = require('argon2');
const jwt = require("jsonwebtoken")

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  argon.hash(password).then((hashedPassword) => {
    req.body.password = hashedPassword;
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json('servor error')
  })
};

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    req.userId = data.id;
    req.isAdmin = data.isAdmin;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

const isAdmin = (req, res, next) => {
  console.log("hello", req.isAdmin);
  if (req.isAdmin) {
    
    return next();
  }
  return res.sendStatus(403);
};

module.exports = { hashPassword, authorization, isAdmin }

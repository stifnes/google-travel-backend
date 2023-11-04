const User = require('../models/Users');
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, 'travel buddy secret', {
    expiresIn: maxAge
  });
}

module.exports.signup_post = async (req, res) => {
  const {user} = req.body
  try{
    const response = await User.create(user)
    
    // create a token
    const token = createToken(response._id);

    res.status(200).json({user: response, token});
  }
  catch (err){
    res.status(400).json({error: error.message})
  }
}
module.exports.login_post = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    
    // create a token
    const token = createToken(user._id);

    res.status(200).json({user: user, token})
  }
  catch(err){
    res.status(400).json({error: error.message})
  }
}
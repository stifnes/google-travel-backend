const User = require('../models/Users');
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: maxAge});
}

const loginUser = async (req, res) => {
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

const signupUser = async (req, res) => {
  const {user} = req.body
  try{
    const response = await User.signup(user)
    
    // create a token
    const token = createToken(response._id);

    res.status(200).json({user: response, token});
  }
  catch (err){
    console.log('signup cors error', err)
    res.status(400).json({error: error.message})
  }
}


module.exports = { signupUser, loginUser }
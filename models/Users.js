const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')


const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please enter your full name'],
    unique: true,
  },
  dateofbirth: {
    type: Date,
    required: [true, 'Please enter your date of birth'],
    validate: [validator.isDate, 'Please enter a valid email']
  },
  address: {
    type: String,
    required: [true, 'please enter your address']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minlength: [8, 'Password should be atleast 8 characters']
  }
})

userSchema.statics.signup = async function(user) {
  
  // validation
  if(!user.email || !user.password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(user.email)) {
    throw Error('Email not valid')
  }
  if(!validator.isStrongPassoword(user.password)) {
    throw Error('Password is not strong enough')
  }

  const exists = await this.findOne(user.email)

  if(exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const newUser = await this.create({ email, password: hash })

  return newUser

}

// static method to login user
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('user', userSchema);
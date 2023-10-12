const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
// const dbURI1 = 'mongodb+srv://samuelstifnes:AwtnIM32YjHTXygp@authcluster.bzruh0j.mongodb.net/node-auth';
const dbURI = 'mongodb+srv://samuelstifnes:AwtnIM32YjHTXygp@authcluster.bzruh0j.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000)
  } 
  )
  .catch((err) => console.log('DB not Connected', err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// cookies

app.get('/set-cookies', (req, res) => {
  //res.setHeader('Set-Cookie', 'newUser=true')

   res.cookie('newUser', false)

  res.send('you got the cookies')
})

app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  res.json(cookies.newUser)
})

app.use(authRoutes) 
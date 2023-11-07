require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/authRoutes')
const locationRoutes = require('./routes/locationRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const corsOptions ={
  origin:'http://localhost:5174', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine
app.set('view engine', 'ejs');

// routes
app.use(userRoutes)
app.use(locationRoutes)
app.get('/', (req, res) => res.render('home'));

// connect to db
const dbURI = 'mongodb+srv://samuelstifnes:AwtnIM32YjHTXygp@authcluster.bzruh0j.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(dbURI ,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // listen for requests
    app.listen(3000, () => {
      console.log('connected to db & listening on port', 3000)
    })
  })
  .catch((error) => {
    console.log(error)
  })

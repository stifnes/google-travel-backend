const Location = require('../models/Locations')
const mongoose = require('mongoose')
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// get all locations
const getLocations = async (req, res) => {
  const locations = await Location.find().sort({createdAt: -1})
  res.render('home', {locations})
}

const getPublicLocations = async (req, res) => {
  const locations = await Location.find().sort({createdAt: -1})
  res.status(200).json(locations)
}


// get a single location
const getLocation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such location'})
  }

  const location = await Location.findById(id)

  if (!location) {
    return res.status(404).json({error: 'No such location'})
  }
  res.render('location', {location})
}

const getLocationPublic = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such location'})
  }

  const location = await Location.findById(id)

  if (!location) {
    return res.status(404).json({error: 'No such location'})
  }
  res.status(200).json(location)
}


// create new location
const createLocation = async (req, res) => {
  const {name, country} = req.body
  const image = req.file.buffer.toString('base64')

  // add doc to db
  try {
    const location = await Location.create({name, country, image})
    res.render('location', {location})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a location
const deleteLocation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such location'})
  }

  const location = await Location.findOneAndDelete({_id: id})

  if (!location) {
    return res.status(400).json({error: 'No such location'})
  }

  res.status(200).json(location)
}


// create a place 
// Controller to add a place to a specific location
const createPlace = async (req, res) => {
  const { id } = req.params;
  
  try {
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const newPlace = {
      name: req.body.name,
      description: req.body.description,
      image:  req.file.buffer.toString('base64'),
      price: req.body.price,
      rating: req.body.rating,
      placeType: req.body.placeType,
    };

    // Add the new place to the location's places array
    location.places.push(newPlace);
    await location.save();
    
    // res.status(201).json({ message: 'Place added to location', location });
    return res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error adding place to location', error: error.message });
  }
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  deleteLocation,
  createPlace,
  getLocationPublic,
  getPublicLocations
}
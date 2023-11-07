const Location = require('../models/Locations')
const mongoose = require('mongoose')

// get all locations
const getLocations = async (req, res) => {
  // const user_id = req.user._id

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
  
  res.status(200).json(location)
}


// create new location
const createLocation = async (req, res) => {
  const {name, description, image} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(!image) {
    emptyFields.push('image')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const location = await Location.create({name, description, image})
    res.status(200).json(location)
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

// update a location
const updateLocation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such location'})
  }

  const location = await Location.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!location) {
    return res.status(400).json({error: 'No such location'})
  }

  res.status(200).json(location)
}


module.exports = {
  getLocations,
  getLocation,
  createLocation,
  deleteLocation,
  updateLocation
}
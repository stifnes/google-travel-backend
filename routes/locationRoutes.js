const express = require('express')
const {
  createLocation,
  getLocations,
  getLocation,
  deleteLocation,
  updateLocation
} = require('../controllers/locationController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getLocations)

//GET a single workout
router.get('/:id', getLocation)

// POST a new workout
router.post('/', createLocation)

// DELETE a workout
router.delete('/:id', deleteLocation)

// UPDATE a workout
router.patch('/:id', updateLocation)


module.exports = router
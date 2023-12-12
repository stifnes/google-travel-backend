const express = require('express')
const {
  createLocation,
  getLocations,
  getLocation,
  deleteLocation,
  createPlace,
  getLocationPublic,
  getPublicLocations,
} = require('../controllers/locationController')
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

// require auth for all locations routes
// router.use(requireAuth)

// GET all locations
router.get('/', getLocations)
// GET all locations for Frontend Public app
router.get('/public/v1', getPublicLocations)

//GET a single location
router.get('/location/:id', getLocation)
// GET one locations for Frontend Public app
router.get('/public/v1/location/:id', getLocationPublic)

// POST a new location
router.post('/',upload.single('image'), createLocation)

// DELETE a location
router.delete('/location/:id', deleteLocation)

// POST a new place in the location
router.post('/location/:id/places',upload.single('image'), createPlace)


module.exports = router
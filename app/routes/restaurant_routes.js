// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// pull in Mongoose model for restaurants
const Restaurant = require('../models/restaurant')


// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX -> GET/restaurants
router.get('/restaurants', (req,res,next) => {

    Restaurant.find()
        .then(restaurants => {
            return restaurants.map(restaurant => restaurant.toObject())
        })
        .then(restaurants => res.status(200).json({restaurants: restaurants}))
})

// SHOW

// CREATE -> POST/restaurants
router.post('/restaurants', (req,res,next) => {
    Restaurant.create(req.body.restaurant)
        .then(restaurant => {
            res.status(201).json({restaurant: restaurant.toObject()})
        })
        .catch(next)
})

// UPDATE

// PATCH 

// DESTROY

// DELETE 

module.exports = router

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



// SHOW -> GET/restaurants/:restaurantId
router.get('/restaurants/:id', (req,res,next) => {
    //restId = restaurant's id
    const restId = req.params.id
    Restaurant.findById(restId)
    .then(restaurant => res.status(200).json({restaurant: restaurant.toObject()}))
    .catch(next)
})



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

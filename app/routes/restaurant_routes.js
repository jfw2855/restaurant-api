// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// pull in Mongoose model for restaurants
const Restaurant = require('../models/restaurant')

// this middleware removes any blank fields from req.body
const removeBlanks = require('../../lib/remove_blank_fields')

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

// UPDATE -> PATCH/restaurants/:restaurantId
router.patch('/restaurants/:id', removeBlanks, (req,res,next) => {
    //restId = restaurant's id
    const restId = req.params.id
    Restaurant.findById(restId)
    .then(restaurant => {
        return restaurant.updateOne(req.body.restaurant)
    })
    .then(()=>res.sendStatus(204))
    .catch(next)
})


// PATCH 

// REMOVE -> DELETE/restaurants/:restaurantId
router.delete('/restaurants/:id', (req,res,next) => {
    //restId = restaurant's id
    const restId = req.params.id
    Restaurant.findByIdAndRemove(restId)
    .then(()=>res.sendStatus(204))
    .catch(next)
})


module.exports = router

const mongoose = require('mongoose')

const { Schema, model } = mongoose

const restaurantSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		yelp_rating: {
			type: Number,
			required: true,
            min: 0, 
            max: 5
		},
        location: {
            type: String,
            required: true
        },
        cuisine: [String],
        cost: {
            type: String,
            enum: ['$','$$','$$$','$$$$'],
            default: '$'
        }
	},
	{
		timestamps: true,
	}
)

module.exports = model('Restaurant', restaurantSchema)

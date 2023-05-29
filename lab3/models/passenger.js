const mongoose = require('mongoose')

const Schema = mongoose.Schema

const passengerSchema = new Schema({
    name: { type: String, required: true, max: 255 },
    surname: { type: String, required: true, max: 255 },
    passport_number: { type: Number, required: true, unique:true, max: 9999999999999 },
})

module.exports = mongoose.model('Passenger', passengerSchema, 'passenger')

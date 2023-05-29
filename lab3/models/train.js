const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trainSchema = new Schema({
    name: { type: String, required: true, max: 255 },
    route: { type: String, required: true, max: 255 },
    number: { type: Number, required: true, unique:true, max: 999999 },
    places: { type: Number, required: true, max: 9999},
})

module.exports = mongoose.model('Train', trainSchema, 'train')

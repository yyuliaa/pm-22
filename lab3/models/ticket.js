const mongoose = require('mongoose')

const Schema = mongoose.Schema

let date = new Date()
date.setDate(date.getDate()+45)

const ticketSchema = new Schema({
    number: { type: Number, required: true, max: 999999, index: true},
    price: { type: Number, required: true, max: 1000 },
    passenger: { type: Schema.Types.ObjectId, ref: 'Passenger' },
    train: { type: Schema.Types.ObjectId, ref: 'Train'},
    place: { type: Number, required: true, max: 9999 },
    date: { type: Date, required: true, min: new Date(), max: date, index: true},
})

ticketSchema.index({ number: 1, date: 1 }, { unique: true });
ticketSchema.index({ place: 1, date: 1 , train: 1}, { unique: true });

module.exports = mongoose.model('Ticket', ticketSchema,'ticket')


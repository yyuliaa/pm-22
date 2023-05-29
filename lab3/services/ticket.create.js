const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const ticket = new Ticket({
        number: data.number,
        price: data.price,
        passenger: data.passenger_id,
        train: data.train_id,
        place: data.place,
        date: data.date,
    })

    return new Promise((resolve, reject) => {
        ticket.save(function (err, createdTicket) {
            if (err) {
                reject(err)
            } else {
                resolve(createdTicket)
            }
        })
    })
}

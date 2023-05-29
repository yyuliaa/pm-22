const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const ticketData = {
        number: data.number,
        price: data.price,
        passenger: data.passenger_id,
        train: data.train_id,
        place: data.place,
        date: data.date,
    }

    return new Promise((resolve, reject) => {
        Ticket.findByIdAndUpdate(
            data.id,
            { $set: ticketData },
            { new: true },
            function (err, updatedTicket) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedTicket)
                }
            })
    })
}

const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        Ticket.findByIdAndDelete(data.id, function (err, deletedTicket) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedTicket)
            }
        })
    })
}

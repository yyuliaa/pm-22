const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        Ticket.findById(id, function (err, ticket) {
            if (err) {
                reject(err)
            } else {
                resolve(ticket)
            }
        })
    })
}

const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        Ticket.find({})
            .exec(function (err, ticket) {
                if (err) {
                    reject(err)
                } else {
                    resolve(ticket)
                }
            })
    })
}

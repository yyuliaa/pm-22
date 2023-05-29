const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        Passenger.findById(id, function (err, passenger) {
            if (err) {
                reject(err)
            } else {
                resolve(passenger)
            }
        })
    })
}

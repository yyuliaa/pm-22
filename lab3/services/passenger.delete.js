const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        Passenger.findByIdAndDelete(data.id, function (err, deletedPassenger) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedPassenger)
            }
        })
    })
}

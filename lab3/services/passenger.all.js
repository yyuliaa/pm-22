const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        Passenger.find({})
            .exec(function (err, passengers) {
                if (err) {
                    reject(err)
                } else {
                    resolve(passengers)
                }
            })
    })
}

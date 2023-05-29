const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const passenger = new Passenger({
        name: data.name,
        surname: data.name,
        passport_number: data.passport_number
    })

    return new Promise((resolve, reject) => {
        passenger.save(function (err, createdPassenger) {
            if (err) {
                reject(err)
            } else {
                resolve(createdPassenger)
            }
        })
    })
}

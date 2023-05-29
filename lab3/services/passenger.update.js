const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const passengerData = {
        name: data.name,
        surname: data.surname,
        passport_number: data.passport_number
    }

    return new Promise((resolve, reject) => {
        Passenger.findByIdAndUpdate(
            data.id,
            { $set: passengerData },
            { new: true },
            function (err, updatedPassenger) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedPassenger)
                }
            })
    })
}

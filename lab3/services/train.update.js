const Train = require('./../models/train')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const trainData = {
        name: data.name,
        route: data.route,
        number: data.number,
        places: data.places
    }

    return new Promise((resolve, reject) => {
        Train.findByIdAndUpdate(
            data.id,
            { $set: trainData },
            { new: true },
            function (err, updatedTrain) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedTrain)
                }
            })
    })
}

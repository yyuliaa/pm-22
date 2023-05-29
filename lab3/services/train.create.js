const Train = require('./../models/train')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const train = new Train({
        name: data.name,
        route: data.route,
        number: data.number,
        places: data.places
    })

    return new Promise((resolve, reject) => {
        train.save(function (err, createdTrain) {
            if (err) {
                reject(err)
            } else {
                resolve(createdTrain)
            }
        })
    })
}

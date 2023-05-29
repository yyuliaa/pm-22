const Train = require('./../models/train')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        Train.findByIdAndDelete(data.id, function (err, deletedTrain) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedTrain)
            }
        })
    })
}

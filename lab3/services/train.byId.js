const Train = require('./../models/train')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        Train.findById(id, function (err, train) {
            if (err) {
                reject(err)
            } else {
                resolve(train)
            }
        })
    })
}

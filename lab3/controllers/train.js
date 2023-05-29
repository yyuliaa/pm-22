'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const trainListService = require('./../services/train.all')
const trainCreateService = require('./../services/train.create')
const trainByIdService = require("../services/train.byId");
const trainDeleteService = require("../services/train.delete");
const trainUpdateService = require("../services/train.update");

module.exports = {
    index (req, res) {
        res.render('pages/train/index')
    },
    async trainList (req, res) {
        try {
            const trainList = await trainListService()
            res.render('pages/train/list', {
                trains: trainList
            })
        } catch (error) {
            res.render('pages/train/list', {
                trains: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createTrainForm (req, res) {
        res.render('pages/train/add')
    },
    postCreateTrain: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('route')
            .isLength({ min: 1 })
            .custom((value) => {
                return typeof(value.split(":")[0]) === 'string' &&
                typeof(value.split(":")[1]) === 'string' &&
                value.split(":").length === 2
            })
            .trim()
            .withMessage('Route field must be specified and in correct format.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number must be specified.'),
        body('places')
            .isLength({ min: 1 }).trim().withMessage('Places must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('passport_number').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('places').escape(),
        async (req, res) => {
            const trainData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const train = await trainCreateService(trainData)
                    req.flash('info', `Train "${train.name}" № "${train.number}" is Added`)
                    res.redirect('/train/list')
                } catch (error) {
                    res.render('pages/train/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/train/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updateTrainForm (req, res, next) {
        trainByIdService(req.params.id)
            .then(train => {
                if (train) {
                    res.render('pages/train/update', { train: train })
                } else {
                    const errorNotFound = new Error('Not found')
                    errorNotFound.status = 404
                    next(errorNotFound)
                }
            })
            .catch(error => {
                const errorServer = new Error(`Internal server error: ${error.message}`)
                errorServer.status = 500
                next(errorServer)
            })
    },
    putUpdateTrain: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('route')
            .isLength({ min: 1 }).trim().withMessage('Route field must be specified.'),
        body('places')
            .isLength({ min: 1 }).trim().withMessage('Places field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('route').escape(),
        sanitizeBody('places').escape(),
        (req, res, next) => {
            const trainData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                trainUpdateService(trainData)
                    .then(train => {
                        req.flash('info', `Train "${train.name}" № "${train.number}" is Updated`)
                        res.redirect('/train/list')
                    })
                    .catch(error => {
                        res.render('pages/train/update', {
                            train: {},
                            newTrain: trainData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/train/update', {
                    train: {},
                    newTrain: trainData,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteTrainFrom (req, res, next) {
        trainByIdService(req.params.id)
            .then(train => {
                if (train) {
                    res.render('pages/train/delete', { train: train })
                } else {
                    const errorNotFound = new Error('Not found')
                    errorNotFound.status = 404
                    next(errorNotFound)
                }
            })
            .catch(error => {
                const errorServer = new Error(`Internal server error: ${error.message}`)
                errorServer.status = 500
                next(errorServer)
            })
    },
    deleteTrain (req, res, next) {
        trainDeleteService(req.body)
            .then(train => {
                req.flash('info', `Train "${train.name}" № "${train.number}" is Deleted`)
                res.redirect('/train/list')
            })
            .catch(error => {
                res.render('pages/train/delete', {
                    train: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}

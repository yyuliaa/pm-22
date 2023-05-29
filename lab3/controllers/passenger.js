'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const passengerListService = require('./../services/passenger.all')
const passengerCreateService = require('./../services/passenger.create')
const passengerByIdService = require("../services/passenger.byId");
const passengerDeleteService = require("../services/passenger.delete");
const passengerUpdateService = require("../services/passenger.update");

module.exports = {
    index (req, res) {
        res.render('pages/passenger/index')
    },
    async passengerList (req, res) {
        try {
            const passengerList = await passengerListService()
            res.render('pages/passenger/list', {
                passengers: passengerList
            })
        } catch (error) {
            res.render('pages/passenger/list', {
                passengers: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createPassengerForm (req, res) {
        res.render('pages/passenger/add')
    },
    postCreatePassenger: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('passport_number')
            .isLength({ min: 1 }).trim().withMessage('Passport number field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('passport_number').escape(),
        async (req, res) => {
            // const success = true
            const passengerData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const passenger = await passengerCreateService(passengerData)
                    req.flash('info', `Passenger "${passenger.surname}" with passport number "${passenger.passport_number}" is Added`)
                    res.redirect('/passenger/list')
                } catch (error) {
                    res.render('pages/passenger/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/passenger/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updatePassengerForm (req, res, next) {
        passengerByIdService(req.params.id)
            .then(passenger => {
                if (passenger) {
                    res.render('pages/passenger/update', { passenger: passenger })
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
    putUpdatePassenger: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('passport_number')
            .isLength({ min: 1 }).trim().withMessage('Passport number field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('passport_number').escape(),
        (req, res, next) => {
            const passengerData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                passengerUpdateService(passengerData)
                    .then(passenger => {
                        req.flash('info', `Passenger "#${passenger.id} ${passenger.name} ${passenger.surname} ${passenger.passport_number}" is Updated`)
                        res.redirect('/passenger/list')
                    })
                    .catch(error => {
                        res.render('pages/passenger/update', {
                            passenger: {},
                            newPassenger: passengerData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/passenger/update', {
                    passenger: {},
                    newPassenger: passengerData,
                    errors: errors.array()
                })
            }
        }
    ],
    deletePassengerFrom (req, res, next) {
        passengerByIdService(req.params.id)
            .then(passenger => {
                if (passenger) {
                    res.render('pages/passenger/delete', { passenger: passenger })
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
    deletePassenger (req, res, next) {
        passengerDeleteService(req.body)
            .then(passenger => {
                req.flash('info', `Passenger "#${passenger.id} ${passenger.name} ${passenger.surname} ${passenger.passport_number}" is Deleted`)
                res.redirect('/passenger/list')
            })
            .catch(error => {
                res.render('pages/passenger/delete', {
                    passenger: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}

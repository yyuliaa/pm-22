'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const passengerAllService = require('./../services/passenger.all')
const trainAllService = require('./../services/train.all')
const ticketAllService = require('./../services/ticket.all')
const ticketCreateService = require('./../services/ticket.create')
const ticketByIdService = require('./../services/ticket.byId')
const ticketUpdateService = require('./../services/ticket.update')
const ticketDeleteService = require("../services/ticket.delete");

module.exports = {
    index (req, res) {
        res.render('pages/ticket/index')
    },
    async ticketList (req, res) {
        try {
            const ticketList = await ticketAllService()
            res.render('pages/ticket/list', { tickets: ticketList })
        } catch (error) {
            res.render('pages/ticket/list', {
                tickets: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createTicketForm (req, res) {
        try {
            const passengers = await passengerAllService()
            const trains = await trainAllService()

            res.render('pages/ticket/add', {
                passengers: passengers,
                trains: trains,
            })
        } catch (error) {
            res.render('pages/ticket/add', {
                passengers: [],
                trains: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    postCreateTicket: [
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('price')
            .isLength({ min: 1 }).trim().withMessage('Price field must be specified and integer.'),
        body('passenger_id')
            .isLength({ min: 1 }).trim().withMessage('Passenger field must be specified.'),
        body('train_id')
            .isLength({ min: 1 }).trim().withMessage('Train field must be specified.'),
        body('place')
            .isLength({ min: 1 }).trim().withMessage('Place field must be specified and integer.'),
        body('date')
            .isLength({ min: 1 }).trim().withMessage('Date field must be specified.'),
        sanitizeBody('number').escape(),
        sanitizeBody('price').escape(),
        sanitizeBody('passenger_id').escape(),
        sanitizeBody('train_id').escape(),
        sanitizeBody('place').escape(),
        sanitizeBody('date').escape(),
        async (req, res) => {
            const ticketData = req.body
            const passengers = await passengerAllService()
            const trains = await trainAllService()
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {

                    const places = trains.filter(train => train.id === ticketData.train_id).map(train => train.places)[0]

                    if(ticketData.place <= 0 || ticketData.place > places){
                        res.render('pages/ticket/add', {
                            passengers: passengers,
                            trains: trains,
                            errors: [{ msg: `Incorrect place` }]
                        })
                    }
                    else{
                        await ticketCreateService(ticketData)
                        req.flash('info', `Ticket №"${ticketData.number}" is Added`)
                        res.redirect('/ticket/list')
                    }


                } catch (error) {
                    res.render('pages/ticket/add', {
                        passengers: passengers,
                        trains: trains,
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/ticket/add', {
                    passengers: passengers,
                    trains: trains,
                    errors: errors.array()
                })
            }
        }
    ],
    async updateTicketForm (req, res, next) {
        try {
            const ticket = await ticketByIdService(req.params.id)
            if (!ticket) {
                const errorServer = new Error('Not found')
                errorServer.status = 404
                next(errorServer)
                return
            }

            const passengers = await passengerAllService()
            const trains = await trainAllService()

            res.render('pages/ticket/update', {
                ticket: ticket,
                passengers: passengers,
                trains: trains,
            })
        } catch (error) {
            const errorServer = new Error(`Internal server error: ${error.message}`)
            errorServer.status = 500
            next(errorServer)
        }
    },
    putUpdateTicket: [
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('price')
            .isLength({ min: 1 }).trim().withMessage('Price field must be specified and integer.'),
        body('passenger_id')
            .isLength({ min: 1 }).trim().withMessage('Passenger field must be specified.'),
        body('train_id')
            .isLength({ min: 1 }).trim().withMessage('Train field must be specified.'),
        body('place')
            .isLength({ min: 1 }).trim().withMessage('Place field must be specified.'),
        body('date')
            .isLength({ min: 1 }).trim().withMessage('Date field must be specified.'),
        sanitizeBody('number').escape(),
        sanitizeBody('price').escape(),
        sanitizeBody('passenger').escape(),
        sanitizeBody('train').escape(),
        sanitizeBody('place').escape(),
        sanitizeBody('date').escape(),
        async (req, res, next) => {
            const ticketData = req.body
            const passengers = await passengerAllService()
            const trains = await trainAllService()

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                try {

                    const places = trains.filter(train => train.id === ticketData.train_id).map(train => train.places)[0]

                    if(ticketData.place <= 0 || ticketData.place > places){
                        res.render('pages/ticket/update', {
                            ticket: {},
                            newTicket: ticketData,
                            passengers: passengers,
                            trains: trains,
                            errors: [{ msg: 'Incorrect place' }]
                        })
                    }
                    else{
                        const updatedTicket = await ticketUpdateService(ticketData)
                        req.flash('info', `Ticket "№${updatedTicket.id} ${updatedTicket.number}" is Updated`)
                        res.redirect('/ticket/list')
                    }
                } catch (error) {
                    res.render('pages/ticket/update', {
                        ticket: {},
                        newTicket: ticketData,
                        passengers: passengers,
                        trains: trains,
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/ticket/update', {
                    ticket: {},
                    newTicket: ticketData,
                    passengers: passengers,
                    trains: trains,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteTicketFrom (req, res, next) {
        ticketByIdService(req.params.id)
            .then(ticket => {
                if (ticket) {
                    res.render('pages/ticket/delete', { ticket: ticket })
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
    deleteTicket (req, res, next) {
        ticketDeleteService(req.body)
            .then(ticket => {
                req.flash('info', `Ticket "#${ticket.id}" is Deleted`)
                res.redirect('/ticket/list')
            })
            .catch(error => {
                res.render('pages/ticket/delete', {
                    ticket: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}

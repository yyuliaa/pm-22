'use strict'

const express = require('express')
const router = express.Router()

const ticketController = require('./../controllers/ticket')

router.get('/', ticketController.index)
router.get('/list', ticketController.ticketList)
router.get('/add', ticketController.createTicketForm)
router.post('/add', ticketController.postCreateTicket)
router.get('/edit/:id', ticketController.updateTicketForm)
router.post('/edit/:id', ticketController.putUpdateTicket)
router.get('/remove/:id', ticketController.deleteTicketFrom)
router.post('/remove/:id', ticketController.deleteTicket)

module.exports = router

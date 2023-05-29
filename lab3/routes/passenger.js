'use strict'

const express = require('express')
const router = express.Router()

const passengerController = require('./../controllers/passenger')

router.get('/', passengerController.index)
router.get('/list', passengerController.passengerList)
router.get('/add', passengerController.createPassengerForm)
router.post('/add', passengerController.postCreatePassenger)
router.get('/edit/:id', passengerController.updatePassengerForm)
router.post('/edit/:id', passengerController.putUpdatePassenger)
router.get('/remove/:id', passengerController.deletePassengerFrom)
router.post('/remove/:id', passengerController.deletePassenger)

module.exports = router

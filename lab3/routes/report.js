'use strict'

const express = require('express')
const router = express.Router()

const reportController = require('./../controllers/report')

router.get('/', reportController.index)
router.get('/most_popular_route', reportController.createReport1Form)
router.get('/most_profitable_route', reportController.createReport2Form)
router.get('/sold_tickets_on_given_train', reportController.createReport3Form)
router.get('/routes_without_sold_tickets', reportController.createReport4Form)

module.exports = router

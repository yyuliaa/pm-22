'use strict'

const express = require('express')
const router = express.Router()

const trainController = require('./../controllers/train')

router.get('/', trainController.index)
router.get('/list', trainController.trainList)
router.get('/add', trainController.createTrainForm)
router.post('/add', trainController.postCreateTrain)
router.get('/edit/:id', trainController.updateTrainForm)
router.post('/edit/:id', trainController.putUpdateTrain)
router.get('/remove/:id', trainController.deleteTrainFrom)
router.post('/remove/:id', trainController.deleteTrain)

module.exports = router

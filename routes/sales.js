const express = require('express')
const router = express.Router()
const salesController = require('../controllers/sales')

router.route('/').get(salesController.getAllSales)

router.route('/').post(salesController.addSales)

router.route('/:time').get(salesController.getSalesByTime)

module.exports = router

const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Sales = require('../models/Sales')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const moment = require('moment')

// Fetch all Sales
/**
 * Get all Sales
 * @returns {Promise<Sales>}
 */
router.get('/', async (req, res) => {
  try {
    const sales = await Sales.findAll()

    if (!sales) {
      return response.status(404).json({
        status_code: 200,
        status: 'No Sales',
      })
    }

    return response.status(200).json({
      status_code: 200,
      status: 'All Sales',
      result: sales,
    })
  } catch (error) {
    console.error(`Add Sales error ==>`, error)
    return response.status(500).json({
      status: 'Internal Server Error',
      message: 'An unexpected error occurred.',
      status_code: 500,
    })
  }
})

/**
 * Add Sales
 * @body {Object: userName, amount, date}
 * @returns {Promise<Sales>}
 */
router.post('/add', async (req, res) => {
  try {
    let { userName, amount, date } = req.body

    const sales = await Sales.create({
      userName,
      amount,
      date,
    })

    return response.status(201).send({
      status_code: 201,
      status: 'Success',
      message: 'Sales created succesfully',
      result: sales,
    })
  } catch (error) {
    console.error(`Add Sales error ==>`, error)
    return response.status(500).json({
      status: 'Internal Server Error',
      message: 'An unexpected error occurred.',
      status_code: 500,
    })
  }
})

/**
 * Get Sales by params
 * @param {Object}
 * @returns {Promise<Sales>}
 */
router.get('/search/:params', async (req, res) => {
  let { daily, weekly, monthly } = req.params
  const currentTime = new Date().getHours()
  try {
    const data = daily
      ? await Sales.findAll({
          where: {
            date: moment(currentTime).subtract(1, 'days').calendar(),
          },
        })
      : weekly
      ? await Sales.findAll({
          where: {
            date: moment(currentTime).subtract(7, 'days').calendar(),
          },
        })
      : monthly
      ? await Sales.findAll({
          where: {
            date: moment(currentTime).subtract(1, 'month').calendar(),
          },
        })
      : response.status(404).json({
          status_code: 404,
          status: 'Not Found',
          message: `No Sales in the past ${req.params}`,
        })

    // Sum amount
    const sumOfAmount = data.map((i) => i.amount).reduce((total, amount) => total + amount)

    return response.status(201).json({
      status_code: 201,
      status: 'Success',
      message: `Sum of Sales in the past ${req.params}`,
      result: sumOfAmount,
    })
  } catch (error) {
    console.error(`Get Sales Error ==>`, error)
    return response.status(500).json({
      status: 'Internal Server Error',
      message: 'An unexpected error occurred.',
      status_code: 500,
    })
  }
})

module.exports = router

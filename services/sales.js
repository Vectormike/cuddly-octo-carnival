const Sales = require('../models/sales')
const db = require('../config/database')
const { catchAsync, ApiError } = require('../utils')
const httpStatus = require('http-status')
const moment = require('moment')
const { Op } = require('sequelize')

// Fetch all Sales
/**
 * Get all Sales
 * @returns {Promise<Sales>}
 */
const getAllSales = async (req, res) => {
  try {
    const sales = await Sales.findAll()
    return sales
  } catch (error) {
    console.error(`Fetch All Sales error ==>`, error)
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    })
  }
}

/**
 * Add Sales
 * @body {Object: userName, amount, date}
 * @returns {Promise<Sales>}
 */
const addSales = async (salesBody) => {
  try {
    const { userName, amount } = salesBody

    // Current date in LLL format
    let date = moment().format('LLL')
    console.log(date)
    const sales = await Sales.create({ userName, amount, date })
    return sales
  } catch (error) {
    console.error(`Add Sales error ==>`, error)
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    })
  }
}

/**
 * Get Sales by params
 * @param {Object}
 * @returns {Promise<Sales>}
 */

const getSalesByTime = async (params) => {
  // const startedDate = new Date('2020-12-12 00:00:00')
  // const endDate = new Date('2020-12-26 00:00:00')

  // Get start and of end of day currently.
  const currentDate = moment().format('LLL')
  console.log(currentDate)
  const startedDate = moment(currentDate).startOf('day').format('LLL')
  console.log(startedDate, 'Started Date')
  const endDate = moment().endOf('day').format('LLL')
  console.log(endDate, 'End date')
  try {
    if (params.time === 'daily') {
      console.log('Hey!')
      const dailySales = await Sales.findAll({ where: { date: { [Op.between]: [currentDate, endDate] } } })
      console.log(dailySales)
      return dailySales
    } else if (params.time === 'weekly') {
      console.log('Hi!')
      //  const weeklySales = await Sales.findAll({ where: { date: { [Op.between]: [startedDate, endDate] } } })
      //  return weeklySales
    } else if (params.time === 'monthly') {
      console.log('Monthly')
      //  const monthlySales = await Sales.findAll({ where: { date: { [Op.between]: [startedDate, endDate] } } })
      //  return monthlySales
    }
  } catch (error) {
    console.error(`Add Sales error ==>`, error)
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    })
  }
}

module.exports = { getAllSales, addSales, getSalesByTime }

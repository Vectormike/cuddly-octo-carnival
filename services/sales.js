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
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred.')
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
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred.')
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
  const endDate = moment().endOf('day').format('LLL')
  const endWeek = moment().endOf('week').format('LLL')
  const endMonth = moment().endOf('month').format('LLL')

  try {
    if (params.time === 'daily') {
      const dailySales = await Sales.findAll({
        where: { date: { [Op.between]: [endDate, currentDate] } },
        logging: console.log,
        raw: true,
        order: [['date', 'ASC']],
      })

      const sumOfSales = dailySales.map((sale) => parseInt(sale.amount)).reduce((acc, amount) => acc + amount, 0)

      return sumOfSales
    } else if (params.time === 'weekly') {
      const weeklySales = await Sales.findAll({
        where: { date: { [Op.between]: [endWeek, currentDate] } },
        logging: console.log,
        raw: true,
        order: [['date', 'ASC']],
      })

      const sumOfSales = weeklySales.map((sale) => parseInt(sale.amount)).reduce((acc, amount) => acc + amount, 0)

      return sumOfSales
    } else if (params.time === 'monthly') {
      const monthly = await Sales.findAll({
        where: { date: { [Op.between]: [endMonth, currentDate] } },
        logging: console.log,
        raw: true,
        order: [['date', 'ASC']],
      })

      const sumOfSales = monthly.map((sale) => parseInt(sale.amount)).reduce((acc, amount) => acc + amount, 0)
      return sumOfSales
    }
  } catch (error) {
    console.error(`Add Sales error ==>`, error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred.')
  }
}

module.exports = { getAllSales, addSales, getSalesByTime }

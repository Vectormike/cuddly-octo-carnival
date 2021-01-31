const { catchAsync, ApiError } = require('../utils')
const httpStatus = require('http-status')
const salesService = require('../services/sales')
const { NOT_FOUND } = require('http-status')

const getAllSales = catchAsync(async (req, res) => {
  const data = await salesService.getAllSales()
  !data ? res.status(httpStatus.NO_CONTENT).json({ message: 'No Sales!' }) : res.status(httpStatus.OK).json({ data })
})

const addSales = catchAsync(async (req, res) => {
  const data = await salesService.addSales(req.body)
  if (!data) {
    return res.status(NOT_FOUND).json({ message: 'Sales not added!' })
  }
  res.status(httpStatus.CREATED).json({ data })
})

const getSalesByTime = catchAsync(async (req, res) => {
  const data = await salesService.getSalesByTime(req.params)
  if (!data) {
    return res.status(NOT_FOUND).json({ message: `No ${req.params.time} Sales` })
  }
  res.status(httpStatus.OK).json({ data })
})
module.exports = { getAllSales, addSales, getSalesByTime }

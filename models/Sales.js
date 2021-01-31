const Sequelize = require('sequelize')
const { sequelize } = require('../config/database')

const Sales = sequelize.define('sales', {
  userName: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
})

Sales.sync().then(() => {
  console.log('table created')
})
module.exports = Sales

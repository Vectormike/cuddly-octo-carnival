const Sequelize = require('sequelize')
const db = require('../config/database')

const Sales = db.define('sales', {
  userName: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.NUMBER,
  },
  date: {
    type: Sequelize.DATE,
  },
})

Sales.sync().then(() => {
  console.log('table created')
})
module.exports = Sales

const express = require('express')
const app = express()
const { ApiError } = require('./utils')
const httpStatus = require('http-status')
// Database
const { sequelize } = require('./config/database')

// console.log(db)

// Test DB
let connectDB = async () => {
  try {
    // console.log(sequelize.authenticate())
    await sequelize.authenticate()
    console.log('Database connected...')
  } catch (error) {
    console.error('Error connecting to the Database', error)
  }
}

connectDB()

// Body Parser
app.use(express.json())

// Test route
app.get('/test', (req, res) => res.send('test'))

// Sales routes
app.use('/sales', require('./routes/sales'))

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'API request not found'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))

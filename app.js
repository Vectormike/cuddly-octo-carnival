const express = require('express')
const app = express()

// Database
const db = require('./config/database')

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err))

// Body Parser
app.use(express.urlencoded({ extended: false }))

// Index route
app.get('/', (req, res) => res.send('test'))

// Gig routes
app.use('/sales', require('./routes/sales'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))

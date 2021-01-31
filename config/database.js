const Sequelize = require('sequelize')

// dotenv.config()

// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })
const sequelize = new Sequelize('segwitz', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'postgres',
  port: 5432,
  freezeTableName: true,
  operatorsAliases: false,
})

module.exports = { sequelize }

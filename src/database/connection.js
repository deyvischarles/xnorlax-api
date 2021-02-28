import Sequelize from 'sequelize'
import database from '../config/database.js'

const connection = new Sequelize(database)

export default connection
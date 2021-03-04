import 'reflect-metadata';
import {createConnection} from 'typeorm'

createConnection({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSOWRD,
    database: process.env.DATABASE
})

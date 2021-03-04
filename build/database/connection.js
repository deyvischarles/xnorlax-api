"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
typeorm_1.createConnection({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSOWRD,
    database: process.env.DATABASE
});
//# sourceMappingURL=connection.js.map
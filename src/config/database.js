export default {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    database: process.env.DB,
    username: process.env.USER,
    passowrd: process.env.PASSOWRD,
    define: {
        timestamps: true,
        underscored: true,
    }
}
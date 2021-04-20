"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import User from './routes/user'
var routes = express_1.Router();
routes.get('/', function (req, res) {
    res.json({
        message: 'Bem-vindo(a) a Api Xnorlax (by Deyvis Charles: github.com/deyvischarles, linkedin.com/in/deyvischarles)'
    });
});
routes.get('/blog', function (req, res) {
    res.json({
        message: 'Blog'
    });
});
// routes.post('/register', User.register)
exports["default"] = routes;
//# sourceMappingURL=routes.js.map
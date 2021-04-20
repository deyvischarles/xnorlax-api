"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_1 = __importDefault(require("./routes/user"));
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
routes.post('/register', user_1["default"].register);
exports["default"] = routes;
//# sourceMappingURL=routes.js.map
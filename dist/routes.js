"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var home_1 = __importDefault(require("./routes/home"));
var blog_1 = __importDefault(require("./routes/blog"));
var user_1 = __importDefault(require("./routes/user"));
var routes = express_1.Router();
routes.get('/', home_1["default"].index);
routes.get('/blog', blog_1["default"].index);
routes.post('/register', user_1["default"].register);
exports["default"] = routes;
//# sourceMappingURL=routes.js.map
"use strict";
exports.__esModule = true;
var Home = /** @class */ (function () {
    function Home() {
    }
    Home.prototype.index = function (req, res) {
        res.send({
            message: 'Bem-vindo(a) a Api Xnorlax (by Deyvis Charles: github.com/deyvischarles, linkedin.com/in/deyvischarles)'
        });
    };
    return Home;
}());
exports["default"] = new Home;
//# sourceMappingURL=home.js.map
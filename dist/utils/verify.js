"use strict";
exports.__esModule = true;
var Verify = /** @class */ (function () {
    function Verify() {
    }
    Verify.prototype.isEmpyt = function (imput) {
        var sanitize = imput ? imput.trim() : undefined;
        var outpt = sanitize;
        if (!outpt || typeof outpt == undefined || outpt == null) {
            return true;
        }
        else {
            return false;
        }
    };
    Verify.prototype.minLength = function (imput, min) {
        var sanitize = imput.trim();
        var outpt = sanitize;
        if (outpt.length < min) {
            return true;
        }
        else {
            return false;
        }
    };
    Verify.prototype.maxLength = function (imput, max) {
        var sanitize = imput.trim();
        var outpt = sanitize;
        if (outpt.length > max) {
            return true;
        }
        else {
            return false;
        }
    };
    Verify.prototype.notName = function (imput) {
        var sanitize = imput.trim();
        var name = sanitize;
        var regex = /^([áàÁÀéèÉÈíìÍÌóÒúùÚÙa-zA-Z])([áàÁÀéèÉÈíìÍÌóÒúùÚÙ a-zA-Z]){3,}$/;
        if (RegExp(regex).test(name) == false) {
            return true;
        }
        else {
            return false;
        }
    };
    Verify.prototype.notEmail = function (imput) {
        var sanitize = imput.trim();
        var email = sanitize;
        var regex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*[@][a-zA-Z0-9_]*[.][a-zA-Z]{2,}$/;
        if (RegExp(regex).test(email) == false) {
            return true;
        }
        else {
            return false;
        }
    };
    Verify.prototype.notSecurity = function (imput) {
        var sanitize = imput.trim();
        var password = sanitize;
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ @#$%&*_^])[0-9a-zA-Z @#$%&*_^]{8,}$/;
        if (RegExp(regex).test(password) == false) {
            return true;
        }
        else {
            return false;
        }
    };
    return Verify;
}());
exports["default"] = new Verify;
//# sourceMappingURL=verify.js.map
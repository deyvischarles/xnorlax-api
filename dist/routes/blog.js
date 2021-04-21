"use strict";
exports.__esModule = true;
var Blog = /** @class */ (function () {
    function Blog() {
    }
    Blog.prototype.index = function (req, res) {
        res.send({
            message: 'Blog'
        });
    };
    return Blog;
}());
exports["default"] = new Blog;
//# sourceMappingURL=blog.js.map
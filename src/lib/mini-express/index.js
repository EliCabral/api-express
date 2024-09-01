"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniExpress = void 0;
var http = require("http");
var MiniExpress = /** @class */ (function () {
    function MiniExpress() {
        this.middlewares = [];
    }
    MiniExpress.prototype.use = function (handler) {
        this.middlewares.push(handler);
    };
    MiniExpress.prototype.listen = function (port, callback) {
        var _this = this;
        var server = http.createServer(function (req, res) {
            var idx = 0; //inicializa o indice para rastrear qual middleware está sendo executado
            var next = function () {
                // se o indice atual for menor do que o total de middleware registrado..
                if (idx < _this.middlewares.length) {
                    // obtem o prox middleware da lista
                    var handler = _this.middlewares[idx++];
                    // chamar o middleware atual, passando req, res e a propria funcao next
                    handler(req, res, next);
                }
                else {
                    res.end();
                }
            };
            next();
        });
        server.listen(port, callback);
    };
    return MiniExpress;
}());
exports.MiniExpress = MiniExpress;

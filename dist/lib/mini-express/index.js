"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniExpress = void 0;
const http = __importStar(require("http"));
class MiniExpress {
    constructor() {
        this.middlewares = [];
    }
    use(handler) {
        this.middlewares.push(handler);
    }
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            let idx = 0; //inicializa o indice para rastrear qual middleware está sendo executado
            const next = () => {
                // se o indice atual for menor do que o total de middleware registrado..
                if (idx < this.middlewares.length) {
                    // obtem o prox middleware da lista
                    const handler = this.middlewares[idx++];
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
    }
}
exports.MiniExpress = MiniExpress;

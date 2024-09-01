"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mini_express_1 = require("./lib/mini-express");
var app = new mini_express_1.MiniExpres();
// middleware 1: registra o método e a URL de requisição (cria log)
app.use(function (req, res, next) {
    console.log("Request: ".concat(req.method, " ").concat(req.url));
    if (next)
        next();
});
// middleware 2: verifica a autenticação(simulação)
app.use(function (req, res, next) {
    var authenticated = true;
    if (authenticated) {
        if (next)
            next();
    }
    else {
        res.statusCode = 401;
        res.end('Not authenticated'); // encerra a resposta se não autenticado
    }
});
// middleware 3: manipula a rota raiz "/"
app.use(function (req, res, next) {
    if (req.url === '/') {
        res.write("Welcome to the home page");
        res.end;
    }
    else {
        if (next)
            next();
    }
});
// middleware 4: manipula a rota "/about"
app.use(function (req, res, next) {
    if (req.url === '/about') {
        res.write("Pagina about");
        res.end;
    }
    else {
        if (next)
            next();
    }
});
// middleware final: manipula todas as outras rotas
app.use(function (req, res) {
    res.statusCode = 404;
    res.end("404 Not found");
});
app.listen(3000, function () { return console.log('Servidor rodando em http://localhost:3000'); });

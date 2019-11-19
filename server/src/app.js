"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cookie_parser_1 = require("cookie-parser");
var compression_1 = require("compression");
var routes_1 = require("./api/routes");
var app = express_1["default"]();
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
app.use(cookie_parser_1["default"]());
app.use(compression_1["default"]());
/**
 * Enable CORS in dev
 */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use(routes_1["default"]);
app.listen(8080, function () {
    console.log('*** FILET DE LUMIERE APII ***');
});

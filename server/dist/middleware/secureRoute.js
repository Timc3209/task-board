"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../lib/config");
const secureRoute = (req, resp, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return resp.status(http_status_codes_1.UNAUTHORIZED).json({
            status: false,
            error: "no token found...",
        });
    }
    jsonwebtoken_1.verify(token, config_1.default.jwtSecret, (err, auth) => {
        if (err) {
            return resp.status(http_status_codes_1.UNAUTHORIZED).json({
                status: false,
                error: "no token found...",
            });
        }
        req.body.token = token;
        req.body.auth = auth;
        next();
    });
};
exports.default = secureRoute;
//# sourceMappingURL=secureRoute.js.map
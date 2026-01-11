"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../helper/catchAsync");
const validateRequest = (schema) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    });
};
exports.default = validateRequest;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = require("../helper/catchAsync");
const token_1 = require("../utils/token");
const index_1 = __importDefault(require("../config/index"));
const auth = (...roles) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        let token;
        token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this resource");
        }
        const decoded = token_1.TokenUtils.VerifyToken(token, index_1.default.jwt.jwt_access_secret);
        const role = decoded.role;
        if (roles.length && !roles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You do not have permission to access this resource");
        }
        req.user = decoded;
        next();
    });
};
exports.default = auth;

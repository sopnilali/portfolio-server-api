"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const index_1 = __importDefault(require("../../config/index"));
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.userLogin(req.body);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: index_1.default.node_env === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        data: {
            accessToken: result.accessToken,
        },
    });
});
const logoutUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            message: "Refresh token not found",
            statusCode: http_status_1.default.UNAUTHORIZED,
        });
    }
    await auth_service_1.AuthService.logoutUser();
    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
        secure: false,
        httpOnly: true
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User logged out successfully",
        statusCode: http_status_1.default.OK,
    });
});
exports.AuthController = {
    loginUser,
    logoutUser,
};

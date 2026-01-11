"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const user_service_1 = require("./user.service");
const pick_1 = __importDefault(require("../../utils/pick"));
const user_constant_1 = require("./user.constant");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.createUser(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User Created Successfully!",
        data: result
    });
});
const getAllUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, user_constant_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await user_service_1.UserService.getAllUser(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.getSingleUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: result,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.updateUser(req.params.id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User updated successfully",
        statusCode: 200,
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: result,
    });
});
const SoftdeleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.SoftdeleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: result,
    });
});
exports.UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    SoftdeleteUser
};

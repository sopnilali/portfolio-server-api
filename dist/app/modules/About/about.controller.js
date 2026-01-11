"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutController = void 0;
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const about_service_1 = require("./about.service");
const createAbout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await about_service_1.aboutService.createAboutfromDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "About created successfully",
        statusCode: 200,
        data: result
    });
});
const GetAllAbout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await about_service_1.aboutService.GetAllAboutfromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "About updated successfully",
        statusCode: 200,
        data: result
    });
});
const updateAbout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await about_service_1.aboutService.updateAboutfromDB(req.params.id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "About updated successfully",
        statusCode: 200,
        data: result
    });
});
exports.aboutController = {
    GetAllAbout, updateAbout,
    createAbout
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const menu_service_1 = require("./menu.service");
const createMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuService.createMenu(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Menu created successfully",
        statusCode: 200,
        data: result,
    });
});
const getAllMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuService.getAllMenu();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Menus fetched successfully",
        statusCode: 200,
        data: result,
    });
});
const getAllMenuAdmin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuService.getAllMenuAdmin();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Menus fetched successfully",
        statusCode: 200,
        data: result,
    });
});
const getSingleMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuService.getSingleMenu(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Menu fetched successfully",
        statusCode: 200,
        data: result,
    });
});
const updateMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuService.updateMenu(req.params.id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Menu updated successfully",
        statusCode: 200,
        data: result,
    });
});
const deleteMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuService.deleteMenu(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Menu deleted successfully",
        statusCode: 200,
        data: result,
    });
});
exports.MenuController = {
    createMenu,
    getAllMenu,
    getAllMenuAdmin,
    getSingleMenu,
    updateMenu,
    deleteMenu,
};

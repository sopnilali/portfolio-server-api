"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const fileUploader_1 = require("../../helper/fileUploader");
const menu_controller_1 = require("./menu.controller");
const router = express_1.default.Router();
const parseMenuBody = (req) => {
    if (typeof req.body?.data === "string") {
        req.body = JSON.parse(req.body.data);
    }
};
router.post("/", (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.parseFormData.none(), (req, res, next) => {
    parseMenuBody(req);
    return menu_controller_1.MenuController.createMenu(req, res, next);
});
router.get("/", menu_controller_1.MenuController.getAllMenu);
router.get("/admin", (0, auth_1.default)(client_1.UserRole.Admin), menu_controller_1.MenuController.getAllMenuAdmin);
router.get("/:id", menu_controller_1.MenuController.getSingleMenu);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.parseFormData.none(), (req, res, next) => {
    parseMenuBody(req);
    return menu_controller_1.MenuController.updateMenu(req, res, next);
});
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.Admin), menu_controller_1.MenuController.deleteMenu);
exports.MenuRoutes = router;

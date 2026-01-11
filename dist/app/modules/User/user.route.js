"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploader_1 = require("../../helper/fileUploader");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/', fileUploader_1.FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.UserController.createUser(req, res, next);
});
router.get('/', (0, auth_1.default)(client_1.UserRole.Admin), user_controller_1.UserController.getAllUser);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.Admin, client_1.UserRole.User), user_controller_1.UserController.getSingleUser);
router.patch('/:id', fileUploader_1.FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.UserController.updateUser(req, res, next);
});
router.delete('/:id', user_controller_1.UserController.deleteUser);
router.delete('/soft/:id', (0, auth_1.default)(client_1.UserRole.Admin), user_controller_1.UserController.SoftdeleteUser);
exports.UserRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aboutroutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../helper/fileUploader");
const about_controller_1 = require("./about.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return about_controller_1.aboutController.createAbout(req, res, next);
});
router.get('/', (req, res, next) => {
    return about_controller_1.aboutController.GetAllAbout(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return about_controller_1.aboutController.updateAbout(req, res, next);
});
exports.Aboutroutes = router;

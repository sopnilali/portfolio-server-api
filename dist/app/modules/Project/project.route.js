"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../helper/fileUploader");
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return project_controller_1.ProjectController.createProject(req, res, next);
});
router.get('/', (req, res, next) => {
    return project_controller_1.ProjectController.getAllProject(req, res, next);
});
router.get('/:id', (req, res, next) => {
    return project_controller_1.ProjectController.getSingleProject(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return project_controller_1.ProjectController.updateProject(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.Admin), (req, res, next) => {
    return project_controller_1.ProjectController.deleteProject(req, res, next);
});
exports.ProjectRoutes = router;

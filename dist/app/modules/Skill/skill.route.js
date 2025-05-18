"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const skill_controller_1 = require("./skill.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../helper/fileUploader");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return skill_controller_1.SkillController.createSkill(req, res, next);
});
router.get("/", skill_controller_1.SkillController.getAllSkill); // public route
router.get("/:id", skill_controller_1.SkillController.getSingleSkill); // public route
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.Admin), fileUploader_1.FileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return skill_controller_1.SkillController.updateSkill(req, res, next);
});
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.Admin), skill_controller_1.SkillController.deleteSkill);
exports.SkillRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const experience_controller_1 = require("./experience.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRole.Admin), experience_controller_1.ExperienceController.createExperience);
router.get('/', experience_controller_1.ExperienceController.getAllExperience); // public route
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.Admin), experience_controller_1.ExperienceController.updateExperience);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.Admin), experience_controller_1.ExperienceController.deleteExperience);
exports.ExperienceRoutes = router;

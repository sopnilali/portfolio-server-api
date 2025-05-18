"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", contact_controller_1.ContactController.createContact); // public route
router.get("/", contact_controller_1.ContactController.getAllContact); // public route
router.put("/:id", (0, auth_1.default)(client_1.UserRole.Admin), contact_controller_1.ContactController.updateContact);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.Admin), contact_controller_1.ContactController.deleteContact);
exports.ContactRoutes = router;

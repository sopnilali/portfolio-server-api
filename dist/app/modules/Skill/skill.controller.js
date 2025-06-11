"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = void 0;
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const skill_service_1 = require("./skill.service");
const createSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.SkillService.createSkill(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Skill created successfully",
        statusCode: 200,
        data: result
    });
});
const getAllSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.SkillService.getAllSkill();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Skill fetched successfully",
        statusCode: 200,
        data: result
    });
});
const getSingleSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.SkillService.getSingleSkill(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Skill fetched successfully",
        statusCode: 200,
        data: result
    });
});
const updateSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.SkillService.updateSkill(req.params.id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Skill updated successfully",
        statusCode: 200,
        data: result
    });
});
const deleteSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await skill_service_1.SkillService.deleteSkill(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Skill deleted successfully",
        statusCode: 200,
        data: result
    });
});
exports.SkillController = {
    createSkill, getAllSkill, getSingleSkill, updateSkill, deleteSkill
};

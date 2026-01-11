"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceController = void 0;
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const experience_service_1 = require("./experience.service");
const createExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.ExperienceService.createExperience(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience created successfully",
        statusCode: 200,
        data: result
    });
});
const getAllExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.ExperienceService.getAllExperience();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experiences fetched successfully",
        statusCode: 200,
        data: result
    });
});
const updateExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.ExperienceService.updateExperience(req.params.id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience updated successfully",
        statusCode: 200,
        data: result
    });
});
const deleteExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.ExperienceService.deleteExperience(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience deleted successfully",
        statusCode: 200,
        data: result
    });
});
exports.ExperienceController = {
    createExperience,
    getAllExperience,
    updateExperience,
    deleteExperience
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createExperience = async (req) => {
    const result = await prisma_1.default.$transaction(async (tx) => {
        // Create new record
        const newRecord = await tx.experience.create({
            data: req.body
        });
        return newRecord;
    });
    return result;
};
const getAllExperience = async () => {
    const result = await prisma_1.default.experience.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const updateExperience = async (id, req) => {
    const result = await prisma_1.default.experience.update({
        where: { id },
        data: req.body
    });
    return result;
};
const deleteExperience = async (id) => {
    const result = await prisma_1.default.experience.delete({
        where: { id }
    });
    return result;
};
exports.ExperienceService = {
    createExperience,
    getAllExperience,
    updateExperience,
    deleteExperience
};

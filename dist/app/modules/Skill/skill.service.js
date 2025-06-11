"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createSkill = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.icon = uploadfile?.secure_url;
    }
    const result = await prisma_1.default.skill.create({
        data: req.body
    });
    return result;
};
const getAllSkill = async () => {
    const result = await prisma_1.default.skill.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const getSingleSkill = async (id) => {
    const result = await prisma_1.default.skill.findUnique({
        where: {
            id
        }
    });
    return result;
};
const updateSkill = async (id, req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.icon = uploadfile?.secure_url;
    }
    const result = await prisma_1.default.skill.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
};
const deleteSkill = async (id) => {
    const result = await prisma_1.default.skill.delete({
        where: {
            id
        }
    });
    return result;
};
exports.SkillService = { createSkill, getAllSkill, getSingleSkill, updateSkill, deleteSkill };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createProject = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    const result = await prisma_1.default.$transaction(async (tx) => {
        // Create new record
        const newRecord = await tx.project.create({
            data: req.body
        });
        return newRecord;
    });
    return result;
};
const getAllProject = async () => {
    const result = await prisma_1.default.project.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const getSingleProject = async (id) => {
    const result = await prisma_1.default.project.findUnique({
        where: {
            id,
        }
    });
    return result;
};
const updateProject = async (id, req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    const result = await prisma_1.default.project.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
};
const deleteProject = async (id) => {
    const result = await prisma_1.default.project.delete({
        where: {
            id
        }
    });
    return result;
};
exports.ProjectService = {
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
};

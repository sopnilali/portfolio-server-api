"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutService = void 0;
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createAboutfromDB = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    const result = await prisma_1.default.about.create({
        data: req.body
    });
    return result;
};
const GetAllAboutfromDB = async () => {
    const result = await prisma_1.default.about.findMany();
    return result;
};
const updateAboutfromDB = async (id, req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    // Extract only the fields that are allowed (exclude auto-generated fields)
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const result = await prisma_1.default.about.update({
        where: {
            id
        },
        data: {
            ...(data.nameTitle !== undefined && { nameTitle: data.nameTitle }),
            ...(data.professonName !== undefined && { professonName: data.professonName }),
            ...(data.shortdescription !== undefined && { shortdescription: data.shortdescription }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        }
    });
    return result;
};
exports.aboutService = {
    createAboutfromDB,
    updateAboutfromDB,
    GetAllAboutfromDB
};

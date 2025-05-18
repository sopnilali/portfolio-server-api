"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createProject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadfile = yield fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile === null || uploadfile === void 0 ? void 0 : uploadfile.secure_url;
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Create new record
        const newRecord = yield tx.project.create({
            data: req.body
        });
        return newRecord;
    }));
    return result;
});
const getAllProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const getSingleProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.findUnique({
        where: {
            id,
        }
    });
    return result;
});
const updateProject = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadfile = yield fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile === null || uploadfile === void 0 ? void 0 : uploadfile.secure_url;
    }
    const result = yield prisma_1.default.project.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.delete({
        where: {
            id
        }
    });
    return result;
});
exports.ProjectService = {
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
};

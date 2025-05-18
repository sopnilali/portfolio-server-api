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
exports.SkillService = void 0;
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createSkill = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadfile = yield fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.icon = uploadfile === null || uploadfile === void 0 ? void 0 : uploadfile.secure_url;
    }
    const result = yield prisma_1.default.skill.create({
        data: req.body
    });
    return result;
});
const getAllSkill = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.skill.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const getSingleSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.skill.findUnique({
        where: {
            id
        }
    });
    return result;
});
const updateSkill = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadfile = yield fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.icon = uploadfile === null || uploadfile === void 0 ? void 0 : uploadfile.secure_url;
    }
    const result = yield prisma_1.default.skill.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
});
const deleteSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.skill.delete({
        where: {
            id
        }
    });
    return result;
});
exports.SkillService = { createSkill, getAllSkill, getSingleSkill, updateSkill, deleteSkill };

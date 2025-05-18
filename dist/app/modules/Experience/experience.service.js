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
exports.ExperienceService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createExperience = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Create new record
        const newRecord = yield tx.experience.create({
            data: req.body
        });
        return newRecord;
    }));
    return result;
});
const getAllExperience = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.experience.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const updateExperience = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.experience.update({
        where: { id },
        data: req.body
    });
    return result;
});
const deleteExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.experience.delete({
        where: { id }
    });
    return result;
});
exports.ExperienceService = {
    createExperience,
    getAllExperience,
    updateExperience,
    deleteExperience
};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const fileUploader_1 = require("../../helper/fileUploader");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt = __importStar(require("bcrypt"));
const index_1 = __importDefault(require("../../config/index"));
const user_constant_1 = require("./user.constant");
const paginationHelper_1 = require("../../helper/paginationHelper");
const createUser = async (req) => {
    const file = req.file;
    if (file) {
        const uploadFile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.avaterUrl = uploadFile?.secure_url;
    }
    const hashPassword = await bcrypt.hash(req.body.password, index_1.default.saltRounds);
    req.body.password = hashPassword;
    const result = await prisma_1.default.user.create({
        data: req.body
    });
    return result;
};
const getAllUser = async (params, options) => {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: user_constant_1.userSearchAbleFields.map(filed => ({
                [filed]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereConditons = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = await prisma_1.default.user.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avaterUrl: true,
            status: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const total = await prisma_1.default.user.count({
        where: whereConditons,
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};
const getSingleUser = async (id) => {
    const result = await prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    return result;
};
const updateUser = async (id, req) => {
    const file = req.file;
    if (file) {
        const result = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.profilePhoto = result?.secure_url;
    }
    const updatehas = await bcrypt.hash(req.body.password, index_1.default.saltRounds);
    req.body.password = updatehas;
    const result = await prisma_1.default.user.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
};
const deleteUser = async (id) => {
    const result = await prisma_1.default.user.delete({
        where: {
            id
        }
    });
    return result;
};
const SoftdeleteUser = async (id) => {
    const existUser = await prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    if (!existUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Not Found");
    }
    const result = await prisma_1.default.user.update({
        where: { id },
        data: {
            isDeleted: true
        }
    });
    return result;
};
exports.UserService = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    SoftdeleteUser
};

import prisma from "../../utils/prisma";
import { FileUploader } from "../../helper/fileUploader";
import AppError from "../../errors/AppError";
import status from "http-status";
import * as bcrypt from "bcrypt";
import config from "../../config";
import { userSearchAbleFields } from "./user.constant";
import { paginationHelper } from "../../helper/paginationHelper";
const createUser = async (req) => {
    const file = req.file;
    if (file) {
        const uploadFile = await FileUploader.uploadToCloudinary(file);
        req.body.avaterUrl = uploadFile?.secure_url;
    }
    const hashPassword = await bcrypt.hash(req.body.password, config.saltRounds);
    req.body.password = hashPassword;
    const result = await prisma.user.create({
        data: req.body
    });
    return result;
};
const getAllUser = async (params, options) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: userSearchAbleFields.map(filed => ({
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
    const result = await prisma.user.findMany({
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
    const total = await prisma.user.count({
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
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return result;
};
const updateUser = async (id, req) => {
    const file = req.file;
    if (file) {
        const result = await FileUploader.uploadToCloudinary(file);
        req.body.profilePhoto = result?.secure_url;
    }
    const updatehas = await bcrypt.hash(req.body.password, config.saltRounds);
    req.body.password = updatehas;
    const result = await prisma.user.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
};
const deleteUser = async (id) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    });
    return result;
};
const SoftdeleteUser = async (id) => {
    const existUser = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!existUser) {
        throw new AppError(status.BAD_REQUEST, "User Not Found");
    }
    const result = await prisma.user.update({
        where: { id },
        data: {
            isDeleted: true
        }
    });
    return result;
};
export const UserService = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    SoftdeleteUser
};

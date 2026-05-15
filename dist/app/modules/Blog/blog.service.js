"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createBlog = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    const { title, shortdescription, content, tags, imageUrl, status } = req.body;
    const result = await prisma_1.default.blog.create({
        data: {
            title,
            shortdescription,
            content,
            tags,
            imageUrl,
            status,
            userId: req.user.id,
        },
    });
    return result;
};
const getAllBlog = async () => {
    const result = await prisma_1.default.blog.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    avaterUrl: true,
                    role: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const getSingleBlog = async (id) => {
    const result = await prisma_1.default.blog.findUnique({
        where: { id },
        include: {
            user: true
        }
    });
    return result;
};
const updateBlog = async (id, req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await fileUploader_1.FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    const { id: _, createdAt, updatedAt, user, userId, ...data } = req.body;
    const result = await prisma_1.default.blog.update({
        where: { id },
        data: {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.shortdescription !== undefined && { shortdescription: data.shortdescription }),
            ...(data.content !== undefined && { content: data.content }),
            ...(data.tags !== undefined && { tags: data.tags }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
            ...(data.status !== undefined && { status: data.status }),
        },
    });
    return result;
};
const deleteBlog = async (id) => {
    const result = await prisma_1.default.blog.delete({
        where: { id }
    });
    return result;
};
const editorUpload = async (req) => {
    const result = await fileUploader_1.FileUploader.uploadEditorFileToCloudinary(req.file);
    return result;
};
exports.BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    editorUpload
};

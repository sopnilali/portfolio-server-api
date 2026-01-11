import { FileUploader } from "../../helper/fileUploader.js";
import prisma from "../../utils/prisma.js";
const createBlog = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file);
        req.body.thumbnail = uploadfile?.secure_url;
    }
    const result = await prisma.blog.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    });
    return result;
};
const getAllBlog = async () => {
    const result = await prisma.blog.findMany({
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
    const result = await prisma.blog.findUnique({
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
        const uploadfile = await FileUploader.uploadToCloudinary(file);
        req.body.thumbnail = uploadfile?.secure_url;
    }
    const result = await prisma.blog.update({
        where: { id },
        data: req.body
    });
    return result;
};
const deleteBlog = async (id) => {
    const result = await prisma.blog.delete({
        where: { id }
    });
    return result;
};
const editorUpload = async (req) => {
    const result = await FileUploader.uploadEditorFileToCloudinary(req.file);
    return result;
};
export const BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    editorUpload
};

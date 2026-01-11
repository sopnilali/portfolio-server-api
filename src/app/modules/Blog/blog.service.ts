import { FileUploader } from "../../helper/fileUploader.js"
import prisma from "../../utils/prisma.js"

const createBlog = async (req: any) => {

    const file = req.file
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file)
        req.body.thumbnail = uploadfile?.secure_url
    }

    const result = await prisma.blog.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })
    return result
}

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
    })
    return result
}

const getSingleBlog = async (id: string) => {
    const result = await prisma.blog.findUnique({
        where: { id },
        include: {
            user: true
        }
    })
    return result
}
const updateBlog = async (id: string, req: any) => {

    const file = req.file
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file)
        req.body.thumbnail = uploadfile?.secure_url
    }

    const result = await prisma.blog.update({
        where: { id },
        data: req.body
    })
    return result
}

const deleteBlog = async (id: string) => {
    const result = await prisma.blog.delete({
        where: { id }
    })
    return result
}

const editorUpload = async (req: any) => {
    const result = await FileUploader.uploadEditorFileToCloudinary(req.file)
    return result
}

export const BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    editorUpload
}

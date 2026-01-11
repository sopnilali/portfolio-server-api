import { FileUploader } from "../../helper/fileUploader.js";
import prisma from "../../utils/prisma.js";
const createSkill = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file);
        req.body.icon = uploadfile?.secure_url;
    }
    const result = await prisma.skill.create({
        data: req.body
    });
    return result;
};
const getAllSkill = async () => {
    const result = await prisma.skill.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const getSingleSkill = async (id) => {
    const result = await prisma.skill.findUnique({
        where: {
            id
        }
    });
    return result;
};
const updateSkill = async (id, req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file);
        req.body.icon = uploadfile?.secure_url;
    }
    const result = await prisma.skill.update({
        where: {
            id
        },
        data: req.body
    });
    return result;
};
const deleteSkill = async (id) => {
    const result = await prisma.skill.delete({
        where: {
            id
        }
    });
    return result;
};
export const SkillService = { createSkill, getAllSkill, getSingleSkill, updateSkill, deleteSkill };

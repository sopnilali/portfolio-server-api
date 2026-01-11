import { FileUploader } from "../../helper/fileUploader";
import prisma from "../../utils/prisma";
const createAboutfromDB = async (req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    const result = await prisma.about.create({
        data: req.body
    });
    return result;
};
const GetAllAboutfromDB = async () => {
    const result = await prisma.about.findMany();
    return result;
};
const updateAboutfromDB = async (id, req) => {
    const file = req.file;
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file);
        req.body.imageUrl = uploadfile?.secure_url;
    }
    // Extract only the fields that are allowed (exclude auto-generated fields)
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const result = await prisma.about.update({
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
export const aboutService = {
    createAboutfromDB,
    updateAboutfromDB,
    GetAllAboutfromDB
};

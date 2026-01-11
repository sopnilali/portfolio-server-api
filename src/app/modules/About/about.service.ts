import { FileUploader } from "../../helper/fileUploader"
import prisma from "../../utils/prisma"


const createAboutfromDB = async (req: any) => {
    const file = req.file
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file)
        req.body.imageUrl = uploadfile?.secure_url
    }

    const result = await prisma.$transaction(async (tx) => {
        // Create new record
        const newRecord = await tx.about.create({
            data: req.body
        })

        return newRecord
    })

    return result
}

const GetAboutfromDB = async ()=> {
    const result = await prisma.project.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return result
}

const updateAboutfromDB = async (id: string, req: any) => {
    const file = req.file
    if (file) {
        const uploadfile = await FileUploader.uploadToCloudinary(file)
        req.body.imageUrl = uploadfile?.secure_url
    }
    const result = await prisma.project.update({
        where: {
            id
        },
        data: req.body
    })
    return result

}



export const aboutService = {
    createAboutfromDB,
    updateAboutfromDB
}
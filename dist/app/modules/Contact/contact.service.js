import prisma from "../../utils/prisma";
const createContact = async (req) => {
    const result = await prisma.contact.create({
        data: req.body
    });
    return result;
};
const getAllContact = async () => {
    const result = await prisma.contact.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const updateContact = async (id, req) => {
    const result = await prisma.contact.update({
        where: { id },
        data: req.body
    });
    return result;
};
const deleteContact = async (id) => {
    const result = await prisma.contact.delete({
        where: { id }
    });
    return result;
};
export const ContactService = {
    createContact,
    getAllContact,
    updateContact,
    deleteContact
};

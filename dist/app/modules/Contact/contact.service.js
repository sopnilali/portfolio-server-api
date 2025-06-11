"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createContact = async (req) => {
    const result = await prisma_1.default.contact.create({
        data: req.body
    });
    return result;
};
const getAllContact = async () => {
    const result = await prisma_1.default.contact.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};
const updateContact = async (id, req) => {
    const result = await prisma_1.default.contact.update({
        where: { id },
        data: req.body
    });
    return result;
};
const deleteContact = async (id) => {
    const result = await prisma_1.default.contact.delete({
        where: { id }
    });
    return result;
};
exports.ContactService = {
    createContact,
    getAllContact,
    updateContact,
    deleteContact
};

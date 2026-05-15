"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createMenu = async (req) => {
    const body = Array.isArray(req.body)
        ? req.body
        : Array.isArray(req.body?.data)
            ? req.body.data
            : null;
    if (body) {
        const result = await prisma_1.default.menu.createMany({
            data: body.map((item) => ({
                label: item.label,
                path: item.path,
                order: item.order ?? 0,
                isActive: item.isActive ?? true,
                isExternal: item.isExternal ?? false,
            })),
        });
        return result;
    }
    const result = await prisma_1.default.menu.create({
        data: req.body,
    });
    return result;
};
const getAllMenu = async () => {
    const result = await prisma_1.default.menu.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });
    return result;
};
const getAllMenuAdmin = async () => {
    const result = await prisma_1.default.menu.findMany({
        orderBy: { order: "asc" },
    });
    return result;
};
const getSingleMenu = async (id) => {
    const result = await prisma_1.default.menu.findUnique({
        where: { id },
    });
    return result;
};
const updateMenu = async (id, req) => {
    const { id: _, createdAt, updatedAt, ...data } = req.body;
    const result = await prisma_1.default.menu.update({
        where: { id },
        data: {
            ...(data.label !== undefined && { label: data.label }),
            ...(data.path !== undefined && { path: data.path }),
            ...(data.order !== undefined && { order: data.order }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
            ...(data.isExternal !== undefined && { isExternal: data.isExternal }),
        },
    });
    return result;
};
const deleteMenu = async (id) => {
    const result = await prisma_1.default.menu.delete({
        where: { id },
    });
    return result;
};
exports.MenuService = {
    createMenu,
    getAllMenu,
    getAllMenuAdmin,
    getSingleMenu,
    updateMenu,
    deleteMenu,
};

import { catchAsync } from "../../helper/catchAsync"
import sendResponse from "../../helper/sendResponse"
import { MenuService } from "./menu.service"

const createMenu = catchAsync(async (req, res) => {
    const result = await MenuService.createMenu(req)
    sendResponse(res, {
        success: true,
        message: "Menu created successfully",
        statusCode: 200,
        data: result,
    })
})

const getAllMenu = catchAsync(async (req, res) => {
    const result = await MenuService.getAllMenu()
    sendResponse(res, {
        success: true,
        message: "Menus fetched successfully",
        statusCode: 200,
        data: result,
    })
})

const getAllMenuAdmin = catchAsync(async (req, res) => {
    const result = await MenuService.getAllMenuAdmin()
    sendResponse(res, {
        success: true,
        message: "Menus fetched successfully",
        statusCode: 200,
        data: result,
    })
})

const getSingleMenu = catchAsync(async (req, res) => {
    const result = await MenuService.getSingleMenu(req.params.id as string)
    sendResponse(res, {
        success: true,
        message: "Menu fetched successfully",
        statusCode: 200,
        data: result,
    })
})

const updateMenu = catchAsync(async (req, res) => {
    const result = await MenuService.updateMenu(req.params.id as string, req)
    sendResponse(res, {
        success: true,
        message: "Menu updated successfully",
        statusCode: 200,
        data: result,
    })
})

const deleteMenu = catchAsync(async (req, res) => {
    const result = await MenuService.deleteMenu(req.params.id as string)
    sendResponse(res, {
        success: true,
        message: "Menu deleted successfully",
        statusCode: 200,
        data: result,
    })
})

export const MenuController = {
    createMenu,
    getAllMenu,
    getAllMenuAdmin,
    getSingleMenu,
    updateMenu,
    deleteMenu,
}

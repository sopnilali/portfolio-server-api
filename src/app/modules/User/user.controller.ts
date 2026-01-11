import status from "http-status";
import { catchAsync } from "../../helper/catchAsync.js";
import sendResponse from "../../helper/sendResponse.js";
import { UserService } from "./user.service.js";
import pick from "../../utils/pick.js";
import { userFilterableFields } from "./user.constant.js";
import { Request, Response } from "express";


const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req)

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "User Created Successfully!",
        data: result
    })
})

const getAllUser = catchAsync(async (req, res) => {
 const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await UserService.getAllUser(filters, options)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: result,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req.params.id as string, req);
    sendResponse(res, {
        success: true,
        message: "User updated successfully",
        statusCode: 200,
        data: result,
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: result,
    })
})

const SoftdeleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.SoftdeleteUser(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: result,
    })
})



export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    SoftdeleteUser
}
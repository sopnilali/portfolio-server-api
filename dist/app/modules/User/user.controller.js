import status from "http-status";
import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { UserService } from "./user.service";
import pick from "../../utils/pick";
import { userFilterableFields } from "./user.constant";
const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "User Created Successfully!",
        data: result
    });
});
const getAllUser = catchAsync(async (req, res) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await UserService.getAllUser(filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data
    });
});
const getSingleUser = catchAsync(async (req, res) => {
    const result = await UserService.getSingleUser(req.params.id);
    sendResponse(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: result,
    });
});
const updateUser = catchAsync(async (req, res) => {
    const result = await UserService.updateUser(req.params.id, req);
    sendResponse(res, {
        success: true,
        message: "User updated successfully",
        statusCode: 200,
        data: result,
    });
});
const deleteUser = catchAsync(async (req, res) => {
    const result = await UserService.deleteUser(req.params.id);
    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: result,
    });
});
const SoftdeleteUser = catchAsync(async (req, res) => {
    const result = await UserService.SoftdeleteUser(req.params.id);
    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: result,
    });
});
export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    SoftdeleteUser
};

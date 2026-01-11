import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { aboutService } from "./about.service";
const createAbout = catchAsync(async (req, res) => {
    const result = await aboutService.createAboutfromDB(req);
    sendResponse(res, {
        success: true,
        message: "About created successfully",
        statusCode: 200,
        data: result
    });
});
const GetAllAbout = catchAsync(async (req, res) => {
    const result = await aboutService.GetAllAboutfromDB();
    sendResponse(res, {
        success: true,
        message: "About updated successfully",
        statusCode: 200,
        data: result
    });
});
const updateAbout = catchAsync(async (req, res) => {
    const result = await aboutService.updateAboutfromDB(req.params.id, req);
    sendResponse(res, {
        success: true,
        message: "About updated successfully",
        statusCode: 200,
        data: result
    });
});
export const aboutController = {
    GetAllAbout, updateAbout,
    createAbout
};

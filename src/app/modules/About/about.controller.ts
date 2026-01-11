import { Request, Response } from "express";
import { catchAsync } from "../../helper/catchAsync.js";
import sendResponse from "../../helper/sendResponse.js";
import { aboutService } from "./about.service.js";

const createAbout = catchAsync(async (req: Request, res: Response<any, Record<string, any>>) => {
    const result = await aboutService.createAboutfromDB(req);
    sendResponse(res, {
        success: true,
        message: "About created successfully",
        statusCode: 200,
        data: result
    })
})

const GetAllAbout = catchAsync(async (req: Request, res: Response<any, Record<string, any>>) => {
    const result = await aboutService.GetAllAboutfromDB();
    sendResponse(res, {
        success: true,
        message: "About updated successfully",
        statusCode: 200,
        data: result
    })
})

const updateAbout = catchAsync(async (req: Request, res: Response<any, Record<string, any>>) => {
    const result = await aboutService.updateAboutfromDB(req.params.id as string, req);
    sendResponse(res, {
        success: true,
        message: "About updated successfully",
        statusCode: 200,
        data: result
    })
})




export const aboutController = {
    GetAllAbout,updateAbout,
    createAbout
}

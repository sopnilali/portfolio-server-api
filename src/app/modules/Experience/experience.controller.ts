import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { ExperienceService } from "./experience.service";

const createExperience = catchAsync(async (req, res) => {
    const result = await ExperienceService.createExperience(req)
    sendResponse(res, {
        success: true,
        message: "Experience created successfully",
        statusCode: 200,
        data: result
    })
})

const getAllExperience = catchAsync(async (req, res) => {
    const result = await ExperienceService.getAllExperience()
    sendResponse(res, {
        success: true,
        message: "Experiences fetched successfully",
        statusCode: 200,
        data: result
    })
})

const updateExperience = catchAsync(async (req, res) => {
    const result = await ExperienceService.updateExperience(req.params.id, req)
    sendResponse(res, {
        success: true,
        message: "Experience updated successfully",
        statusCode: 200,
        data: result
    })
})

const deleteExperience = catchAsync(async (req, res) => {
    const result = await ExperienceService.deleteExperience(req.params.id)
    sendResponse(res, {
        success: true,
        message: "Experience deleted successfully",
        statusCode: 200,
        data: result
    })
})

export const ExperienceController = {
    createExperience,
    getAllExperience,
    updateExperience,
    deleteExperience
}
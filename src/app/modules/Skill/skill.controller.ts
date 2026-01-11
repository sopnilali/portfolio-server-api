import { catchAsync } from '../../helper/catchAsync'   
import sendResponse from '../../helper/sendResponse'
import { SkillService } from './skill.service'

const createSkill = catchAsync(async (req, res) => {
    const result = await SkillService.createSkill(req)
    sendResponse(res, {
        success: true,
        message: "Skill created successfully",
        statusCode: 200,
        data: result
    })
})

const getAllSkill = catchAsync(async (req, res) => {
    const result = await SkillService.getAllSkill()
    sendResponse(res, {
        success: true,
        message: "Skill fetched successfully",
        statusCode: 200,
        data: result
    })
})

const getSingleSkill = catchAsync(async (req, res) => {
    const result = await SkillService.getSingleSkill(req.params.id as string)
    sendResponse(res, {
        success: true,
        message: "Skill fetched successfully",
        statusCode: 200,
        data: result
    })
})

const updateSkill = catchAsync(async (req, res) => {
    const result = await SkillService.updateSkill(req.params.id as string, req)
    sendResponse(res, {
        success: true,
        message: "Skill updated successfully",
        statusCode: 200,
        data: result
    })
})

const deleteSkill = catchAsync(async (req, res) => {
    const result = await SkillService.deleteSkill(req.params.id as string)
    sendResponse(res, {
        success: true,
        message: "Skill deleted successfully",
        statusCode: 200,
        data: result
    })
})

export const SkillController = {
    createSkill, getAllSkill, getSingleSkill, updateSkill, deleteSkill
}
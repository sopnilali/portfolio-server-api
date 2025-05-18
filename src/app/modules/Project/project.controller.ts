import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { ProjectService } from "./project.service";


const createProject = catchAsync(async (req, res) => {
    const result = await ProjectService.createProject(req);
    sendResponse(res, {
        success: true,
        message: "Project created successfully",
        statusCode: 200,
        data: result,
    })
})

const getAllProject = catchAsync(async (req, res) => {
    const result = await ProjectService.getAllProject()
    sendResponse(res, {
        success: true,
        message: "Project fetched successfully",
        statusCode: 200,
        data: result,
    })
})

const getSingleProject = catchAsync(async (req, res) => {
const result = await ProjectService.getSingleProject(req.params.id)
    sendResponse(res, {
        success: true,
        message: "Project fetched successfully",
        statusCode: 200,
        data: result,
    })
})

const updateProject = catchAsync(async (req, res) => {
    const result = await ProjectService.updateProject(req.params.id, req)
    sendResponse(res, {
        success: true,
        message: "Project updated successfully",
        statusCode: 200,
        data: result,
    })
})

const deleteProject = catchAsync(async (req, res) => {
    const result = await ProjectService.deleteProject(req.params.id)
    sendResponse(res, {
        success: true,
        message: "Project deleted successfully",
        statusCode: 200
    })
})

export const ProjectController = {
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
}
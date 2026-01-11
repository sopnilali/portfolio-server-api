import { ContactService } from "./contact.service"
import { catchAsync } from "../../helper/catchAsync"
import sendResponse from "../../helper/sendResponse"

const createContact = catchAsync(async (req, res) => {
    const result = await ContactService.createContact(req)
    sendResponse(res, {
        success: true,
        message: "Contact created successfully",
        statusCode: 200,
        data: result
    })
})

const getAllContact = catchAsync(async (req, res) => {
    const result = await ContactService.getAllContact()
    sendResponse(res, {
        success: true,
        message: "Contacts fetched successfully",
        statusCode: 200,
        data: result
    })
})

const updateContact = catchAsync(async (req, res) => {
    const result = await ContactService.updateContact(req.params.id as string, req)
    sendResponse(res, {
        success: true,
        message: "Contact updated successfully",
        statusCode: 200,
        data: result
    })
})

const deleteContact = catchAsync(async (req, res) => {
    const result = await ContactService.deleteContact(req.params.id as string)
    sendResponse(res, {
        success: true,
        message: "Contact deleted successfully",
        statusCode: 200,
        data: result
    })
})
export const ContactController = { createContact, getAllContact, updateContact, deleteContact }
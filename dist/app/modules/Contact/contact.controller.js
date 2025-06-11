"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("./contact.service");
const catchAsync_1 = require("../../helper/catchAsync");
const sendResponse_1 = __importDefault(require("../../helper/sendResponse"));
const createContact = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contact_service_1.ContactService.createContact(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Contact created successfully",
        statusCode: 200,
        data: result
    });
});
const getAllContact = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contact_service_1.ContactService.getAllContact();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Contacts fetched successfully",
        statusCode: 200,
        data: result
    });
});
const updateContact = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contact_service_1.ContactService.updateContact(req.params.id, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Contact updated successfully",
        statusCode: 200,
        data: result
    });
});
const deleteContact = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contact_service_1.ContactService.deleteContact(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Contact deleted successfully",
        statusCode: 200,
        data: result
    });
});
exports.ContactController = { createContact, getAllContact, updateContact, deleteContact };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    });
};
exports.default = sendResponse;

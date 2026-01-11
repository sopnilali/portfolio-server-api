"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        const pathValue = issue?.path[issue.path.length - 1];
        return {
            path: typeof pathValue === 'string' || typeof pathValue === 'number' ? pathValue : String(pathValue),
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;

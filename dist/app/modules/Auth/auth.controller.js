import status from "http-status";
import config from "../../config";
import { catchAsync } from "../../helper/catchAsync";
import sendResponse from "../../helper/sendResponse";
import { AuthService } from "./auth.service";
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.userLogin(req.body);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "User logged in successfully",
        data: {
            accessToken: result.accessToken,
        },
    });
});
const logoutUser = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return sendResponse(res, {
            success: false,
            message: "Refresh token not found",
            statusCode: status.UNAUTHORIZED,
        });
    }
    await AuthService.logoutUser();
    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
        secure: false,
        httpOnly: true
    });
    sendResponse(res, {
        success: true,
        message: "User logged out successfully",
        statusCode: status.OK,
    });
});
export const AuthController = {
    loginUser,
    logoutUser,
};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const token_1 = require("../../utils/token");
const index_1 = __importDefault(require("../../config/index"));
const userLogin = async (payload) => {
    const { email, password } = payload;
    const existUser = await prisma_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (existUser?.status === "Blocked") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is Blocked");
    }
    if (!existUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Not Found");
    }
    const isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password is incorrect");
    }
    const JWTAuthUsers = {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
    };
    const accessToken = token_1.TokenUtils.GenerateToken(JWTAuthUsers, index_1.default.jwt.jwt_access_secret, index_1.default.jwt.jwt_access_expires_in);
    const refreshToken = token_1.TokenUtils.GenerateToken(JWTAuthUsers, index_1.default.jwt.jwt_refresh_secret, index_1.default.jwt.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const logoutUser = async () => {
    return null;
};
exports.AuthService = {
    userLogin,
    logoutUser
};

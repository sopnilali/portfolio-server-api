import status from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import { IAuth, IAuthUser } from "./auth.interface";
import { TokenUtils } from "../../utils/token";
import config from "../../config/index";
import { Secret } from "jsonwebtoken";

const userLogin = async (payload: IAuth) => {
    const { email, password } = payload

    const existUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (existUser?.status === "Blocked") {
        throw new AppError(status.BAD_REQUEST, "User is Blocked")
    }
    if (!existUser) {
        throw new AppError(status.BAD_REQUEST, "User Not Found")
    }

    const isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
        throw new AppError(status.BAD_REQUEST, "Password is incorrect");
    }

    const JWTAuthUsers: IAuthUser = {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
    }

    const accessToken = TokenUtils.GenerateToken(JWTAuthUsers, config.jwt.jwt_access_secret as Secret, config.jwt.jwt_access_expires_in);
    const refreshToken = TokenUtils.GenerateToken(JWTAuthUsers, config.jwt.jwt_refresh_secret as Secret, config.jwt.jwt_refresh_expires_in);

    return {
        accessToken,
        refreshToken,
    }
}

const logoutUser = async ( ) => {
    return null;
}

export const AuthService = {
    userLogin,
    logoutUser
}
import jwt from "jsonwebtoken";
const GenerateToken = (jwtPayload, secret, expiresIn) => {
    const options = { expiresIn };
    const token = jwt.sign(jwtPayload, secret, options);
    return token;
};
const VerifyToken = (token, secret) => {
    const decoded = jwt.verify(token, secret);
    return decoded;
};
const DecodeToken = (token) => {
    const decoded = jwt.decode(token);
    return decoded;
};
export const TokenUtils = {
    GenerateToken,
    VerifyToken,
    DecodeToken
};

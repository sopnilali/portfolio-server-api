import { catchAsync } from '../helper/catchAsync.js';
const validateRequest = (schema) => {
    return catchAsync(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    });
};
export default validateRequest;

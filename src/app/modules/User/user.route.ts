import express, { NextFunction, Request, Response } from 'express'
import { FileUploader } from '../../helper/fileUploader.js';
import { UserController } from "./user.controller.js";
import auth from '../../middleware/auth.js';
import { UserRole } from '@prisma/client';

const router = express.Router();


router.post('/', FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return UserController.createUser(req, res, next )
})

router.get('/', auth(UserRole.Admin), UserController.getAllUser)
router.get('/:id', auth(UserRole.Admin, UserRole.User), UserController.getSingleUser)
router.patch('/:id', FileUploader.upload.single('file'), (req: Request, res:Response, next:NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return UserController.updateUser(req, res, next)
})
router.delete('/:id', UserController.deleteUser)
router.delete('/soft/:id', auth(UserRole.Admin), UserController.SoftdeleteUser)



export const UserRoutes = router
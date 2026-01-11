import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middleware/auth.js'
import { UserRole } from '@prisma/client'
import { FileUploader } from '../../helper/fileUploader.js'
import { aboutController } from './about.controller.js'


const router = express.Router()

router.post('/create', auth(UserRole.Admin), FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return aboutController.createAbout(req, res, next)
})

router.get('/', (req: Request, res: Response, next: NextFunction)=> {
    return aboutController.GetAllAbout(req, res, next)
})


router.patch('/:id', auth(UserRole.Admin), FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return aboutController.updateAbout(req, res, next)
})




export const Aboutroutes = router
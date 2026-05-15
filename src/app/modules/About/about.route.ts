import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middleware/auth'
import { UserRole } from '@prisma/client'
import { FileUploader } from '../../helper/fileUploader'
import { aboutController } from './about.controller'

const parseAboutFormBody = (req: Request) => {
    const raw = req.body?.data
    if (typeof raw !== 'string' || raw.trim() === '') {
        return
    }
    try {
        req.body = JSON.parse(raw)
    } catch {
        throw new Error('Invalid JSON in form field `data`')
    }
}

const router = express.Router()

router.post('/create', auth(UserRole.Admin), FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    parseAboutFormBody(req)
    return aboutController.createAbout(req, res, next)
})

router.get('/', (req: Request, res: Response, next: NextFunction)=> {
    return aboutController.GetAllAbout(req, res, next)
})

router.patch('/:id', auth(UserRole.Admin), FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    parseAboutFormBody(req)
    return aboutController.updateAbout(req, res, next)
})

export const Aboutroutes = router

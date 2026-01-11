import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middleware/auth.js'
import { UserRole } from '@prisma/client'
import { FileUploader } from '../../helper/fileUploader.js'
import { ProjectController } from "./project.controller.js"


const router = express.Router()

router.post('/', auth(UserRole.Admin), FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return ProjectController.createProject(req, res, next)
})

router.get('/', (req: Request, res: Response, next: NextFunction)=> {
    return ProjectController.getAllProject(req, res, next)
})

router.get('/:id', (req: Request, res: Response, next: NextFunction)=> {
    return ProjectController.getSingleProject(req, res, next)
})

router.patch('/:id', auth(UserRole.Admin), FileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return ProjectController.updateProject(req, res, next)
})

router.delete('/:id', auth(UserRole.Admin), (req: Request, res: Response, next: NextFunction)=> {
    return ProjectController.deleteProject(req, res, next)
})



export const ProjectRoutes = router
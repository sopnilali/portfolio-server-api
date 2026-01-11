import express, { NextFunction, Request, Response } from 'express'
import { FileUploader } from '../../helper/fileUploader.js'
import { UserRole } from '@prisma/client'
import auth from '../../middleware/auth.js'
import { ExperienceController } from "./experience.controller.js"

const router = express.Router()

router.post('/', auth(UserRole.Admin), ExperienceController.createExperience)

router.get('/', ExperienceController.getAllExperience) // public route

router.patch('/:id', auth(UserRole.Admin), ExperienceController.updateExperience)

router.delete('/:id', auth(UserRole.Admin), ExperienceController.deleteExperience)

export const ExperienceRoutes = router
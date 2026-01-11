import express, { NextFunction, Request, Response } from 'express'
import { FileUploader } from '../../helper/fileUploader'
import { UserRole } from '@prisma/client'
import auth from '../../middleware/auth'
import { ExperienceController } from './experience.controller'

const router = express.Router()

router.post('/', auth(UserRole.Admin), ExperienceController.createExperience)

router.get('/', ExperienceController.getAllExperience) // public route

router.patch('/:id', auth(UserRole.Admin), ExperienceController.updateExperience)

router.delete('/:id', auth(UserRole.Admin), ExperienceController.deleteExperience)

export const ExperienceRoutes = router
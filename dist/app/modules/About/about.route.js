import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import { FileUploader } from '../../helper/fileUploader';
import { aboutController } from './about.controller';
const router = express.Router();
router.post('/create', auth(UserRole.Admin), FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return aboutController.createAbout(req, res, next);
});
router.get('/', (req, res, next) => {
    return aboutController.GetAllAbout(req, res, next);
});
router.patch('/:id', auth(UserRole.Admin), FileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return aboutController.updateAbout(req, res, next);
});
export const Aboutroutes = router;

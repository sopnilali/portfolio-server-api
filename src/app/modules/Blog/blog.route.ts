import { UserRole } from "@prisma/client"
import auth from "../../middleware/auth"
import { BlogController } from "./blog.controller"
import { Router } from "express"
import { FileUploader } from "../../helper/fileUploader"

const router = Router()

router.post('/create', auth(UserRole.Admin), FileUploader.upload.single('thumbnail'), (req: any, res: any) => {
    req.body = JSON.parse(req.body.data)
    BlogController.createBlog(req, res)
})
router.get('/all', BlogController.getAllBlog)
router.get('/:id', BlogController.getSingleBlog)
router.put('/:id', auth(UserRole.Admin), BlogController.updateBlog)
router.delete('/:id', auth(UserRole.Admin), BlogController.deleteBlog)

router.post('/editor-upload', auth(UserRole.Admin), FileUploader.editorUpload.single('file'), BlogController.editorUpload)


export const BlogRoutes  = router

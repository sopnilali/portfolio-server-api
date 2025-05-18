import express, { NextFunction, Request, Response } from "express"
import { SkillController } from "./skill.controller"
import auth from "../../middleware/auth"
import { UserRole } from "@prisma/client"
import { FileUploader } from "../../helper/fileUploader"

const router = express.Router()

router.post("/", auth(UserRole.Admin), FileUploader.upload.single("file"), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return SkillController.createSkill(req, res, next)
})

router.get("/", SkillController.getAllSkill) // public route
router.get("/:id", SkillController.getSingleSkill) // public route

router.put("/:id", auth(UserRole.Admin), FileUploader.upload.single("file"), (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    return SkillController.updateSkill(req, res, next)
})
router.delete("/:id", auth(UserRole.Admin), SkillController.deleteSkill)

export const SkillRoutes = router
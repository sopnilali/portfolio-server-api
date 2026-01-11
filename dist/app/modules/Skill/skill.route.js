import express from "express";
import { SkillController } from "./skill.controller.js";
import auth from "../../middleware/auth.js";
import { UserRole } from "@prisma/client";
import { FileUploader } from "../../helper/fileUploader.js";
const router = express.Router();
router.post("/", auth(UserRole.Admin), FileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return SkillController.createSkill(req, res, next);
});
router.get("/", SkillController.getAllSkill); // public route
router.get("/:id", SkillController.getSingleSkill); // public route
router.patch("/:id", auth(UserRole.Admin), FileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return SkillController.updateSkill(req, res, next);
});
router.delete("/:id", auth(UserRole.Admin), SkillController.deleteSkill);
export const SkillRoutes = router;

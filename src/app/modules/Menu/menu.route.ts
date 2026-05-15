import express, { NextFunction, Request, Response } from "express"
import { UserRole } from "@prisma/client"
import auth from "../../middleware/auth"
import { FileUploader } from "../../helper/fileUploader"
import { MenuController } from "./menu.controller"

const router = express.Router()

const parseMenuBody = (req: Request) => {
    if (typeof req.body?.data === "string") {
        req.body = JSON.parse(req.body.data)
    }
}

router.post("/", auth(UserRole.Admin), FileUploader.parseFormData.none(), (req: Request, res: Response, next: NextFunction) => {
    parseMenuBody(req)
    return MenuController.createMenu(req, res, next)
})

router.get("/", MenuController.getAllMenu)
router.get("/admin", auth(UserRole.Admin), MenuController.getAllMenuAdmin)
router.get("/:id", MenuController.getSingleMenu)

router.patch("/:id", auth(UserRole.Admin), FileUploader.parseFormData.none(), (req: Request, res: Response, next: NextFunction) => {
    parseMenuBody(req)
    return MenuController.updateMenu(req, res, next)
})

router.delete("/:id", auth(UserRole.Admin), MenuController.deleteMenu)

export const MenuRoutes = router

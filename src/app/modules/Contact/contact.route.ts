import express from "express"
import { ContactController } from "./contact.controller"
import auth from "../../middleware/auth"
import { UserRole } from "@prisma/client"

const router = express.Router()

router.post("/", ContactController.createContact) // public route

router.get("/", ContactController.getAllContact) // public route

router.put("/:id", auth(UserRole.Admin), ContactController.updateContact)

router.delete("/:id", auth(UserRole.Admin), ContactController.deleteContact)

export const ContactRoutes = router

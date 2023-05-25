import { Router } from "express";
import { getAll, create, store ,show, createSubject, storeSubject} from "../controller/student_controller.js"

const router = new Router();

router.get("/", getAll)

router.get("/create", create)

router.get("/:_id/create_subject", createSubject)

router.post("/", store)

router.post("/:_id", storeSubject)

router.get("/:id",show)

export default router;


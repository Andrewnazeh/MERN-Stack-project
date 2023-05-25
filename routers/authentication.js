import { Router } from "express";
import {  login, loginForm } from "../controller/authentication_controller.js";

//++++++++ main router for authentication ++++++++ //
const router = new Router();

router.get("/login", loginForm);

router.post("/login", login);

export default router;
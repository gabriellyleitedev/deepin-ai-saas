import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router(); // aqui cria mini rotas separadas

router.post("/register", register); // executa register

export default router;
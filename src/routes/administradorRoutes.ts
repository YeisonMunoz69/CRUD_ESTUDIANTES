import { Router } from "express";
import { registrarAdministrador } from "../controllers/administradorController";
import { loginAdministrador } from "../controllers/administradorController";

const router = Router();

// Ruta para registrar administradores
router.post("/register", registrarAdministrador);

// Ruta para el login de administradores
router.post("/login", loginAdministrador);

export default router;

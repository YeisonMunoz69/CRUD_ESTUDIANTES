import { Router } from 'express';
import { registrarEstudiante } from '../controllers/estudianteController';
import { loginEstudiante } from '../controllers/estudianteController';

const router = Router();

// Ruta para registrar estudiantes
router.post('/register', registrarEstudiante);
// Ruta para el login de estudiantes
router.post('/login', loginEstudiante);

export default router;

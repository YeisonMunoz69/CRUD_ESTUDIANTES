import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { registrarEstudiante } from '../controllers/estudianteController';
import { loginEstudiante } from '../controllers/estudianteController';
import { crearEstudiante } from '../controllers/estudianteController';
import { obtenerEstudiantes } from '../controllers/estudianteController';
import { actualizarEstudiante } from '../controllers/estudianteController';
import { eliminarEstudiante } from '../controllers/estudianteController';

const router = Router();

// Ruta para registrar estudiantes
router.post('/register', registrarEstudiante);
// Ruta para el login de estudiantes
router.post('/login', loginEstudiante);
// Ruta para crear un nuevo estudiante
router.post('/crear', authMiddleware, crearEstudiante);  // Protegida con autenticación
// Ruta para listar todos los estudiantes
router.get('/', authMiddleware, obtenerEstudiantes);  // Protegida con autenticación
// Ruta para actualizar un estudiante
router.put('/:id', authMiddleware, actualizarEstudiante);  // Protegida con autenticación
// Ruta para eliminar un estudiante
router.delete('/:id', authMiddleware, eliminarEstudiante);  // Protegida con autenticación


export default router;

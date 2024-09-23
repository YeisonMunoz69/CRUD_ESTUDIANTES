import { Router } from 'express';
import { crearCurso } from '../controllers/cursoController';
import authMiddleware from '../middlewares/authMiddleware';
import { obtenerCursos } from '../controllers/cursoController';
import { actualizarCurso } from '../controllers/cursoController';
import { eliminarCurso } from '../controllers/cursoController';

const router = Router();

// Ruta para crear un nuevo curso
router.post('/crear', authMiddleware, crearCurso);
// Ruta para listar todos los cursos
router.get('/', authMiddleware, obtenerCursos);
// Ruta para actualizar un curso
router.put('/:id', authMiddleware, actualizarCurso);
// Ruta para eliminar un curso
router.delete('/:id', authMiddleware, eliminarCurso);


export default router;

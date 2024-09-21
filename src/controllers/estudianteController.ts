import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Estudiante from '../models/Estudiante';

export const registrarEstudiante = async (req: Request, res: Response) => {
  const { nombreCompleto, correo, contraseña } = req.body;

  try {
    // Verificamos si el correo ya está registrado
    const estudianteExistente = await Estudiante.findOne({ where: { correo } });
    if (estudianteExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hacemos hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Creamos el estudiante en la base de datos
    const nuevoEstudiante = await Estudiante.create({
      nombreCompleto,
      correo,
      contraseña: hashedPassword,  // Guardamos la contraseña hasheada
      rol: 'Estudiante',  // Asignamos el rol de estudiante por defecto
    });

    // Generamos el token JWT
    const token = jwt.sign({ id: nuevoEstudiante.id, rol: nuevoEstudiante.rol }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    // Devolvemos el estudiante registrado y el token
    return res.status(201).json({
      message: 'Estudiante registrado exitosamente',
      estudiante: {
        id: nuevoEstudiante.id,
        nombreCompleto: nuevoEstudiante.nombreCompleto,
        correo: nuevoEstudiante.correo,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar estudiante', error });
  }
};

export const loginEstudiante = async (req: Request, res: Response) => {
    const { correo, contraseña } = req.body;
  
    try {
      // Verificamos si el correo está registrado
      const estudiante = await Estudiante.findOne({ where: { correo } });
      if (!estudiante) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }
  
      // Verificamos si la contraseña es correcta
      const isMatch = await bcrypt.compare(contraseña, estudiante.contraseña);
      if (!isMatch) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }
  
      // Generamos el token JWT
      const token = jwt.sign({ id: estudiante.id, rol: estudiante.rol }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  
      // Devolvemos el token y la información del estudiante
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        estudiante: {
          id: estudiante.id,
          nombreCompleto: estudiante.nombreCompleto,
          correo: estudiante.correo,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
  
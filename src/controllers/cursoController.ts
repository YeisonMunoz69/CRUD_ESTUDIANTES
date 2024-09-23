import { Request, Response } from "express";
import Curso from "../models/Curso";

export const crearCurso = async (req: Request, res: Response) => {
  const {
    nombre,
    profesor,
    cuposDisponibles,
    horario,
    numeroCreditos,
    fechaInicio,
    fechaFin,
  } = req.body;

  try {
    const nuevoCurso = await Curso.create({
      nombre,
      profesor,
      cuposDisponibles,
      horario,
      numeroCreditos,
      fechaInicio,
      fechaFin,
    });

    return res.status(201).json({
      message: "Curso creado exitosamente",
      curso: nuevoCurso,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear curso", error });
  }
};

export const obtenerCursos = async (req: Request, res: Response) => {
  try {
    const cursos = await Curso.findAll();
    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener cursos", error });
  }
};

export const actualizarCurso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre,
    profesor,
    cuposDisponibles,
    horario,
    numeroCreditos,
    fechaInicio,
    fechaFin,
  } = req.body;

  try {
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Actualizamos los datos del curso
    await curso.update({
      nombre: nombre || curso.nombre,
      profesor: profesor || curso.profesor,
      cuposDisponibles: cuposDisponibles || curso.cuposDisponibles,
      horario: horario || curso.horario,
      numeroCreditos: numeroCreditos || curso.numeroCreditos,
      fechaInicio: fechaInicio || curso.fechaInicio,
      fechaFin: fechaFin || curso.fechaFin,
    });

    return res.status(200).json({
      message: "Curso actualizado exitosamente",
      curso,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar curso", error });
  }
};

export const eliminarCurso = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const curso = await Curso.findByPk(id);
  
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
  
      // Eliminamos el curso
      await curso.destroy();
  
      return res.status(200).json({ message: 'Curso eliminado exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar curso', error });
    }
  };
  

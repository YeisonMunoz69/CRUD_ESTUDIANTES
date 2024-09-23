import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Administrador from "../models/Administrador";

// Sirve para registrar un nuevo administrador mediante una solicitud POST a la ruta /register
export const registrarAdministrador = async (req: Request, res: Response) => {
  const { nombreCompleto, correo, contraseña } = req.body;

  try {
    // Verificamos si el correo ya está registrado
    const adminExistente = await Administrador.findOne({ where: { correo } });
    if (adminExistente) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hacemos hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Creamos el administrador en la base de datos
    const nuevoAdministrador = await Administrador.create({
      nombreCompleto,
      correo,
      contraseña: hashedPassword,
      rol: "Administrador", // Asignamos el rol de administrador
    });

    // Generamos el token JWT
    const token = jwt.sign(
      { id: nuevoAdministrador.id, rol: nuevoAdministrador.rol },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    // Devolvemos el administrador registrado y el token
    return res.status(201).json({
      message: "Administrador registrado exitosamente",
      administrador: {
        id: nuevoAdministrador.id,
        nombreCompleto: nuevoAdministrador.nombreCompleto,
        correo: nuevoAdministrador.correo,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al registrar administrador", error });
  }
};

export const loginAdministrador = async (req: Request, res: Response) => {
  const { correo, contraseña } = req.body;

  try {
    // Verificamos si el correo está registrado
    const administrador = await Administrador.findOne({ where: { correo } });
    if (!administrador) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Verificamos si la contraseña es correcta
    const isMatch = await bcrypt.compare(contraseña, administrador.contraseña);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Generamos el token JWT
    const token = jwt.sign(
      { id: administrador.id, rol: administrador.rol },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    // Devolvemos el token y la información del administrador
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      administrador: {
        id: administrador.id,
        nombreCompleto: administrador.nombreCompleto,
        correo: administrador.correo,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

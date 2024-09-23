import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//  Sirve para extender la interfaz Request de Express
interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificamos el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;

    // Asignamos la propiedad user directamente
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;

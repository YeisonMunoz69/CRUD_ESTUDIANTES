import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;  // Añadimos la propiedad `user` a la interfaz `Request`
    }
  }
}

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env , porque las necesitamos para conectarnos a la base de datos
dotenv.config();

// Crear la instancia de Sequelize y conectarse a la base de datos usando las variables de entorno
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,  // Requiere SSL para conectarse a Supabase (como lo requiere Supabase)
      rejectUnauthorized: false,  // No rechaza los certificados SSL no autorizados (como lo requiere Supabase)
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,  // Tiempo máximo para adquirir la conexión en milisegundos
    idle: 10000,     // Tiempo que una conexión puede estar inactiva antes de ser liberada
  },
});

// Exportamos la instancia de Sequelize para usarla en otros archivos
export default sequelize;

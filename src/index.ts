import express from 'express'; // Importamos express
import sequelize from './config/database';  // Importamos la conexión de Sequelize
import dotenv from 'dotenv'; // Importamos dotenv para cargar las variables de entorno

// Importamos los modelos para que se creen las tablas en la base de datos
import './models/Estudiante';
import './models/Curso';
import './models/Inscripcion';
import './models/Administrador';

// Importar las rutas
import estudianteRoutes from './routes/estudianteRoutes';
import administradorRoutes from './routes/administradorRoutes';
import cursoRoutes from './routes/cursoRoutes';

dotenv.config();  

const app = express();

// Usar las rutas importadas en la aplicación de Express 
app.use(express.json());

// RUTAS
app.use(estudianteRoutes);
app.use('/administradores', administradorRoutes);
app.use('/cursos', cursoRoutes);


// Sirve para verificar que la conexión a la base de datos es correcta
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente con Supabase.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });


// Sincronizar la base de datos con los modelos de Sequelize
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada correctamente');
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

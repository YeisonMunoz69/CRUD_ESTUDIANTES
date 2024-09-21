import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Estudiante from './Estudiante';
import Curso from './Curso';

// Definir los atributos de la Inscripción
interface InscripcionAttributes {
  id: number;
  fechaInscripcion: Date;
  estudianteId: number;
  cursoId: number;
}

// Atributos opcionales para la creación de la inscripción
interface InscripcionCreationAttributes extends Optional<InscripcionAttributes, 'id' | 'fechaInscripcion'> {}

class Inscripcion extends Model<InscripcionAttributes, InscripcionCreationAttributes> implements InscripcionAttributes {
  public id!: number;
  public fechaInscripcion!: Date;
  public estudianteId!: number;
  public cursoId!: number;
}

Inscripcion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fechaInscripcion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Inscripcion',
  tableName: 'inscripciones',
});

// Definir relaciones muchos a muchos
Estudiante.belongsToMany(Curso, { through: Inscripcion });
Curso.belongsToMany(Estudiante, { through: Inscripcion });

export default Inscripcion;

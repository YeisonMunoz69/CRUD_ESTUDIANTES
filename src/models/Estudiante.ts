import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Definir los atributos del Estudiante
interface EstudianteAttributes {
  id: number;
  nombreCompleto: string;
  correo: string;
  contraseña: string;
  rol: string;
  fechaCreacion: Date;
}

// Definir qué atributos son opcionales al crear una instancia
interface EstudianteCreationAttributes extends Optional<EstudianteAttributes, 'id' | 'fechaCreacion'> {}

class Estudiante extends Model<EstudianteAttributes, EstudianteCreationAttributes> implements EstudianteAttributes {
  public id!: number;
  public nombreCompleto!: string;
  public correo!: string;
  public contraseña!: string;
  public rol!: string;
  public fechaCreacion!: Date;
}

Estudiante.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'Estudiante',
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Estudiante',
  tableName: 'estudiantes',
});

export default Estudiante;

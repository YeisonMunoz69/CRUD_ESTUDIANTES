import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Definir los atributos del Curso
interface CursoAttributes {
  id: number;
  nombre: string;
  profesor: string;
  cuposDisponibles: number;
  horario: string;
  numeroCreditos: number;
  fechaInicio: Date;
  fechaFin: Date;
}

// Atributos opcionales para la creación del curso
interface CursoCreationAttributes extends Optional<CursoAttributes, 'id'> {}

class Curso extends Model<CursoAttributes, CursoCreationAttributes> implements CursoAttributes {
  public id!: number;
  public nombre!: string;
  public profesor!: string;
  public cuposDisponibles!: number;
  public horario!: string;
  public numeroCreditos!: number;
  public fechaInicio!: Date;
  public fechaFin!: Date;
}

Curso.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profesor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuposDisponibles: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroCreditos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Curso',
  tableName: 'cursos',
});

export default Curso;

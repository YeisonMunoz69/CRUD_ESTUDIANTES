import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Definir los atributos del Administrador
interface AdministradorAttributes {
  id: number;
  nombreCompleto: string;
  correo: string;
  contraseña: string;
  rol: string;
  fechaCreacion: Date;
}

// Atributos opcionales para la creación del administrador
interface AdministradorCreationAttributes extends Optional<AdministradorAttributes, 'id' | 'fechaCreacion'> {}

class Administrador extends Model<AdministradorAttributes, AdministradorCreationAttributes> implements AdministradorAttributes {
  public id!: number;
  public nombreCompleto!: string;
  public correo!: string;
  public contraseña!: string;
  public rol!: string;
  public fechaCreacion!: Date;
}

Administrador.init({
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
    defaultValue: 'Administrador',
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Administrador',
  tableName: 'administradores',
});

export default Administrador;

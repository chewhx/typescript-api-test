import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
} from 'sequelize';
import sequelize from '../config/database';

export interface StudentModel
  extends Model<
    InferAttributes<StudentModel>,
    InferCreationAttributes<StudentModel>
  > {
  id: number;
  email: string;
  isSuspended: boolean;
}

export const studentModelAttributes: ModelAttributes<StudentModel> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  isSuspended: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
};

export const Student = sequelize.define<StudentModel>(
  'student',
  studentModelAttributes,
  {
    timestamps: true,
  }
);

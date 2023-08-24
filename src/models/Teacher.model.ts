import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
} from 'sequelize';
import sequelize from '../config/database';

export interface TeacherModel
  extends Model<
    InferAttributes<TeacherModel>,
    InferCreationAttributes<TeacherModel>
  > {
  id: number;
  email: string;
}

export const teacherModelAttributes: ModelAttributes<TeacherModel> = {
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
};

export const Teacher = sequelize.define<TeacherModel>(
  'teacher',
  teacherModelAttributes,
  {
    timestamps: true,
  }
);

import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from './Teacher.model';

export class Student extends Model<
  InferAttributes<Student, { omit: 'Teachers' }>,
  InferCreationAttributes<Student, { omit: 'Teachers' }>
> {
  // Attributes
  declare id: CreationOptional<number>;
  declare email: string;
  declare isSuspended: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Associations
  declare getTeachers: HasManyGetAssociationsMixin<Teacher>; // Note the null assertions!
  declare addTeacher: HasManyAddAssociationMixin<Teacher, number>;
  declare addTeachers: HasManyAddAssociationsMixin<Teacher, number>;
  declare setTeachers: HasManySetAssociationsMixin<Teacher, number>;
  declare removeTeacher: HasManyRemoveAssociationMixin<Teacher, number>;
  declare removeTeachers: HasManyRemoveAssociationsMixin<Teacher, number>;
  declare hasTeacher: HasManyHasAssociationMixin<Teacher, number>;
  declare hasTeachers: HasManyHasAssociationsMixin<Teacher, number>;
  declare countTeachers: HasManyCountAssociationsMixin;
  declare createTeacher: HasManyCreateAssociationMixin<Teacher, 'id'>;

  declare Teachers?: NonAttribute<Teacher[]>;

  declare static associations: {
    Teachers: Association<Teacher, Student>;
  };
}

Student.init(
  {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true, sequelize, tableName: 'Students' }
);

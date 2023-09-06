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
import { Student } from './Student.model';

export class Teacher extends Model<
  InferAttributes<Teacher, { omit: 'Students' }>,
  InferCreationAttributes<Teacher, { omit: 'Students' }>
> {
  // Attributes
  declare id: CreationOptional<number>;
  declare email: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Associations
  declare getStudents: HasManyGetAssociationsMixin<Teacher>; // Note the null assertions!
  declare addStudent: HasManyAddAssociationMixin<Student, number>;
  declare addStudents: HasManyAddAssociationsMixin<Student, number>;
  declare setStudents: HasManySetAssociationsMixin<Student, number>;
  declare removeStudent: HasManyRemoveAssociationMixin<Student, number>;
  declare removeStudents: HasManyRemoveAssociationsMixin<Student, number>;
  declare hasStudent: HasManyHasAssociationMixin<Student, number>;
  declare hasStudents: HasManyHasAssociationsMixin<Student, number>;
  declare countStudents: HasManyCountAssociationsMixin;
  declare createStudent: HasManyCreateAssociationMixin<Student, 'id'>;

  declare Students?: NonAttribute<Student[]>;

  declare static associations: {
    Students: Association<Student, Student>;
  };
}

Teacher.init(
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true, sequelize, tableName: 'Teachers' }
);

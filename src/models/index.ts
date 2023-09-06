import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from './Teacher.model';
import { Student } from './Student.model';

export { Teacher, Student };

export const TeacherStudents = sequelize.define(
  'TeacherStudents',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: 'id',
      },
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

Student.belongsToMany(Teacher, { through: TeacherStudents });
Teacher.belongsToMany(Student, { through: TeacherStudents });
TeacherStudents.belongsTo(Student);
TeacherStudents.belongsTo(Teacher);
Student.hasMany(TeacherStudents);
Teacher.hasMany(TeacherStudents);

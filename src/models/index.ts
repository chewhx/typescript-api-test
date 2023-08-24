import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from './Teacher.model';
import { Student } from './Student.model';

export { Teacher, Student };

export const TeacherStudents = sequelize.define(
  'teacher_student',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: 'id',
      },
    },
    studentId: {
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

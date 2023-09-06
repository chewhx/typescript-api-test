import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';
import { registerStudents } from './register-students/service';
import { ZodError } from 'zod';

describe('registerStudents', () => {
  it('Should be defined', () => {
    expect(registerStudents).toBeDefined();
  });

  it('Should register students to teacher', async () => {
    const teacher = 'teacherken@gmail.com';
    const students = ['studentmac@gmail.com', 'studentkendall@gmail.com'];

    const res = await registerStudents({ teacher, students });

    expect(res).toBeUndefined();

    const rows: { email: string }[] = await sequelize.query(
      `
    SELECT s.email FROM students as s INNER JOIN teacher_students as ts ON ts.studentId = s.id INNER JOIN teachers as t ON t.id = ts.teacherId WHERE ts.teacherId = 1`,
      {
        type: QueryTypes.SELECT,
      }
    );
    expect(rows.map((e) => e.email)).toMatchObject(students);
  });

  it('Should throw error for invalid teacher email', async () => {
    const teacher = 'teacherken@.com';
    const students = ['studentmac@gmail.com', 'studentkendall@gmail.com'];

    await expect(async () => {
      await registerStudents({ teacher, students });
    }).rejects.toThrow(ZodError);
  });

  it('Should throw error for invalid student email', async () => {
    const teacher = 'teacherken@gmail.com';
    const students = ['studentmac.com', 'studentkendall@gmail.com'];

    await expect(async () => {
      await registerStudents({ teacher, students });
    }).rejects.toThrow(ZodError);
  });

  afterAll(() => {
    sequelize.close();
  });
});

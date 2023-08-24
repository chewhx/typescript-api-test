import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';
import { getCommonStudents } from './getCommonStudents';
import { ZodError } from 'zod';

describe('getCommonStudents', () => {
  it('Should be defined', () => {
    expect(getCommonStudents).toBeDefined();
  });

  it('Should get students for one teacher', async () => {
    const teacher = 'teacherken@gmail.com';
    const students = ['studentmac@gmail.com', 'studentkendall@gmail.com'];

    const res = await getCommonStudents({ teacher });

    expect(res).toBeDefined();
    expect(res).toMatchObject(students);
  });

  it('Should get common students for two teacher', async () => {
    const teacher = ['teacherken@gmail.com', 'teacherkaia@gmail.com'];
    const students = ['studentmac@gmail.com', 'studentkendall@gmail.com'];

    const res = await getCommonStudents({ teacher });

    expect(res).toBeDefined();
    expect(res).toMatchObject(students);
  });

  it('Should throw error for invalid teacher email', async () => {
    const teacher = 'teacherken.com';

    await expect(async () => {
      await getCommonStudents({ teacher });
    }).rejects.toThrow(ZodError);
  });

  afterAll(() => {
    sequelize.close();
  });
});

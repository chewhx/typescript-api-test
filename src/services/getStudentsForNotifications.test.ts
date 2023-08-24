import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';
import { getStudentsForNotifications } from './getStudentsForNotifications';
import { ZodError } from 'zod';

describe('getStudentsForNotifications', () => {
  it('Should be defined', () => {
    expect(getStudentsForNotifications).toBeDefined();
  });

  it('Should return students for a teacher without student mentions', async () => {
    const teacher = 'teacherken@gmail.com';
    const notification = 'Hello students!';
    const students = ['studentkendall@gmail.com']; // studentmac@gmail.com is suspended

    const res = await getStudentsForNotifications({ teacher, notification });

    expect(res).toMatchObject(students);
  });

  it('Should return students for a teacher with student mentions', async () => {
    const teacher = 'teacherken@gmail.com';
    const notification =
      'Hello students! @studentalexandro@gmail.com @studentjuana@gmail.com';
    const students = [
      'studentkendall@gmail.com',
      'studentalexandro@gmail.com',
      'studentjuana@gmail.com',
    ];

    const res = await getStudentsForNotifications({ teacher, notification });

    expect(res).toMatchObject(students);
  });

  it('Should throw error for invalid teach email', async () => {
    const teacher = 'teacherken@.com';
    const notification =
      'Hello students! @studentalexandro@gmail.com @studentjuana@gmail.com';

    await expect(async () => {
      await getStudentsForNotifications({ teacher, notification });
    }).rejects.toThrow(ZodError);
  });

  afterAll(() => {
    sequelize.close();
  });
});

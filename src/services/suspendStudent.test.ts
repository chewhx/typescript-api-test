import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';
import { suspendStudent } from './suspend-student/service';
import { ZodError } from 'zod';

describe('suspendStudent', () => {
  it('Should be defined', () => {
    expect(suspendStudent).toBeDefined();
  });

  it('Should suspend student', async () => {
    const student = 'studentmac@gmail.com';

    const res = await suspendStudent({ student });

    expect(res).toBeUndefined();

    const rows: { isSuspended: number }[] = await sequelize.query(
      `
    SELECT s.isSuspended FROM students as s WHERE s.id = 1 LIMIT 1`,
      {
        type: QueryTypes.SELECT,
      }
    );
    expect(rows[0].isSuspended).toBe(1);
  });

  it('Should throw error for invalid student email', async () => {
    const student = 'studentmac.com';

    await expect(async () => {
      await suspendStudent({ student });
    }).rejects.toThrow(ZodError);
  });

  afterAll(() => {
    sequelize.close();
  });
});

import { QueryTypes } from 'sequelize';
import { z } from 'zod';
import sequelize from '../config/database';
import Logger from '../config/logger';

export const getCommonStudentsDto = z.object({
  teacher: z.array(z.string().email()).or(z.string().email()),
});

export type GetCommonStudentsDto = z.infer<typeof getCommonStudentsDto>;

const log = new Logger('getCommonStudents');

export async function getCommonStudents(
  payload: GetCommonStudentsDto
): Promise<string[]> {
  const { teacher } = getCommonStudentsDto.parse(payload);

  const teacherEmails = typeof teacher === 'string' ? [teacher] : teacher;

  log.info(`Get common students for ${teacherEmails.join(',')}`);

  const teacherStudentRows: { email: string }[] = await sequelize.query(
    `SELECT s.email
   FROM students AS s
   INNER JOIN teacher_students AS ts ON s.id = ts.studentId
   INNER JOIN teachers AS t ON ts.teacherId = t.id
   WHERE t.email IN (${teacherEmails.map((e) => `'${e}'`).join(',')})
   GROUP BY s.id, s.email
   HAVING COUNT(t.id) = ${teacherEmails.length}; `,
    {
      type: QueryTypes.SELECT,
    }
  );

  return teacherStudentRows.map((e) => e.email);
}

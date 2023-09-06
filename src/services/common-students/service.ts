import { Op } from 'sequelize';
import Logger from '../../config/logger';
import { Student, Teacher } from '../../models';

const log = new Logger('getCommonStudents');

export async function getCommonStudents({
  teacher,
  studentModel,
}: {
  teacher: string | string[];
  studentModel: typeof Student;
}): Promise<string[]> {
  const teacherEmails = typeof teacher === 'string' ? [teacher] : teacher;

  log.info(`Get common students for ${teacherEmails.join(',')}`);

  const teacherStudentRows = await studentModel.findAll({
    include: [
      {
        model: Teacher,
        where: {
          email: {
            [Op.in]: teacherEmails,
          },
        },
        attributes: ['id'],
      },
    ],
    attributes: ['email'],
  });

  return teacherStudentRows
    .filter((e) => e.Teachers?.length === teacherEmails.length)
    .map((e) => e.email);
}

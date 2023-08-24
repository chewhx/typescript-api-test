import { z } from 'zod';
import { Student } from '../models';
import sequelize from '../config/database';
import { Op, QueryTypes } from 'sequelize';
import Logger from '../config/logger';

export const getStudentsForNotificationsDto = z.object({
  teacher: z.string().email(),
  notification: z.string(),
});

const emailRegex = /@(\S+@gmail\.com)\b/g;

export type GetStudentsForNotificationsDto = z.infer<
  typeof getStudentsForNotificationsDto
>;

const log = new Logger('getStudentsForNotifications');

export async function getStudentsForNotifications(
  payload: GetStudentsForNotificationsDto
): Promise<string[]> {
  const { teacher, notification } =
    getStudentsForNotificationsDto.parse(payload);

  // Get students attached to teacher
  const recipients = new Set<string>();

  const res: { email: string }[] = await sequelize.query(
    `
  SELECT s.email FROM teachers as t 
  INNER JOIN teacher_students as ts ON ts.teacherId = t.id 
  INNER JOIN students as s ON ts.studentId = s.id 
  WHERE t.email = '${teacher}' AND s.isSuspended = 0;
  `,
    {
      type: QueryTypes.SELECT,
    }
  );

  log.info(`Get unsuspended students for ${teacher}`);

  // Add student emails to set
  res.forEach((e) => recipients.add(e.email));

  // Get students from '@' mentioned
  const mentionedStudentEmails = notification
    .match(emailRegex)
    ?.map((e) => e.slice(1));

  if (!mentionedStudentEmails) {
    log.info('No mentioned students');
  } else {
    const mentionedStudents = await Student.findAll({
      attributes: ['email'],
      where: {
        email: {
          [Op.in]: mentionedStudentEmails,
        },
        [Op.and]: {
          isSuspended: false,
        },
      },
    });

    log.info('Get unsuspended and mentioned students');

    mentionedStudents.forEach((e) => recipients.add(e.email));
  }

  return Array.from(recipients);
}

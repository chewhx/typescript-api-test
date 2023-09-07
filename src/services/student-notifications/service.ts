import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import Logger from '../../config/logger';
import ErrorCodes from '../../const/ErrorCodes';
import ErrorBase from '../../errors/ErrorBase';
import { Student, Teacher } from '../../models';

export function extractMentionedEmails(message: string): string[] {
  if (!message || !message?.length) {
    return [];
  }
  const emailRegex = /@(\S+@gmail\.com)\b/g;
  return message?.match(emailRegex)?.map((e) => e.slice(1)) || [];
}

const log = new Logger('getStudentsForNotifications');

export async function getStudentsForNotifications({
  teacher,
  notification,
  teacherModel,
  studentModel,
}: {
  teacher: string;
  notification: string;
  teacherModel: typeof Teacher;
  studentModel: typeof Student;
}): Promise<string[]> {
  if (!teacher) {
    return [];
  }
  
  // ------------- Part 1. Registered students ----------------
  // Get students attached to teacher
  const teacherRow = await teacherModel.findOne({
    where: {
      email: teacher,
    },
    include: {
      model: studentModel,
      attributes: ['email'],
      where: {
        isSuspended: false,
      },
    },
  });

  if (!teacherRow) {
    throw new ErrorBase(
      `${teacher} is invalid`,
      ErrorCodes.RUNTIME_ERROR_CODE,
      StatusCodes.BAD_REQUEST
    );
  }

  log.info(`Get unsuspended students for ${teacher}`);

  // Create recipients set
  const recipients = new Set<string>();

  // Add registered student emails to set
  teacherRow.Students.forEach((e) => recipients.add(e.email));

  // -------------- Part 2. Mentioned Students ------------
  // Get students from '@' mentioned
  const mentionedStudentEmails = extractMentionedEmails(notification);

  // If no students mentioned, do nothing
  if (!mentionedStudentEmails) {
    log.info('No mentioned students');
  } else {
    // Else, check if student emails exists in db
    const mentionedStudents = await studentModel.findAll({
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

    // Add emails to recipients set
    mentionedStudents.forEach((e) => recipients.add(e.email));
  }

  return Array.from(recipients);
}

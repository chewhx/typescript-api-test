import { Op } from 'sequelize';
import { z } from 'zod';
import Logger from '../config/logger';
import ErrorBase from '../errors/ErrorBase';
import ErrorCodes from '../const/ErrorCodes';
import { StatusCodes } from 'http-status-codes';
import { Student, Teacher, TeacherStudents } from '../models';

export const registerStudentsDto = z.object({
  teacher: z.string().email(),
  students: z.array(z.string().email()),
});

export type RegisterStudentsDto = z.infer<typeof registerStudentsDto>;

const log = new Logger('registerStudents');

export async function registerStudents(
  payload: RegisterStudentsDto
): Promise<void> {
  const { teacher, students } = registerStudentsDto.parse(payload);

  // Get teacher id with email
  const teacherRow = await Teacher.findOne({
    where: { email: teacher },
    attributes: ['id'],
  });

  // Error: If teacher with email is not found
  if (!teacherRow) {
    throw new ErrorBase(
      `${teacher} is invalid`,
      ErrorCodes.RUNTIME_ERROR_CODE,
      StatusCodes.BAD_REQUEST
    );
  }

  // Get id for each student and create relationship
  const studentRows = await Student.findAll({
    where: {
      email: {
        [Op.in]: students,
      },
    },
    attributes: ['id', 'email'],
  });

  // For each student id, upsert into teacher_student table
  await Promise.all(
    studentRows.map(async (studentInstance) => {
      await TeacherStudents.upsert({
        teacherId: teacherRow.id,
        studentId: studentInstance.id,
      });

      log.info(`Registered ${studentInstance.email} to ${teacher}`);
    })
  );
}

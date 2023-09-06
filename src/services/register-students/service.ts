import { StatusCodes } from 'http-status-codes';
import Logger from '../../config/logger';
import ErrorCodes from '../../const/ErrorCodes';
import ErrorBase from '../../errors/ErrorBase';
import { Student, Teacher } from '../../models';

const log = new Logger('registerStudents');

export async function registerStudents({
  teacher,
  students,
  teacherModel,
  studentModel,
}: {
  teacher: string;
  students: string[];
  teacherModel: typeof Teacher;
  studentModel: typeof Student;
}): Promise<void> {
  // Get teacher id with email
  const teacherRow = await teacherModel.findOne({
    where: { email: teacher },
  });

  // Error: If teacher with email is not found
  if (!teacherRow) {
    throw new ErrorBase(
      `${teacher} is invalid`,
      ErrorCodes.RUNTIME_ERROR_CODE,
      StatusCodes.BAD_REQUEST
    );
  }

  // Upsert students
  const studentUpserts = await Promise.all(
    students.map(async (e) => {
      const [instance] = await studentModel.findOrCreate({
        where: {
          email: e,
        },
        defaults: {
          isSuspended: false,
        },
      });

      log.info(`Upserted student: ${e}`);

      return instance;
    })
  );

  // Insert student associations
  await teacherRow.addStudents(studentUpserts);
}

import { Student } from '../../models';
import Logger from '../../config/logger';

const log = new Logger('suspendStudent');

export async function suspendStudent({
  student,
  studentModel,
}: {
  student: string;
  studentModel: typeof Student;
}): Promise<void> {
  await studentModel.update(
    {
      isSuspended: true,
    },
    {
      where: {
        email: student,
      },
    }
  );

  log.info(`Suspended ${student}`);
}

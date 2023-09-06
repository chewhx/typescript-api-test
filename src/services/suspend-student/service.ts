import { Student } from '../../models';
import Logger from '../../config/logger';

const log = new Logger('suspendStudent');

export async function suspendStudent(student: string): Promise<void> {
  await Student.update(
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

import { z } from 'zod';
import { Student } from '../models';
import Logger from '../config/logger';

export const suspendStudentDto = z.object({
  student: z.string().email(),
});

export type SuspendStudentDto = z.infer<typeof suspendStudentDto>;

const log = new Logger('suspendStudent');

export async function suspendStudent(
  payload: SuspendStudentDto
): Promise<void> {
  const { student } = suspendStudentDto.parse(payload);

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

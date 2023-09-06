import { z } from 'zod';

export const suspendStudentDto = z.object({
  student: z.string().email(),
});

export type SuspendStudentDto = z.infer<typeof suspendStudentDto>;

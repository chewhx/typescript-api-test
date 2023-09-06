import { z } from 'zod';

export const registerStudentsDto = z.object({
  teacher: z.string().email(),
  students: z.array(z.string().email()),
});

export type RegisterStudentsDto = z.infer<typeof registerStudentsDto>;

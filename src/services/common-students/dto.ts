import { z } from 'zod';

export const getCommonStudentsDto = z.object({
  teacher: z.array(z.string().email()).or(z.string().email()),
});

export type GetCommonStudentsDto = z.infer<typeof getCommonStudentsDto>;

import { z } from 'zod';

export const getStudentsForNotificationsDto = z.object({
  teacher: z.string().email(),
  notification: z.string(),
});

export type GetStudentsForNotificationsDto = z.infer<
  typeof getStudentsForNotificationsDto
>;

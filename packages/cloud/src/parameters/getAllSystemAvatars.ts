import { z } from 'zod';

export const GetAllSystemAvatarsSchema = z.object({
  /** The avatar type. */
  type: z.enum(['issuetype', 'project', 'user', 'priority']),
});

export type GetAllSystemAvatars = z.input<typeof GetAllSystemAvatarsSchema>;

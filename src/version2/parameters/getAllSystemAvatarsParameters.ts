import { z } from 'zod';

export const GetAllSystemAvatarsParametersSchema = z.object({
  /** The avatar type. */
  type: z.enum(['issuetype', 'project', 'user', 'priority']),
});

export type GetAllSystemAvatarsParameters = z.infer<typeof GetAllSystemAvatarsParametersSchema>;

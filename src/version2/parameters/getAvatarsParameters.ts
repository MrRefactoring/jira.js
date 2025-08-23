import { z } from 'zod';

export const GetAvatarsParametersSchema = z.object({
  /** The avatar type. */
  type: z.enum(['project', 'issuetype', 'priority']),
  /** The ID of the item the avatar is associated with. */
  entityId: z.string(),
});

export type GetAvatarsParameters = z.infer<typeof GetAvatarsParametersSchema>;

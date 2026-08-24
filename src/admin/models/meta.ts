import { z } from 'zod';
import { apiObject } from '#/core';

export const MetaSchema = apiObject({
  scheduledDate: z.string().optional(),
  migrationStartDateTime: z.string().optional(),
  migrationEndDataTime: z.string().optional(),
  atlassianAccountId: z.string().optional(),
});

export type Meta = z.infer<typeof MetaSchema>;

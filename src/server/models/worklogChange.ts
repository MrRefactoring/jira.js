import { z } from 'zod';
import { apiObject } from '#/core';

export const WorklogChangeSchema = apiObject({
  updatedTime: z.number().optional(),
  worklogId: z.number().optional(),
});

export type WorklogChange = z.infer<typeof WorklogChangeSchema>;

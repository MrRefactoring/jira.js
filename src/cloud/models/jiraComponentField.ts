import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraComponentFieldSchema = apiObject({
  componentId: z.number(),
});

export type JiraComponentField = z.infer<typeof JiraComponentFieldSchema>;

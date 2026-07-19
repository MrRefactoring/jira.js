import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraVersionFieldSchema = apiObject({
  versionId: z.string().optional(),
});

export type JiraVersionField = z.infer<typeof JiraVersionFieldSchema>;

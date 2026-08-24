import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectSchema = apiObject({
  archived: z.boolean().optional(),
  avatarUrls: z.record(z.string(), z.any()).optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

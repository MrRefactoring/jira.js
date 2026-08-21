import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectSchema = apiObject({
  avatarUrl: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  key: z.string().optional(),
  url: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

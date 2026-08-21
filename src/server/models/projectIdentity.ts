import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectIdentitySchema = apiObject({
  id: z.number().optional(),
  key: z.string().optional(),
  self: z.url().optional(),
});

export type ProjectIdentity = z.infer<typeof ProjectIdentitySchema>;

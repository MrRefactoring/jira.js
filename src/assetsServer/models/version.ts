import { z } from 'zod';
import { apiObject } from '#/core';

export const VersionSchema = apiObject({
  avatarUrl: z.string().optional(),
  name: z.string().optional(),
  id: z.number().optional(),
  url: z.string().optional(),
});

export type Version = z.infer<typeof VersionSchema>;

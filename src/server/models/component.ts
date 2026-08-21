import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { UserSchema } from './user';

export const ComponentSchema = apiObject({
  archived: z.boolean().optional(),
  assigneeType: openEnum(['PROJECT_DEFAULT', 'COMPONENT_LEAD', 'PROJECT_LEAD', 'UNASSIGNED']).optional(),
  deleted: z.boolean().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  lead: UserSchema.optional(),
  leadUserName: z.string().optional(),
  name: z.string().optional(),
  project: z.string().optional(),
  self: z.url().optional(),
});

export type Component = z.infer<typeof ComponentSchema>;

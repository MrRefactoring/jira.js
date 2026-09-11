import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomFieldSchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  isAllProjects: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  isManaged: z.boolean().optional(),
  isTrusted: z.boolean().optional(),
  issueTypeIds: z.array(z.string()).optional(),
  issuesWithValue: z.number().optional(),
  lastValueUpdate: z.coerce.date().optional(),
  name: z.string().optional(),
  numericId: z.number().optional(),
  projectIds: z.array(z.number()).optional(),
  projectsCount: z.number().optional(),
  screensCount: z.number().optional(),
  searcherKey: z.string().optional(),
  self: z.url().optional(),
  type: z.string().optional(),
});

export type CustomField = z.infer<typeof CustomFieldSchema>;

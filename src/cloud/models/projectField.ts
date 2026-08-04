import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectFieldSchema = apiObject({
  description: z.string().optional(),
  fieldId: z.string().optional(),
  isRequired: z.boolean().optional(),
  projectId: z.number().optional(),
  workTypeId: z.number().optional(),
});

export type ProjectField = z.infer<typeof ProjectFieldSchema>;

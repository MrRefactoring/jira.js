import { z } from 'zod';
import { apiObject } from '#/core';
import { PolicyApplicationViolationSchema } from './policyApplicationViolation';

export const ProjectResultSchema = apiObject({
  errors: z.array(PolicyApplicationViolationSchema).optional(),
  message: z.string().optional(),
  projectId: z.number().optional(),
});

export type ProjectResult = z.infer<typeof ProjectResultSchema>;

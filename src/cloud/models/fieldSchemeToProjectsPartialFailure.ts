import { z } from 'zod';
import { apiObject } from '#/core';
/** Partial failure result when updating field scheme to projects associations. */

export const FieldSchemeToProjectsPartialFailureSchema = apiObject({
  error: z.string().optional(),
  projectId: z.number(),
  schemeId: z.number(),
  success: z.boolean(),
});

export type FieldSchemeToProjectsPartialFailure = z.infer<typeof FieldSchemeToProjectsPartialFailureSchema>;

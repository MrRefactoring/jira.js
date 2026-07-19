import { z } from 'zod';
import { apiObject } from '#/core';

export const UpdateIssueSecuritySchemeRequestSchema = apiObject({
  /** The description of the security scheme scheme. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The name of the security scheme scheme. Must be unique. */
  name: z.string().max(60, 'name must be at most 60 characters').optional(),
});

export type UpdateIssueSecuritySchemeRequest = z.infer<typeof UpdateIssueSecuritySchemeRequestSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about data policy. */

export const ProjectDataPolicySchema = apiObject({
  /** Whether the project contains any content inaccessible to the requesting application. */
  anyContentBlocked: z.boolean().optional(),
});

export type ProjectDataPolicy = z.infer<typeof ProjectDataPolicySchema>;

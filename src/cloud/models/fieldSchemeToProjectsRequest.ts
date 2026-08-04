import { z } from 'zod';
import { apiObject } from '#/core';
/** Request for associating field schemes to projects. */

export const FieldSchemeToProjectsRequestSchema = apiObject({
  /** List of project IDs to associate with field schemes */
  projectIds: z.array(z.number()),
});

export type FieldSchemeToProjectsRequest = z.infer<typeof FieldSchemeToProjectsRequestSchema>;

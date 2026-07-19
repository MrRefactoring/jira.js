import { z } from 'zod';
import { apiObject } from '#/core';
/** Response item returned from get projects with field schemes. */

export const GetProjectsWithFieldSchemesResponseSchema = apiObject({
  projectId: z.number().optional(),
  schemeId: z.number().optional(),
});

export type GetProjectsWithFieldSchemesResponse = z.infer<typeof GetProjectsWithFieldSchemesResponseSchema>;

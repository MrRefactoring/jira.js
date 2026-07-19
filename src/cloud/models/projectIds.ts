import { z } from 'zod';
import { apiObject } from '#/core';
/** A list of project IDs. */

export const ProjectIdsSchema = apiObject({
  /** The IDs of projects. */
  projectIds: z.array(z.string()),
});

export type ProjectIds = z.infer<typeof ProjectIdsSchema>;

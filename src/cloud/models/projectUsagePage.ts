import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectUsageSchema } from './projectUsage';
/** A page of projects. */

export const ProjectUsagePageSchema = apiObject({
  /** Page token for the next page of project usages. */
  nextPageToken: z.string().optional(),
  /** The list of projects. */
  values: z.array(ProjectUsageSchema).optional(),
});

export type ProjectUsagePage = z.infer<typeof ProjectUsagePageSchema>;

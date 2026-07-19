import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectDetailsSchema } from './projectDetails';
/** A page of items. */

export const PageProjectDetailsSchema = apiObject({
  /** Whether this is the last page. */
  isLast: z.boolean().optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().optional(),
  /** If there is another page of results, the URL of the next page. */
  nextPage: z.string().url().optional(),
  /** The URL of the page. */
  self: z.string().url().optional(),
  /** The index of the first item returned. */
  startAt: z.number().optional(),
  /** The number of items returned. */
  total: z.number().optional(),
  /** The list of items. */
  values: z.array(ProjectDetailsSchema).optional(),
});

export type PageProjectDetails = z.infer<typeof PageProjectDetailsSchema>;

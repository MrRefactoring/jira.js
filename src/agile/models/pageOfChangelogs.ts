import { z } from 'zod';
import { apiObject } from '#/core';
import { ChangelogSchema } from './changelog';
/** A page of changelogs. */

export const PageOfChangelogsSchema = apiObject({
  /** The list of changelogs. */
  histories: z.array(ChangelogSchema).optional(),
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().optional(),
  /** The number of results on the page. */
  total: z.number().optional(),
});

export type PageOfChangelogs = z.infer<typeof PageOfChangelogsSchema>;

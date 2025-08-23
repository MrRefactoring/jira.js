import { z } from 'zod';
import { ChangelogSchema } from './changelog';

/** A page of changelogs. */
export const PageOfChangelogsSchema = z.object({
  /** The list of changelogs. */
  histories: z.array(ChangelogSchema).optional(),
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().int().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().int().optional(),
  /** The number of results on the page. */
  total: z.number().int().optional(),
});

export type PageOfChangelogs = z.infer<typeof PageOfChangelogsSchema>;

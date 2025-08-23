import { z } from 'zod';
import { VersionSchema } from './version';

/** A page of items. */
export const PageBeanVersionSchema = z.object({
  /** Whether this is the last page. */
  isLast: z.boolean().optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().int().optional(),
  /** If there is another page of results, the URL of the next page. */
  nextPage: z.string().optional(),
  /** The URL of the page. */
  self: z.string().optional(),
  /** The index of the first item returned. */
  startAt: z.number().int().optional(),
  /** The number of items returned. */
  total: z.number().int().optional(),
  /** The list of items. */
  values: z.array(VersionSchema).optional(),
});

export type PageBeanVersion = z.infer<typeof PageBeanVersionSchema>;

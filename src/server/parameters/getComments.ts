import { z } from 'zod';

export const GetCommentsSchema = z.object({
  /** Optional flags: renderedBody (provides body rendered in HTML) */
  expand: z.string().optional(),
  /** How many results on the page should be included. Defaults to 50. */
  maxResults: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Ordering of the results */
  orderBy: z.string().optional(),
  /** The page offset, if not specified then defaults to 0 */
  startAt: z.string().optional(),
});

export type GetComments = z.input<typeof GetCommentsSchema>;

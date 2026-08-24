import { z } from 'zod';

export const FindObjectHistorySchema = z.object({
  asc: z.boolean().optional(),
  /** Should the values returned in the history entry be abbreviated. */
  abbreviate: z.string().optional(),
  /** Should the history be retrieved in ascending order. Uses the Jira setting for sort order as its default value. */
  orderAsc: z.string().optional(),
  /** The ID or object key of the object to load. */
  id: z.string(),
});

export type FindObjectHistory = z.input<typeof FindObjectHistorySchema>;

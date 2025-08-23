import { z } from 'zod';
import { ChangeDetailsSchema } from './changeDetails';

/** A log of changes made to issue fields. Changelogs related to workflow associations are currently being deprecated. */
export const ChangelogSchema = z.object({
  /** The user who made the change. */
  author: z.unknown().optional(),
  /** The date on which the change took place. */
  created: z.string().datetime().optional(),
  /** The history metadata associated with the changed. */
  historyMetadata: z.unknown().optional(),
  /** The ID of the changelog. */
  id: z.string().optional(),
  /** The list of items changed. */
  items: z.array(ChangeDetailsSchema).optional(),
});

export type Changelog = z.infer<typeof ChangelogSchema>;

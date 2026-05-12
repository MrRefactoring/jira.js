import { z } from 'zod';
import { UserDetailsSchema } from '#/models/userDetails';
import { HistoryMetadataSchema } from '#/models/historyMetadata';
import { ChangeDetailsSchema } from '#/models/changeDetails';

/** A log of changes made to issue fields. Changelogs related to workflow associations are currently being deprecated. */
export const ChangelogSchema = z.object({
  author: UserDetailsSchema.optional(),
  /** The date on which the change took place. */
  created: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  historyMetadata: HistoryMetadataSchema.optional(),
  /** The ID of the changelog. */
  id: z.string().optional(),
  /** The list of items changed. */
  items: z.array(ChangeDetailsSchema).optional(),
});

export type Changelog = z.infer<typeof ChangelogSchema>;

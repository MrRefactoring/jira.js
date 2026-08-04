import { z } from 'zod';
import { apiObject } from '#/core';
import { UserDetailsSchema } from './userDetails';
import { HistoryMetadataSchema } from './historyMetadata';
import { ChangeDetailsSchema } from './changeDetails';
/** A log of changes made to issue fields. Changelogs related to workflow associations are currently being deprecated. */

export const ChangelogSchema = apiObject({
  author: UserDetailsSchema.optional(),
  /** The date on which the change took place. */
  created: z.coerce.date().optional(),
  historyMetadata: HistoryMetadataSchema.optional(),
  /** The ID of the changelog. */
  id: z.string().optional(),
  /** The list of items changed. */
  items: z.array(ChangeDetailsSchema).optional(),
});

export type Changelog = z.infer<typeof ChangelogSchema>;

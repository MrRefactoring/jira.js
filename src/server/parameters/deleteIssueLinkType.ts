import { z } from 'zod';

export const DeleteIssueLinkTypeSchema = z.object({
  /** The issue link type id. */
  issueLinkTypeId: z.string(),
});

export type DeleteIssueLinkType = z.input<typeof DeleteIssueLinkTypeSchema>;

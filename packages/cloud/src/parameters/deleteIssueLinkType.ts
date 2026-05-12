import { z } from 'zod';

export const DeleteIssueLinkTypeSchema = z.object({
  /** The ID of the issue link type. */
  issueLinkTypeId: z.string(),
});

export type DeleteIssueLinkType = z.input<typeof DeleteIssueLinkTypeSchema>;

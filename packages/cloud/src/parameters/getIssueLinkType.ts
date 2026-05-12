import { z } from 'zod';

export const GetIssueLinkTypeSchema = z.object({
  /** The ID of the issue link type. */
  issueLinkTypeId: z.string(),
});

export type GetIssueLinkType = z.input<typeof GetIssueLinkTypeSchema>;

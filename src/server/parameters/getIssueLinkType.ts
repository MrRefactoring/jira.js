import { z } from 'zod';

export const GetIssueLinkTypeSchema = z.object({
  /** The issue link type id. */
  issueLinkTypeId: z.string(),
});

export type GetIssueLinkType = z.input<typeof GetIssueLinkTypeSchema>;

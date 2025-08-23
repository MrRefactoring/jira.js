import { z } from 'zod';

export const GetIssueLinkTypeParametersSchema = z.object({
  /** The ID of the issue link type. */
  issueLinkTypeId: z.string(),
});

export type GetIssueLinkTypeParameters = z.infer<typeof GetIssueLinkTypeParametersSchema>;

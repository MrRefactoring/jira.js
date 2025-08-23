import { z } from 'zod';

export const DeleteIssueLinkTypeParametersSchema = z.object({
  /** The ID of the issue link type. */
  issueLinkTypeId: z.string(),
});

export type DeleteIssueLinkTypeParameters = z.infer<typeof DeleteIssueLinkTypeParametersSchema>;

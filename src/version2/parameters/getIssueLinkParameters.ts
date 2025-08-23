import { z } from 'zod';

export const GetIssueLinkParametersSchema = z.object({
  /** The ID of the issue link. */
  linkId: z.string(),
});

export type GetIssueLinkParameters = z.infer<typeof GetIssueLinkParametersSchema>;

import { z } from 'zod';

export const DeleteIssueLinkParametersSchema = z.object({
  /** The ID of the issue link. */
  linkId: z.string(),
});

export type DeleteIssueLinkParameters = z.infer<typeof DeleteIssueLinkParametersSchema>;

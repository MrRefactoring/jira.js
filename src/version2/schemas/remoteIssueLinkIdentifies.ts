import { z } from 'zod';

/** Details of the identifiers for a created or updated remote issue link. */
export const RemoteIssueLinkIdentifiesSchema = z.object({
  /** The ID of the remote issue link, such as the ID of the item on the remote system. */
  id: z.number().int().optional(),
  /** The URL of the remote issue link. */
  self: z.string().optional(),
});

export type RemoteIssueLinkIdentifies = z.infer<typeof RemoteIssueLinkIdentifiesSchema>;

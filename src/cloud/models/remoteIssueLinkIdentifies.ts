import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of the identifiers for a created or updated remote issue link. */

export const RemoteIssueLinkIdentifiesSchema = apiObject({
  /** The ID of the remote issue link, such as the ID of the item on the remote system. */
  id: z.number().optional(),
  /** The URL of the remote issue link. */
  self: z.string().optional(),
});

export type RemoteIssueLinkIdentifies = z.infer<typeof RemoteIssueLinkIdentifiesSchema>;

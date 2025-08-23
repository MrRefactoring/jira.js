import { z } from 'zod';

/** Details of an issue remote link. */
export const RemoteIssueLinkSchema = z.object({
  /** Details of the remote application the linked item is in. */
  application: z.unknown().optional(),
  /** The global ID of the link, such as the ID of the item on the remote system. */
  globalId: z.string().optional(),
  /** The ID of the link. */
  id: z.number().int().optional(),
  /** Details of the item linked to. */
  object: z.unknown().optional(),
  /** Description of the relationship between the issue and the linked item. */
  relationship: z.string().optional(),
  /** The URL of the link. */
  self: z.string().optional(),
});

export type RemoteIssueLink = z.infer<typeof RemoteIssueLinkSchema>;

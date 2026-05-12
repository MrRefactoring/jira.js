import { z } from 'zod';
import { ApplicationSchema } from '#/models/application';
import { RemoteObjectSchema } from '#/models/remoteObject';

/** Details of an issue remote link. */
export const RemoteIssueLinkSchema = z.object({
  application: ApplicationSchema.optional(),
  /** The global ID of the link, such as the ID of the item on the remote system. */
  globalId: z.string().optional(),
  /** The ID of the link. */
  id: z.number().optional(),
  object: RemoteObjectSchema.optional(),
  /** Description of the relationship between the issue and the linked item. */
  relationship: z.string().optional(),
  /** The URL of the link. */
  self: z.url().optional(),
});

export type RemoteIssueLink = z.infer<typeof RemoteIssueLinkSchema>;

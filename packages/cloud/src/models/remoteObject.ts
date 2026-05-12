import { z } from 'zod';
import { IconSchema } from '#/models/icon';
import { StatusSchema } from '#/models/status';

/** The linked item. */
export const RemoteObjectSchema = z.object({
  icon: IconSchema.optional(),
  status: StatusSchema.optional(),
  /** The summary details of the item. */
  summary: z.string().optional(),
  /** The title of the item. */
  title: z.string(),
  /** The URL of the item. */
  url: z.string(),
});

export type RemoteObject = z.infer<typeof RemoteObjectSchema>;

import { z } from 'zod';

/** The linked item. */
export const RemoteObjectSchema = z.object({
  /** Details of the icon for the item. If no icon is defined, the default link icon is used in Jira. */
  icon: z.unknown().optional(),
  /** The status of the item. */
  status: z.unknown().optional(),
  /** The summary details of the item. */
  summary: z.string().optional(),
  /** The title of the item. */
  title: z.string(),
  /** The URL of the item. */
  url: z.string(),
});

export type RemoteObject = z.infer<typeof RemoteObjectSchema>;

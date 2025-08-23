import { z } from 'zod';

/** The status of the item. */
export const StatusSchema = z.object({
  /** Details of the icon representing the status. If not provided, no status icon displays in Jira. */
  icon: z.unknown().optional(),
  /**
   * Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font,
   * otherwise the link displays in normal font.
   */
  resolved: z.boolean().optional(),
});

export type Status = z.infer<typeof StatusSchema>;

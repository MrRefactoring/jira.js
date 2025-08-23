import { z } from 'zod';

/** Details about a notification event. */
export const NotificationEventSchema = z.object({
  /** The description of the event. */
  description: z.string().optional(),
  /**
   * The ID of the event. The event can be a [Jira system
   * event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom
   * event](https://confluence.atlassian.com/x/AIlKLg).
   */
  id: z.number().int().optional(),
  /** The name of the event. */
  name: z.string().optional(),
  /** The template of the event. Only custom events configured by Jira administrators have template. */
  templateEvent: z.unknown().optional(),
});

export type NotificationEvent = z.infer<typeof NotificationEventSchema>;

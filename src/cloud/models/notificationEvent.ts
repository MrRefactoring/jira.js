import { z } from 'zod';
import { apiObject } from '#/core';

export interface NotificationEvent {
  description?: string;
  id?: number;
  name?: string;
  templateEvent?: NotificationEvent;
}
/** Details about a notification event. */

export const NotificationEventSchema: z.ZodType<NotificationEvent> = apiObject({
  /** The description of the event. */
  description: z.string().optional(),
  /**
   * The ID of the event. The event can be a [Jira system
   * event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom
   * event](https://confluence.atlassian.com/x/AIlKLg).
   */
  id: z.number().optional(),
  /** The name of the event. */
  name: z.string().optional(),
  templateEvent: z.lazy(() => NotificationEventSchema).optional(),
});

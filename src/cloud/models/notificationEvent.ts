import { z } from 'zod';
import { apiObject } from '#/core';

export interface NotificationEvent {
  /** The description of the event. */
  description?: string;
  /**
   * The ID of the event. The event can be a [Jira system
   * event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom
   * event](https://confluence.atlassian.com/x/AIlKLg).
   */
  id?: number;
  /** The name of the event. */
  name?: string;
  templateEvent?: NotificationEvent;
  [key: string]: unknown;
}

export interface NotificationEventInput {
  /** The description of the event. */
  description?: string;
  /**
   * The ID of the event. The event can be a [Jira system
   * event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom
   * event](https://confluence.atlassian.com/x/AIlKLg).
   */
  id?: number;
  /** The name of the event. */
  name?: string;
  templateEvent?: NotificationEventInput;
}

/** Details about a notification event. */
export const NotificationEventSchema = apiObject({
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
  templateEvent: (
    z.lazy((): z.ZodType<NotificationEvent, NotificationEventInput> => NotificationEventSchema) as z.ZodType<
      NotificationEvent,
      NotificationEventInput
    >
  ).optional(),
}) satisfies z.ZodType<NotificationEvent, NotificationEventInput>;

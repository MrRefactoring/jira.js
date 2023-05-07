/** Details about a notification event. */
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
}

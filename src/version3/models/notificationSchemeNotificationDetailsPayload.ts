/** The configuration for notification recipents */
export interface NotificationSchemeNotificationDetailsPayload {
  /** The type of notification. */
  notificationType?: string;
  /** The parameter of the notification, should be eiither null if not required, or PCRI. */
  parameter?: string;
}

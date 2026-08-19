import { pageSchema, type Page } from './page';
import { NotificationSchemeSchema, type NotificationScheme } from './notificationScheme';

export const PageNotificationSchemeSchema = pageSchema(NotificationSchemeSchema);

/**
 * @deprecated Use `Page<NotificationScheme>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageNotificationScheme = Page<NotificationScheme>;

import { pageSchema, type Page } from './page';
import {
  NotificationSchemeAndProjectMappingSchema,
  type NotificationSchemeAndProjectMapping,
} from './notificationSchemeAndProjectMapping';

export const NotificationSchemeAndProjectMappingPageSchema = pageSchema(NotificationSchemeAndProjectMappingSchema);

/**
 * @deprecated Use `Page<NotificationSchemeAndProjectMapping>`, which describes the same shape. This alias is removed in
 *   the next major version.
 */
export type NotificationSchemeAndProjectMappingPage = Page<NotificationSchemeAndProjectMapping>;

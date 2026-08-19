import { pageSchema, type Page } from './page';
import {
  NotificationSchemeAndProjectMappingJsonSchema,
  type NotificationSchemeAndProjectMappingJson,
} from './notificationSchemeAndProjectMappingJson';

export const NotificationSchemeAndProjectMappingPageSchema = pageSchema(NotificationSchemeAndProjectMappingJsonSchema);

/**
 * @deprecated Use `Page<NotificationSchemeAndProjectMappingJson>`, which describes the same shape. This alias is
 *   removed in the next major version.
 */
export type NotificationSchemeAndProjectMappingPage = Page<NotificationSchemeAndProjectMappingJson>;

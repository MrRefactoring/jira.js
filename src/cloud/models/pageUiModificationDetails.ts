import { pageSchema, type Page } from './page';
import { UiModificationDetailsSchema, type UiModificationDetails } from './uiModificationDetails';

export const PageUiModificationDetailsSchema = pageSchema(UiModificationDetailsSchema);

/**
 * @deprecated Use `Page<UiModificationDetails>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageUiModificationDetails = Page<UiModificationDetails>;

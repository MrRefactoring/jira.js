import { pageSchema, type Page } from './page';
import {
  FieldConfigurationIssueTypeItemSchema,
  type FieldConfigurationIssueTypeItem,
} from './fieldConfigurationIssueTypeItem';

export const PageFieldConfigurationIssueTypeItemSchema = pageSchema(FieldConfigurationIssueTypeItemSchema);

/**
 * @deprecated Use `Page<FieldConfigurationIssueTypeItem>`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export type PageFieldConfigurationIssueTypeItem = Page<FieldConfigurationIssueTypeItem>;

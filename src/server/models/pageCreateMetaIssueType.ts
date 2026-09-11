import { pageSchema, type Page } from './page';
import { CreateMetaIssueTypeSchema, type CreateMetaIssueType } from './createMetaIssueType';

export const PageCreateMetaIssueTypeSchema = pageSchema(CreateMetaIssueTypeSchema);

/**
 * @deprecated Use `Page<CreateMetaIssueType>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageCreateMetaIssueType = Page<CreateMetaIssueType>;

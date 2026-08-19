import { pageSchema, type Page } from './page';
import { IssueTypeSchemeMappingSchema, type IssueTypeSchemeMapping } from './issueTypeSchemeMapping';

export const PageIssueTypeSchemeMappingSchema = pageSchema(IssueTypeSchemeMappingSchema);

/**
 * @deprecated Use `Page<IssueTypeSchemeMapping>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageIssueTypeSchemeMapping = Page<IssueTypeSchemeMapping>;

import { pageSchema, type Page } from './page';
import { IssueTypeToContextMappingSchema, type IssueTypeToContextMapping } from './issueTypeToContextMapping';

export const PageIssueTypeToContextMappingSchema = pageSchema(IssueTypeToContextMappingSchema);

/**
 * @deprecated Use `Page<IssueTypeToContextMapping>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageIssueTypeToContextMapping = Page<IssueTypeToContextMapping>;

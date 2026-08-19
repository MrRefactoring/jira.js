import { pageSchema, type Page } from './page';
import { IssueTypeSchemeSchema, type IssueTypeScheme } from './issueTypeScheme';

export const PageIssueTypeSchemeSchema = pageSchema(IssueTypeSchemeSchema);

/**
 * @deprecated Use `Page<IssueTypeScheme>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageIssueTypeScheme = Page<IssueTypeScheme>;

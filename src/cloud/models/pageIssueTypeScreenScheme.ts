import { pageSchema, type Page } from './page';
import { IssueTypeScreenSchemeSchema, type IssueTypeScreenScheme } from './issueTypeScreenScheme';

export const PageIssueTypeScreenSchemeSchema = pageSchema(IssueTypeScreenSchemeSchema);

/**
 * @deprecated Use `Page<IssueTypeScreenScheme>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageIssueTypeScreenScheme = Page<IssueTypeScreenScheme>;

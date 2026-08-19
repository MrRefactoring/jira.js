import { pageSchema, type Page } from './page';
import { IssueTypeScreenSchemeItemSchema, type IssueTypeScreenSchemeItem } from './issueTypeScreenSchemeItem';

export const PageIssueTypeScreenSchemeItemSchema = pageSchema(IssueTypeScreenSchemeItemSchema);

/**
 * @deprecated Use `Page<IssueTypeScreenSchemeItem>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageIssueTypeScreenSchemeItem = Page<IssueTypeScreenSchemeItem>;

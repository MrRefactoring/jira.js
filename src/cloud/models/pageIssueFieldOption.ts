import { pageSchema, type Page } from './page';
import { IssueFieldOptionSchema, type IssueFieldOption } from './issueFieldOption';

export const PageIssueFieldOptionSchema = pageSchema(IssueFieldOptionSchema);

/**
 * @deprecated Use `Page<IssueFieldOption>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageIssueFieldOption = Page<IssueFieldOption>;

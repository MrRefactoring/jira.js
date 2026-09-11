import { pageSchema, type Page } from './page';
import { IssueTypeJsonSchema, type IssueTypeJson } from './issueTypeJson';

export const PageIssueTypeJsonSchema = pageSchema(IssueTypeJsonSchema);

/**
 * @deprecated Use `Page<IssueTypeJson>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageIssueTypeJson = Page<IssueTypeJson>;

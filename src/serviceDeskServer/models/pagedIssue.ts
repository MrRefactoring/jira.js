import { pageSchema, type Page } from './page';
import { IssueSchema, type Issue } from './issue';

export const PagedIssueSchema = pageSchema(IssueSchema);

/** @deprecated Use `Page<Issue>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedIssue = Page<Issue>;

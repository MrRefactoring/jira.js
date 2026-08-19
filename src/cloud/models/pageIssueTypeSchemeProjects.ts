import { pageSchema, type Page } from './page';
import { IssueTypeSchemeProjectsSchema, type IssueTypeSchemeProjects } from './issueTypeSchemeProjects';

export const PageIssueTypeSchemeProjectsSchema = pageSchema(IssueTypeSchemeProjectsSchema);

/**
 * @deprecated Use `Page<IssueTypeSchemeProjects>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageIssueTypeSchemeProjects = Page<IssueTypeSchemeProjects>;

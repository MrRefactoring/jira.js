import { pageSchema, type Page } from './page';
import {
  IssueTypeScreenSchemesProjectsSchema,
  type IssueTypeScreenSchemesProjects,
} from './issueTypeScreenSchemesProjects';

export const PageIssueTypeScreenSchemesProjectsSchema = pageSchema(IssueTypeScreenSchemesProjectsSchema);

/**
 * @deprecated Use `Page<IssueTypeScreenSchemesProjects>`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export type PageIssueTypeScreenSchemesProjects = Page<IssueTypeScreenSchemesProjects>;

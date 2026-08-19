import { pageSchema, type Page } from './page';
import { IssueSecurityLevelMemberSchema, type IssueSecurityLevelMember } from './issueSecurityLevelMember';

export const PageIssueSecurityLevelMemberSchema = pageSchema(IssueSecurityLevelMemberSchema);

/**
 * @deprecated Use `Page<IssueSecurityLevelMember>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageIssueSecurityLevelMember = Page<IssueSecurityLevelMember>;

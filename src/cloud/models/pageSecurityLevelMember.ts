import { pageSchema, type Page } from './page';
import { SecurityLevelMemberSchema, type SecurityLevelMember } from './securityLevelMember';

export const PageSecurityLevelMemberSchema = pageSchema(SecurityLevelMemberSchema);

/**
 * @deprecated Use `Page<SecurityLevelMember>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageSecurityLevelMember = Page<SecurityLevelMember>;

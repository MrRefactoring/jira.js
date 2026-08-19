import { pageSchema, type Page } from './page';
import { SecurityLevelSchema, type SecurityLevel } from './securityLevel';

export const PageSecurityLevelSchema = pageSchema(SecurityLevelSchema);

/**
 * @deprecated Use `Page<SecurityLevel>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageSecurityLevel = Page<SecurityLevel>;

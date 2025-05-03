import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';
import type { SecurityLevelPayload } from './securityLevelPayload';

/**
 * The payload for creating a security scheme. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export interface SecuritySchemePayload {
  /** The description of the security scheme */
  description?: string;
  /** The name of the security scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The security levels for the security scheme */
  securityLevels?: SecurityLevelPayload[];
}

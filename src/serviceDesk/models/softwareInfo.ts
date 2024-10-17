import type { Date } from './date.js';
import type { SelfLink } from './selfLink.js';

export interface SoftwareInfo {
  /** Jira Service Management version. */
  version?: string;
  /** Jira Platform version upon which Service Desk is based. */
  platformVersion?: string;
  buildDate?: Date;
  /** Reference of the change set included in the build. */
  buildChangeSet?: string;
  /** Indicates whether the instance is licensed (true) or not (false). */
  isLicensedForUse?: boolean;
  Links?: SelfLink;
}

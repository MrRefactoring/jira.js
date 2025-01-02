import { Date } from './date.mjs';
import { SelfLink } from './selfLink.mjs';

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

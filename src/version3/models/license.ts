import { LicensedApplication } from './licensedApplication';

/** Details about a license for the Jira instance. */
export interface License {
  /** The applications under this license. */
  applications: LicensedApplication[];
}

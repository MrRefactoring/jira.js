import type { DashboardDetails } from '../models';

export interface UpdateDashboard extends DashboardDetails {
  /** The ID of the dashboard to update. */
  id: string;
  /**
   * Whether admin level permissions are used. It should only be true if the user has _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  extendAdminPermissions?: boolean;
}

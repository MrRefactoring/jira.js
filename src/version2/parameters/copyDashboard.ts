import type { DashboardDetails } from '../models';

export interface CopyDashboard extends DashboardDetails {
  id: string;
  /**
   * Whether admin level permissions are used. It should only be true if the user has _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  extendAdminPermissions?: boolean;
}

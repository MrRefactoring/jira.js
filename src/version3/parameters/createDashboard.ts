import type { DashboardDetails, SharePermission } from '../models';

export interface CreateDashboard extends Omit<DashboardDetails, 'editPermissions'> {
  /** The edit permissions for the dashboard. */
  editPermissions?: SharePermission[];
  /**
   * Whether admin level permissions are used. It should only be true if the user has _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  extendAdminPermissions?: boolean;
}

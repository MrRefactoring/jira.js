import { DashboardDetails, SharePermission } from '../models';

export interface CreateDashboard extends Omit<DashboardDetails, 'editPermissions'> {
  /** The edit permissions for the dashboard. */
  editPermissions?: SharePermission[];
}

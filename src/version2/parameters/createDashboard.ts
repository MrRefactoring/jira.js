import type { DashboardDetails, SharePermission } from '../models/index.js';

export interface CreateDashboard extends Omit<DashboardDetails, 'editPermissions'> {
  /** The edit permissions for the dashboard. */
  editPermissions?: SharePermission[];
}

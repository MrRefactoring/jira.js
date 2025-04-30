import type { SharePermission } from './sharePermission';

/** Details of a dashboard. */
export interface DashboardDetails {
  /** The name of the dashboard. */
  name: string;
  /** The description of the dashboard. */
  description?: string;
  /** The share permissions for the dashboard. */
  sharePermissions: SharePermission[];
  /** The edit permissions for the dashboard. */
  editPermissions: SharePermission[];
}

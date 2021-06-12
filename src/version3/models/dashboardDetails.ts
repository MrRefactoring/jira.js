import { SharePermission } from './sharePermission';

/** Details of a dashboard. */
export interface DashboardDetails {
  /** The name of the dashboard. */
  name: string;
  /** The description of the dashboard. */
  description?: string;
  /** The details of any share permissions for the dashboard. */
  sharePermissions: SharePermission[];
}

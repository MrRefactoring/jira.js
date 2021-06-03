import { UserBean } from './userBean';
import { SharePermission } from './sharePermission';

/** Details of a dashboard. */
export interface Dashboard {
  description?: string;
  /** The ID of the dashboard. */
  id: string;
  /** Whether the dashboard is selected as a favorite by the user. */
  isFavourite?: boolean;
  /** The name of the dashboard. */
  name?: string;
  owner?: UserBean;
  /** The number of users who have this dashboard as a favorite. */
  popularity?: number;
  /** The rank of this dashboard. */
  rank?: number;
  /** The URL of these dashboard details. */
  self?: string;
  /** The details of any view share permissions for the dashboard. */
  sharePermissions?: SharePermission[];
  /** The details of any edit share permissions for the dashboard. */
  editPermissions?: SharePermission[];
  /** The URL of the dashboard. */
  view?: string;
}

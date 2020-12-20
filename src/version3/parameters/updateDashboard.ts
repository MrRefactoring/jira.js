import { DashboardDetails } from '../models';

export interface UpdateDashboard extends DashboardDetails {
  /** The ID of the dashboard to update. */
  id: string;
}

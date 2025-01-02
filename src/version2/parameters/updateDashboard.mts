import { DashboardDetails } from '../models/index.mjs';

export interface UpdateDashboard extends DashboardDetails {
  /** The ID of the dashboard to update. */
  id: string;
}

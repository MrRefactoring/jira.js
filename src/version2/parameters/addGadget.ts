import { DashboardGadgetSettings } from '../models';

export interface AddGadget extends DashboardGadgetSettings {
  /** The ID of the dashboard. */
  dashboardId: number;
}

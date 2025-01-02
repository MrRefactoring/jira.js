import { DashboardGadgetSettings } from '../models/index.mjs';

export interface AddGadget extends DashboardGadgetSettings {
  /** The ID of the dashboard. */
  dashboardId: number;
}

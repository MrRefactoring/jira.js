import type { DashboardGadgetUpdateRequest } from '../models';

export interface UpdateGadget extends DashboardGadgetUpdateRequest {
  /** The ID of the dashboard. */
  dashboardId: number;
  /** The ID of the gadget. */
  gadgetId: number;
}

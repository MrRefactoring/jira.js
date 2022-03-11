import { DashboardGadgetPosition } from './dashboardGadgetPosition';

/** The details of the gadget to update. */
export interface DashboardGadgetUpdateRequest {
  /** The title of the gadget. */
  title?: string;
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color?: 'blue' | 'red' | 'yellow' | 'green' | 'cyan' | 'purple' | 'gray' | 'white' | string;
  position?: DashboardGadgetPosition;
}

import { DashboardGadgetPosition } from './dashboardGadgetPosition';

/** Details of a gadget. */
export interface DashboardGadget {
  /** The ID of the gadget instance. */
  id: number;
  /** The module key of the gadget type. */
  moduleKey?: string;
  /** The URI of the gadget type. */
  uri?: string;
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: 'blue' | 'red' | 'yellow' | 'green' | 'cyan' | 'purple' | 'gray' | 'white' | string;
  position?: DashboardGadgetPosition;
  /** The title of the gadget. */
  title: string;
}

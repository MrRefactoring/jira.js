import type { DashboardGadgetPosition } from './dashboardGadgetPosition';

/** Details of the settings for a dashboard gadget. */
export interface DashboardGadgetSettings {
  /** The module key of the gadget type. Can't be provided with `uri`. */
  moduleKey?: string;
  /** The URI of the gadget type. Can't be provided with `moduleKey`. */
  uri?: string;
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color?: 'blue' | 'red' | 'yellow' | 'green' | 'cyan' | 'purple' | 'gray' | 'white' | string;
  position?: DashboardGadgetPosition;
  /** The title of the gadget. */
  title?: string;
  /**
   * Whether to ignore the validation of module key and URI. For example, when a gadget is created that is a part of an
   * application that isn't installed.
   */
  ignoreUriAndModuleKeyValidation?: boolean;
}

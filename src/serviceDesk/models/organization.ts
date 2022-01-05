import { SelfLink } from './selfLink';

export interface Organization {
  /** A unique system generated ID for the organization. */
  id?: string;
  /** Name of the organization. */
  name?: string;
  Links?: SelfLink;
}

import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for the layout details for the start end of a transition */
export interface FromLayoutPayload {
  /** The port that the transition can be made from */
  fromPort?: number;
  status?: ProjectCreateResourceIdentifier;
  /** The port that the transition goes to */
  toPortOverride?: number;
}

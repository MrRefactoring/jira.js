import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for the layout details for the destination end of a transition */
export interface ToLayoutPayload {
  /** Defines where the transition line will be connected to a status. Port 0 to 7 are acceptable values. */
  port?: number;
  status?: ProjectCreateResourceIdentifier;
}

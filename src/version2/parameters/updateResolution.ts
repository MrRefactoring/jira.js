import type { UpdateResolutionDetails } from '../models';

export interface UpdateResolution extends UpdateResolutionDetails {
  /** The ID of the issue resolution. */
  id: string;
}

import { UpdateResolutionDetails } from '../models/index.mjs';

export interface UpdateResolution extends UpdateResolutionDetails {
  /** The ID of the issue resolution. */
  id: string;
}

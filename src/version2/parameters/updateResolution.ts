import type { UpdateResolutionDetails } from '../models/index.js';

export interface UpdateResolution extends UpdateResolutionDetails {
  /** The ID of the issue resolution. */
  id: string;
}

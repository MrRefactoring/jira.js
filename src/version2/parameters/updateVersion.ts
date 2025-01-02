import type { Version } from '../models/index.js';

export interface UpdateVersion extends Version {
  /** The ID of the version. */
  id: string;
}

import { Version } from '../models/index.mjs';

export interface UpdateVersion extends Version {
  /** The ID of the version. */
  id: string;
}

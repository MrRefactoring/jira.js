import { Version } from '../models';

export interface UpdateVersion extends Version {
  /** The ID of the version. */
  id: string;
}

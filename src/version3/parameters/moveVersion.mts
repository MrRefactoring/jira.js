import { VersionMove } from '../models/index.mjs';

export interface MoveVersion extends VersionMove {
  /** The ID of the version to be moved. */
  id: string;
}

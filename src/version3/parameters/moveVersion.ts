import type { VersionMove } from '../models/index.js';

export interface MoveVersion extends VersionMove {
  /** The ID of the version to be moved. */
  id: string;
}

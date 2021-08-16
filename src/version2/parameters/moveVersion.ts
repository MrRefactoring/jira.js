import { VersionMove } from '../models';

export interface MoveVersion extends VersionMove {
  /** The ID of the version to be moved. */
  id: string;
}

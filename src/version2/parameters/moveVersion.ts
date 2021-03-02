import { VersionMoveBean } from '../models';

export interface MoveVersion extends VersionMoveBean {
  /** The ID of the version to be moved. */
  id: string;
}

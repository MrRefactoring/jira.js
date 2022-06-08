import { UpdateUiModificationDetails } from '../models';

export interface UpdateUiModification extends UpdateUiModificationDetails {
  /** The ID of the UI modification. */
  uiModificationId: string;
}

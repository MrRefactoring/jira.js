import { UpdateUiModificationDetails } from '../models/index.mjs';

export interface UpdateUiModification extends UpdateUiModificationDetails {
  /** The ID of the UI modification. */
  uiModificationId: string;
}

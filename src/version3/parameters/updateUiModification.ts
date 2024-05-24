import type { UpdateUiModificationDetails } from '../models/index.js';

export interface UpdateUiModification extends UpdateUiModificationDetails {
  /** The ID of the UI modification. */
  uiModificationId: string;
}

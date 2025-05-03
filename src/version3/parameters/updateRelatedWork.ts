import type { VersionRelatedWork } from '../models';

export interface UpdateRelatedWork extends VersionRelatedWork {
  /** The ID of the version to update the related work on. For the related work id, pass it to the input JSON. */
  id: string;
}

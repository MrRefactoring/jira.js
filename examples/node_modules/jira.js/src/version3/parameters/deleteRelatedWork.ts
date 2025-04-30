export interface DeleteRelatedWork {
  /** The ID of the version that the target related work belongs to. */
  versionId: string;
  /** The ID of the related work to delete. */
  relatedWorkId: string;
}

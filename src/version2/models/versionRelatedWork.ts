/** Associated related work to a version */
export interface VersionRelatedWork {
  /** The category of the related work */
  category: string;
  /** The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API. */
  issueId?: number;
  /**
   * The id of the related work. For the native release note related work item, this will be null, and Rest API does not
   * support updating it.
   */
  relatedWorkId?: string;
  /** The title of the related work */
  title?: string;
  /** The URL of the related work. Will be null for the native release note related work item, but is otherwise required. */
  url?: string;
}

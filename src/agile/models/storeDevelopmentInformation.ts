/**
 * The result of a successful store development information request */
export interface StoreDevelopmentInformation {
  /** The IDs of devinfo entities that have been accepted for submission grouped by their repository IDs. Note that a devinfo entity that isn't updated due to it's updateSequenceId being out of order is not considered a failed submission. */
  acceptedDevinfoEntities?: {};
  /** IDs of devinfo entities that have not been accepted for submission and caused error descriptions, usually due to a problem with the request data. The entities (if present) will be grouped by their repository id and type. Entity IDs are listed with errors associated with that devinfo entity that have prevented it being submitted. */
  failedDevinfoEntities?: {};
  /** Issue keys that are not known on this Jira instance (if any). These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be for projects that no longer exist. If a devinfo entity has been associated with issue keys other than those in this array it will still be stored against those valid keys. */
  unknownIssueKeys?: string[];
}

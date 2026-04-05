import { z } from 'zod';
import { IssueIdOrKeysAssociationSchema } from './issueIdOrKeysAssociation';

/** The result of a successful store development information request */
export const StoreDevelopmentInformationSchema = z.object({
  /**
   * The IDs of devinfo entities that have been accepted for submission grouped by their repository IDs. Note that a
   * devinfo entity that isn't updated due to it's updateSequenceId being out of order is not considered a failed
   * submission.
   */
  acceptedDevinfoEntities: z.record(z.string(), z.any()).optional(),
  /**
   * IDs of devinfo entities that have not been accepted for submission and caused error descriptions, usually due to a
   * problem with the request data. The entities (if present) will be grouped by their repository id and type. Entity
   * IDs are listed with errors associated with that devinfo entity that have prevented it being submitted.
   */
  failedDevinfoEntities: z.record(z.string(), z.any()).optional(),
  /**
   * Issue keys that are not known on this Jira instance (if any). These may be invalid keys (e.g. `UTF-8` is sometimes
   * incorrectly identified as a Jira issue key), or they may be for projects that no longer exist. If a devinfo entity
   * has been associated with issue keys other than those in this array it will still be stored against those valid
   * keys.
   */
  unknownIssueKeys: z.array(z.string()).optional(),
  /**
   * Associations that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be
   * for projects that no longer exist.
   *
   * If a development information entity has been associated with any other association other than those in this array
   * it will still be stored against those valid associations. If a development information entity was only associated
   * with the associations in this array, it is deemed to be invalid and it won't be persisted.
   */
  unknownAssociations: z.array(IssueIdOrKeysAssociationSchema).optional(),
});

export type StoreDevelopmentInformation = z.infer<typeof StoreDevelopmentInformationSchema>;

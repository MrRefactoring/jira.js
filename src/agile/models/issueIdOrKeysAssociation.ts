import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** An association type referencing issues in Jira.* */

export const IssueIdOrKeysAssociationSchema = apiObject({
  /** Defines the association type. */
  associationType: openEnum(['issueKeys', 'issueIdOrKeys']),
  /**
   * The Jira issue keys or IDs to associate the entity with.
   *
   * The number of values counted across all associationTypes must not exceed a limit of 500.
   */
  values: z.array(z.string()),
});

export type IssueIdOrKeysAssociation = z.infer<typeof IssueIdOrKeysAssociationSchema>;

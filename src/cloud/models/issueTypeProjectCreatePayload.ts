import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeHierarchyPayloadSchema } from './issueTypeHierarchyPayload';
import { IssueTypeSchemePayloadSchema } from './issueTypeSchemePayload';
import { IssueTypePayloadSchema } from './issueTypePayload';
/** The payload for creating issue types in a project */

export const IssueTypeProjectCreatePayloadSchema = apiObject({
  /**
   * Defines the issue type hierarhy to be created and used during this project creation. This will only add new
   * levels if there isn't an existing level
   */
  issueTypeHierarchy: z.array(IssueTypeHierarchyPayloadSchema).nullish(),
  issueTypeScheme: IssueTypeSchemePayloadSchema.optional(),
  /**
   * Only needed if you want to create issue types, you can otherwise use the ids of issue types in the scheme
   * configuration
   */
  issueTypes: z.array(IssueTypePayloadSchema).nullish(),
});

export type IssueTypeProjectCreatePayload = z.infer<typeof IssueTypeProjectCreatePayloadSchema>;

import { z } from 'zod';
import { IssueTypeHierarchyPayloadSchema } from '#/models/issueTypeHierarchyPayload';
import { IssueTypeSchemePayloadSchema } from '#/models/issueTypeSchemePayload';
import { IssueTypePayloadSchema } from '#/models/issueTypePayload';

/** The payload for creating issue types in a project */
export const IssueTypeProjectCreatePayloadSchema = z.object({
  /**
   * Defines the issue type hierarhy to be created and used during this project creation. This will only add new levels
   * if there isn't an existing level
   */
  issueTypeHierarchy: z.array(IssueTypeHierarchyPayloadSchema).nullable().optional(),
  issueTypeScheme: IssueTypeSchemePayloadSchema.optional(),
  /**
   * Only needed if you want to create issue types, you can otherwise use the ids of issue types in the scheme
   * configuration
   */
  issueTypes: z.array(IssueTypePayloadSchema).nullable().optional(),
});

export type IssueTypeProjectCreatePayload = z.infer<typeof IssueTypeProjectCreatePayloadSchema>;

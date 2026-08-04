import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
/** The payload for creating issue type schemes */

export const IssueTypeSchemePayloadSchema = apiObject({
  defaultIssueTypeId: ProjectCreateResourceIdentifierSchema.optional(),
  /** The description of the issue type scheme */
  description: z.string().nullish(),
  /** The issue type IDs for the issue type scheme */
  issueTypeIds: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  /** The name of the issue type scheme */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type IssueTypeSchemePayload = z.infer<typeof IssueTypeSchemePayloadSchema>;

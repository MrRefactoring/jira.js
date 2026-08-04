import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
/**
 * The payload for creating a workflow scheme. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview#what-is-a-jira-workflow-scheme
 */

export const WorkflowSchemePayloadSchema = apiObject({
  defaultWorkflow: ProjectCreateResourceIdentifierSchema.optional(),
  /** The description of the workflow scheme */
  description: z.string().optional(),
  /** Association between issuetypes and workflows */
  explicitMappings: z.record(z.string(), z.any()).optional(),
  /** The name of the workflow scheme */
  name: z.string().optional(),
  /** The strategy to use if there is a conflict with another workflow scheme */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type WorkflowSchemePayload = z.infer<typeof WorkflowSchemePayloadSchema>;

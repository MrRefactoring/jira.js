import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * The payload for creating a workflow scheme. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview#what-is-a-jira-workflow-scheme
 */
export const WorkflowSchemePayloadSchema = z.object({
  defaultWorkflow: ProjectCreateResourceIdentifierSchema.optional(),
  /** The description of the workflow scheme */
  description: z.string().optional(),
  /** Association between issuetypes and workflows */
  explicitMappings: z.object({}).optional(),
  /** The name of the workflow scheme */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type WorkflowSchemePayload = z.infer<typeof WorkflowSchemePayloadSchema>;

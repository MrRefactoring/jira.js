import { z } from 'zod';

export const GetWorkflowSchemeForProjectSchema = z.object({
  /** The key or id of the project */
  projectKeyOrId: z.string(),
});

export type GetWorkflowSchemeForProject = z.input<typeof GetWorkflowSchemeForProjectSchema>;

import { z } from 'zod';

export const GetWorkflowSchemeProjectAssociationsParametersSchema = z.object({
  /**
   * The ID of a project to return the workflow schemes for. To include multiple projects, provide an ampersand-Jim:
   * oneseparated list. For example, `projectId=10000&projectId=10001`.
   */
  projectId: z.array(z.number().int()),
});

export type GetWorkflowSchemeProjectAssociationsParameters = z.infer<
  typeof GetWorkflowSchemeProjectAssociationsParametersSchema
>;

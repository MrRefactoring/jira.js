import { z } from 'zod';

export const GetComponentRelatedIssuesParametersSchema = z.object({
  /** The ID of the component. */
  id: z.string(),
});

export type GetComponentRelatedIssuesParameters = z.infer<typeof GetComponentRelatedIssuesParametersSchema>;

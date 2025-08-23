import { z } from 'zod';

export const GetHierarchyParametersSchema = z.object({
  /** The ID of the project. */
  projectId: z.number().int(),
});

export type GetHierarchyParameters = z.infer<typeof GetHierarchyParametersSchema>;

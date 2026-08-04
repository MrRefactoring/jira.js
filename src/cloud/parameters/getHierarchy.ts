import { z } from 'zod';

export const GetHierarchySchema = z.object({
  /** The ID of the project. */
  projectId: z.number(),
});

export type GetHierarchy = z.input<typeof GetHierarchySchema>;

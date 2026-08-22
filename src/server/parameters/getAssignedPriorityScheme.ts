import { z } from 'zod';

export const GetAssignedPrioritySchemeSchema = z.object({
  /** Key or id of the project */
  projectKeyOrId: z.string(),
});

export type GetAssignedPriorityScheme = z.input<typeof GetAssignedPrioritySchemeSchema>;

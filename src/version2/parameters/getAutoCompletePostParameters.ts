import { z } from 'zod';

export const GetAutoCompletePostParametersSchema = z.object({
  /** Include collapsed fields for fields that have non-unique names. */
  includeCollapsedFields: z.boolean().optional(),
  /** List of project IDs used to filter the visible field details returned. */
  projectIds: z.array(z.number().int()).optional(),
});

export type GetAutoCompletePostParameters = z.infer<typeof GetAutoCompletePostParametersSchema>;

import { z } from 'zod';

/** Details of how to filter and list search auto complete information. */
export const SearchAutoCompleteFilterSchema = z.object({
  /** Include collapsed fields for fields that have non-unique names. */
  includeCollapsedFields: z.boolean().optional(),
  /** List of project IDs used to filter the visible field details returned. */
  projectIds: z.array(z.number().int()).optional(),
});

export type SearchAutoCompleteFilter = z.infer<typeof SearchAutoCompleteFilterSchema>;

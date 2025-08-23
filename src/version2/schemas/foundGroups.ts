import { z } from 'zod';
import { FoundGroupSchema } from './foundGroup';

/**
 * The list of groups found in a search, including header text (Showing X of Y matching groups) and total of matched
 * groups.
 */
export const FoundGroupsSchema = z.object({
  groups: z.array(FoundGroupSchema).optional(),
  /** Header text indicating the number of groups in the response and the total number of groups found in the search. */
  header: z.string().optional(),
  /** The total number of groups found in the search. */
  total: z.number().int().optional(),
});

export type FoundGroups = z.infer<typeof FoundGroupsSchema>;

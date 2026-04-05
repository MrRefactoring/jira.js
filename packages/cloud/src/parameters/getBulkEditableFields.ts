import { z } from 'zod';

export const GetBulkEditableFieldsSchema = z.object({
  /** The IDs or keys of the issues to get editable fields from. */
  issueIdsOrKeys: z.string(),
  /** (Optional)The text to search for in the editable fields. */
  searchText: z.string().optional(),
  /** (Optional)The end cursor for use in pagination. */
  endingBefore: z.string().optional(),
  /** (Optional)The start cursor for use in pagination. */
  startingAfter: z.string().optional(),
});

export type GetBulkEditableFields = z.input<typeof GetBulkEditableFieldsSchema>;

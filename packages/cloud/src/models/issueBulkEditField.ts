import { z } from 'zod';
import { IssueBulkOperationsFieldOptionSchema } from '#/models/issueBulkOperationsFieldOption';

export const IssueBulkEditFieldSchema = z.object({
  /** Description of the field. */
  description: z.string().optional(),
  /** A list of options related to the field, applicable in contexts where multiple selections are allowed. */
  fieldOptions: z.array(IssueBulkOperationsFieldOptionSchema).optional(),
  /** The unique ID of the field. */
  id: z.string().optional(),
  /** Indicates whether the field is mandatory for the operation. */
  isRequired: z.boolean().optional(),
  /** Specifies supported actions (like add, replace, remove) on multi-select fields via an enum. */
  multiSelectFieldOptions: z.array(z.enum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL'])).optional(),
  /** The display name of the field. */
  name: z.string().optional(),
  /** A URL to fetch additional data for the field */
  searchUrl: z.string().optional(),
  /** The type of the field. */
  type: z.string().optional(),
  /** A message indicating why the field is unavailable for editing. */
  unavailableMessage: z.string().optional(),
});

export type IssueBulkEditField = z.infer<typeof IssueBulkEditFieldSchema>;

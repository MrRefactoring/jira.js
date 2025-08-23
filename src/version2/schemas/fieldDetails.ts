import { z } from 'zod';

/** Details about a field. */
export const FieldDetailsSchema = z.object({
  /**
   * The names that can be used to reference the field in an advanced search. For more information, see [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ).
   */
  clauseNames: z.array(z.string()).optional(),
  /** Whether the field is a custom field. */
  custom: z.boolean().optional(),
  /** The ID of the field. */
  id: z.string().optional(),
  /** The key of the field. */
  key: z.string().optional(),
  /** The name of the field. */
  name: z.string().optional(),
  /** Whether the field can be used as a column on the issue navigator. */
  navigable: z.boolean().optional(),
  /** Whether the content of the field can be used to order lists. */
  orderable: z.boolean().optional(),
  /** The data schema for the field. */
  schema: z.unknown().optional(),
  /** The scope of the field. */
  scope: z.unknown().optional(),
  /** Whether the content of the field can be searched. */
  searchable: z.boolean().optional(),
});

export type FieldDetails = z.infer<typeof FieldDetailsSchema>;

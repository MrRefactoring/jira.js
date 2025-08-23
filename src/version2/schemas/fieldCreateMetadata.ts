import { z } from 'zod';

/** The metadata describing an issue field for createmeta. */
export const FieldCreateMetadataSchema = z.object({
  /** The list of values allowed in the field. */
  allowedValues: z.array(z.unknown()).optional(),
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl: z.string().optional(),
  /** The configuration properties. */
  configuration: z.object({}).optional(),
  /** The default value of the field. */
  defaultValue: z.unknown().optional(),
  /** The field id. */
  fieldId: z.string(),
  /** Whether the field has a default value. */
  hasDefaultValue: z.boolean().optional(),
  /** The key of the field. */
  key: z.string(),
  /** The name of the field. */
  name: z.string(),
  /** The list of operations that can be performed on the field. */
  operations: z.array(z.string()),
  /** Whether the field is required. */
  required: z.boolean(),
  /** The data type of the field. */
  schema: z.unknown(),
});

export type FieldCreateMetadata = z.infer<typeof FieldCreateMetadataSchema>;

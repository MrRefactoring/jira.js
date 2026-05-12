import { z } from 'zod';

/** The metadata describing an issue field. */
export const FieldMetadataSchema = z.object({
  /** The list of values allowed in the field. */
  allowedValues: z.array(z.unknown()).optional(),
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl: z.string().optional(),
  /** The configuration properties. */
  configuration: z.record(z.string(), z.any()).optional(),
  /** The default value of the field. */
  defaultValue: z.unknown().optional(),
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
  /** The schema of a field. */
  schema: z
    .object({
      /** If the field is a custom field, the configuration of the field. */
      configuration: z.record(z.string(), z.any()).optional(),
      /** If the field is a custom field, the URI of the field. */
      custom: z.string().optional(),
      /** If the field is a custom field, the custom ID of the field. */
      customId: z.number().optional(),
      /** When the data type is an array, the name of the field items within the array. */
      items: z.string().optional(),
      /** If the field is a system field, the name of the field. */
      system: z.string().optional(),
      /** The data type of the field. */
      type: z.string(),
    })
    .optional(),
});

export type FieldMetadata = z.infer<typeof FieldMetadataSchema>;

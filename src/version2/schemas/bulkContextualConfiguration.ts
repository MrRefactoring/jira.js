import { z } from 'zod';

/** Details of the contextual configuration for a custom field. */
export const BulkContextualConfigurationSchema = z.object({
  /** The field configuration. */
  configuration: z.unknown().optional(),
  /** The ID of the custom field. */
  customFieldId: z.string(),
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: z.string(),
  /** The ID of the configuration. */
  id: z.string(),
  /** The field value schema. */
  schema: z.unknown().optional(),
});

export type BulkContextualConfiguration = z.infer<typeof BulkContextualConfigurationSchema>;

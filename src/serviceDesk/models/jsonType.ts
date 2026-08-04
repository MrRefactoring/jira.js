import { z } from 'zod';
import { apiObject } from '#/core';
/** The schema of a field. */

export const JsonTypeSchema = apiObject({
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
});

export type JsonType = z.infer<typeof JsonTypeSchema>;

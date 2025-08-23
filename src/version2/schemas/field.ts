import { z } from 'zod';
import { FieldLastUsedSchema } from './fieldLastUsed';
import { JsonTypeBeanSchema } from './jsonTypeBean';

/** Details of a field. */
export const FieldSchema = z.object({
  /** Number of contexts where the field is used. */
  contextsCount: z.number().int().optional(),
  /** The description of the field. */
  description: z.string().optional(),
  /** The ID of the field. */
  id: z.string(),
  /** Whether the field is locked. */
  isLocked: z.boolean().optional(),
  /** Whether the field is shown on screen or not. */
  isUnscreenable: z.boolean().optional(),
  /** The key of the field. */
  key: z.string().optional(),
  lastUsed: FieldLastUsedSchema.optional(),
  /** The name of the field. */
  name: z.string(),
  /** Number of projects where the field is used. */
  projectsCount: z.number().int().optional(),
  schema: JsonTypeBeanSchema,
  /** Number of screens where the field is used. */
  screensCount: z.number().int().optional(),
  /** The searcher key of the field. Returned for custom fields. */
  searcherKey: z.string().optional(),
  /** The stable ID of the field. */
  stableId: z.string().optional(),
  /** The display name of the field type */
  typeDisplayName: z.string().optional(),
});

export type Field = z.infer<typeof FieldSchema>;

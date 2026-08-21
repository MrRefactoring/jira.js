import { z } from 'zod';
import { ObjectFiltersSchema } from '../models';

export const ArchiveObjectsByFilterSchema = z.object(ObjectFiltersSchema.shape).extend({
  /** The object type id to archive. */
  typeId: z.string().optional(),
});

export type ArchiveObjectsByFilter = z.input<typeof ArchiveObjectsByFilterSchema>;

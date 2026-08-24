import { z } from 'zod';
import { AssetObjectInSchema } from '../models';

export const UpdateObjectSchema = z.object(AssetObjectInSchema.shape).extend({
  /** The ID or object key of the object to update. */
  id: z.string(),
});

export type UpdateObject = z.input<typeof UpdateObjectSchema>;

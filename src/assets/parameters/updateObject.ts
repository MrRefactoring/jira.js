import { z } from 'zod';
import { AssetObjectInSchema } from '../models';

export const UpdateObjectSchema = z.object(AssetObjectInSchema.shape).extend({
  /** The object id to operate on */
  id: z.string(),
});

export type UpdateObject = z.input<typeof UpdateObjectSchema>;

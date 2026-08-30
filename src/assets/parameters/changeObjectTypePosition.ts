import { z } from 'zod';
import { ObjectTypePositionSchema } from '../models';

export const ChangeObjectTypePositionSchema = z.object(ObjectTypePositionSchema.shape).extend({
  id: z.string(),
});

export type ChangeObjectTypePosition = z.input<typeof ChangeObjectTypePositionSchema>;

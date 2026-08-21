import { z } from 'zod';
import { AssetObjectInSchema } from '../models';

export const CreateObjectSchema = z.object(AssetObjectInSchema.shape);

export type CreateObject = z.input<typeof CreateObjectSchema>;

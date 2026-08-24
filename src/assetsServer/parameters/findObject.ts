import { z } from 'zod';
import { ObjectIQLFilterParamSchema } from '../models';

export const FindObjectSchema = z.object(ObjectIQLFilterParamSchema.shape);

export type FindObject = z.input<typeof FindObjectSchema>;

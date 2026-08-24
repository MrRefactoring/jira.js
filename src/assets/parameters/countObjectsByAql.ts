import { z } from 'zod';
import { ObjectAQLTotalCountParamsSchema } from '../models';

export const CountObjectsByAqlSchema = z.object(ObjectAQLTotalCountParamsSchema.shape);

export type CountObjectsByAql = z.input<typeof CountObjectsByAqlSchema>;

import { z } from 'zod';
import { ScreenSchemeDetailsSchema } from '../models';

export const CreateScreenSchemeSchema = z.object({}).extend(ScreenSchemeDetailsSchema.shape);

export type CreateScreenScheme = z.input<typeof CreateScreenSchemeSchema>;

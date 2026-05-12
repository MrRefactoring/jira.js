import { z } from 'zod';
import { VersionSchema } from '../models';

export const CreateVersionSchema = z.object({}).extend(VersionSchema.shape);

export type CreateVersion = z.input<typeof CreateVersionSchema>;

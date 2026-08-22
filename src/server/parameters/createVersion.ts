import { z } from 'zod';
import { VersionSchema } from '../models';

export const CreateVersionSchema = z.object(VersionSchema.shape);

export type CreateVersion = z.input<typeof CreateVersionSchema>;

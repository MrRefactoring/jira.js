import { z } from 'zod';
import { ReadOnlyModeUpdateRequestSchema } from '../models';

export const UpdateReadOnlyModeSchema = z.object(ReadOnlyModeUpdateRequestSchema.shape);

export type UpdateReadOnlyMode = z.input<typeof UpdateReadOnlyModeSchema>;

import { z } from 'zod';
import { UnmapSprintsSchema as UnmapSprintsModelSchema } from '../models';

export const UnmapSprintsSchema = z.object(UnmapSprintsModelSchema.shape);

export type UnmapSprints = z.input<typeof UnmapSprintsSchema>;

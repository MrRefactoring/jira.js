import { z } from 'zod';
import { apiObject } from '#/core';

export const IndexSnapshotSchema = apiObject({
  absolutePath: z.string().optional(),
  timestamp: z.number().optional(),
});

export type IndexSnapshot = z.infer<typeof IndexSnapshotSchema>;

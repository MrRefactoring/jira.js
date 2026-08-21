import { z } from 'zod';
import { apiObject } from '#/core';

export const IndexSnapshotStatusSchema = apiObject({
  running: z.boolean().optional(),
});

export type IndexSnapshotStatus = z.infer<typeof IndexSnapshotStatusSchema>;

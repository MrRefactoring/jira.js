import { z } from 'zod';
import { apiObject } from '#/core';

export const IndexSnapshotPromiseSchema = apiObject({
  futureAbsolutePath: z.string().optional(),
});

export type IndexSnapshotPromise = z.infer<typeof IndexSnapshotPromiseSchema>;

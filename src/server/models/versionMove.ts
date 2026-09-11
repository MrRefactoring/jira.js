import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const VersionMoveSchema = apiObject({
  after: z.url().optional(),
  position: openEnum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type VersionMove = z.infer<typeof VersionMoveSchema>;

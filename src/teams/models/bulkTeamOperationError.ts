import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkTeamOperationErrorSchema = apiObject({
  code: z.string(),
  message: z.string(),
  teamId: z.string(),
});

export type BulkTeamOperationError = z.infer<typeof BulkTeamOperationErrorSchema>;

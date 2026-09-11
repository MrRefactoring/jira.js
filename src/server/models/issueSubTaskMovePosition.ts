import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueSubTaskMovePositionSchema = apiObject({
  current: z.number().optional(),
  original: z.number().optional(),
});

export type IssueSubTaskMovePosition = z.infer<typeof IssueSubTaskMovePositionSchema>;

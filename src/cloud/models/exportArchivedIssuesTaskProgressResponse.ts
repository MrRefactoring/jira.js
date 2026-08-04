import { z } from 'zod';
import { apiObject } from '#/core';
/** The response for status request for a running/completed export task. */

export const ExportArchivedIssuesTaskProgressResponseSchema = apiObject({
  fileUrl: z.string().optional(),
  payload: z.string().optional(),
  progress: z.number().optional(),
  status: z.string().optional(),
  submittedTime: z.coerce.date().optional(),
  taskId: z.string().optional(),
});

export type ExportArchivedIssuesTaskProgressResponse = z.infer<typeof ExportArchivedIssuesTaskProgressResponseSchema>;

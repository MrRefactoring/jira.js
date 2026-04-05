import { z } from 'zod';

/** The response for status request for a running/completed export task. */
export const ExportArchivedIssuesTaskProgressResponseSchema = z.object({
  fileUrl: z.string().optional(),
  payload: z.string().optional(),
  progress: z.number().optional(),
  status: z.string().optional(),
  submittedTime: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  taskId: z.string().optional(),
});

export type ExportArchivedIssuesTaskProgressResponse = z.infer<typeof ExportArchivedIssuesTaskProgressResponseSchema>;

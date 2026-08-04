import { z } from 'zod';

export const GetInsightWorkspacesSchema = z.object({
  start: z.number().optional(),
  limit: z.number().optional(),
});

export type GetInsightWorkspaces = z.input<typeof GetInsightWorkspacesSchema>;
